import { createOpenAI } from "@ai-sdk/openai"
import { generateObject, generateText } from "ai"
import { z } from "zod"

import type { CompanyResearchSweepResult } from "./research-tools"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getModel() {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error("OPENAI_API_KEY is not set")
  return createOpenAI({ apiKey: key })("gpt-4o")
}

/**
 * Strip request metadata from a sweep result and return a compact object
 * keyed by source name. Only successful results are included.
 * The stringified output is capped at ~60 k chars to stay well inside
 * GPT-4o's context window.
 */
export function prepareForLLM(sweepResult: CompanyResearchSweepResult): string {
  const cleaned: Record<string, unknown> = {}

  for (const result of sweepResult.results) {
    if (!result.ok) continue
    const raw = result.data as Record<string, unknown>
    // Strip internal bookkeeping fields that add noise without signal
    const { source, requestUrl, query, configuredSources, ...rest } = raw
    void source
    void requestUrl
    void query
    void configuredSources
    cleaned[result.name] = rest
  }

  const full = JSON.stringify(cleaned, null, 2)
  // Hard-cap to avoid accidental token blowout (GPT-4o supports ~128k tokens)
  return full.length > 100_000
    ? full.slice(0, 100_000) + "\n…[truncated]"
    : full
}

// ---------------------------------------------------------------------------
// Summary pipeline types
// ---------------------------------------------------------------------------

// OpenAI structured outputs require ALL properties to be in `required`.
// Use .nullable() (not .optional()) for fields that may be absent in the data —
// the field will always be present in the response but its value will be null.

// Step 1 output: one record per atomic fact, never aggregated.
const atomicFactRegistrySchema = z.object({
  facts: z.array(
    z.object({
      category: z.enum([
        "location",
        "contact",
        "hours",
        "description",
        "product",
        "person",
        "technology",
        "social",
        "rating",
        "funding",
        "news",
        "partnership",
        "customer",
        "industry",
        "other",
      ]),
      field: z.string(),
      value: z.string(),
      sourcePath: z.string(),
      evidence: z.string(),
      confidence: z.number(),
    }),
  ),
})

export type AtomicFact = z.infer<typeof atomicFactRegistrySchema>["facts"][number]

// Step 2 output: structured summary assembled from atomic facts — never from raw data.
const structuredSummarySchema = z.object({
  company: z.string(),
  oneLineDescription: z.string(),
  businessModel: z.string(),
  website: z.string().nullable(),
  founded: z.string().nullable(),
  companySize: z.string().nullable(),

  // Legacy single-value fields kept for display compatibility.
  headquarters: z.string().nullable(),
  fullAddress: z.string().nullable(),
  officeBuilding: z.string().nullable(),

  // All distinct locations with source attribution — never merged.
  locations: z.array(
    z.object({
      type: z.string(),
      building: z.string().nullable(),
      fullAddress: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      country: z.string().nullable(),
      source: z.string(),
    }),
  ),

  // Legacy hours string (verbatim, all notes preserved) + per-day breakdown.
  operatingHours: z.string().nullable(),
  operatingHoursStructured: z.array(
    z.object({
      day: z.string(),
      hours: z.string(),
      note: z.string().nullable(),
    }),
  ),

  products: z.array(z.string()),
  founders: z.array(z.string()),
  leadership: z.array(
    z.object({
      name: z.string(),
      title: z.string().nullable(),
    }),
  ),
  teamMembers: z.array(
    z.object({
      name: z.string(),
      title: z.string().nullable(),
      department: z.string().nullable(),
    }),
  ),
  investors: z.array(z.string()),
  customers: z.array(z.string()),
  industries: z.array(z.string()),
  technologies: z.array(z.string()),
  partnerships: z.array(z.string()),

  // Social profiles with follower counts preserved.
  socialProfiles: z.array(
    z.object({
      platform: z.string(),
      url: z.string(),
      followers: z.string().nullable(),
    }),
  ),

  recentNews: z.array(z.string()),
  fundingInfo: z.string().nullable(),

  // Legacy ratings string + per-source structured ratings.
  ratings: z.string().nullable(),
  ratingsStructured: z.array(
    z.object({
      source: z.string(),
      rating: z.number(),
      reviewCount: z.number().nullable(),
    }),
  ),

  // All verbatim description texts from every source — never compressed.
  descriptions: z.array(
    z.object({
      source: z.string(),
      text: z.string(),
    }),
  ),

  keyInsights: z.array(z.string()),
  risksOrUnknowns: z.array(z.string()),

  // Evidence with full source provenance and confidence.
  evidence: z.array(
    z.object({
      fact: z.string(),
      sourceSnippet: z.string(),
      sourcePath: z.string(),
      confidence: z.number(),
    }),
  ),
})

export type StructuredSummary = z.infer<typeof structuredSummarySchema>

export type SummaryPipelineResult = {
  atomicFacts: AtomicFact[]
  structuredSummary: StructuredSummary
  report: string
}

// ---------------------------------------------------------------------------
// Summary pipeline
// ---------------------------------------------------------------------------

// Step 1: convert raw API data into an Atomic Fact Registry.
// One record per fact — no aggregation, no summarization, no deduplication.
const SUMMARY_STEP1_SYSTEM = `You are a data extraction engine. Your sole job is to convert raw JSON company data into an Atomic Fact Registry.

RULES — NEVER VIOLATE:
1. ONE fact per record. Never combine two facts into one object.
2. Never summarize. Never aggregate. Never paraphrase. Never compress.
3. Preserve the exact wording, numbers, and casing from the source verbatim.
4. Extract EVERY piece of information — addresses, hours, descriptions, names, ratings, counts, URLs, notes, everything.
5. sourcePath: the dot-path to the value in the source JSON (e.g. "serpapi.knowledge_graph.address", "hunter.domain_search.emails[0].value").
6. evidence: a verbatim quote of the raw value or surrounding context from the source data.
7. If two sources give conflicting values for the same fact, emit TWO separate records — one per source. Never merge them.
8. Do not deduplicate. Duplicate facts are better than lost facts.
9. confidence: 1.0 = explicitly stated; 0.7 = strongly implied; 0.5 = inferred.

Category guide:
- location: every address component, building name, city, region, postal code, country — one fact per component.
- contact: phone numbers, emails, website URLs.
- hours: every individual day and its hours; include holiday notes as separate facts.
- description: every text passage describing the company — capture full text verbatim.
- product: each product or service name.
- person: each named individual — one fact per person×role combination (name, title, department).
- technology: each technology, framework, or tool.
- social: each social profile URL and each follower/connection count as separate facts.
- rating: each rating score and each review count as separate facts, one per source.
- funding: each funding round, investor name, and dollar amount as separate facts.
- news: each news item or recent event.
- partnership: each partner or collaborator.
- customer: each named customer or client.
- industry: each industry classification.
- other: anything that does not fit the above categories.

Aim for 100+ facts for a well-documented company. More facts is always better.`

// Step 2: assemble structured summary from atomic facts — never from raw data.
const SUMMARY_STEP2_SYSTEM = `You are a structured data assembler. You receive an Atomic Fact Registry and must populate the structured summary schema.

RULES — NEVER VIOLATE:
1. Use ONLY facts from the provided registry. Do not add information not in the registry.
2. Never compress or summarize values — use exact text from the facts.
3. locations array: create one entry per distinct location×source combination. Never merge locations from different sources.
4. operatingHoursStructured: one entry per day. Preserve all holiday variation notes in the note field.
5. operatingHours (legacy string): reproduce every day and every note verbatim, do not collapse into a range.
6. descriptions: one entry per source that contains a description text — copy the full text verbatim.
7. ratingsStructured: one entry per source with exact rating value and review count.
8. socialProfiles: include follower/connection count in the followers field wherever the registry contains it.
9. evidence: include sourcePath and confidence from the registry for each fact you reference.
10. If facts conflict, include both; note the conflict in keyInsights or risksOrUnknowns.`

// Step 3: write the intelligence brief from atomic facts — never from the compressed summary.
const SUMMARY_STEP3_SYSTEM = `You are a senior analyst writing a comprehensive company intelligence brief.
You receive an Atomic Fact Registry. Every fact in the registry MUST appear in the report.

RULES:
- Do not omit any fact from the registry.
- Do not paraphrase facts — reproduce values exactly.
- Include source attribution in parentheses after each fact, e.g. (source: serpapi.knowledge_graph).
- Where facts conflict across sources, present both with attribution.

Write the report with these sections:
1. Executive Summary (prose — synthesize key identity, do not omit any description text)
2. Company Descriptions (all verbatim description texts from every source)
3. Company Overview (business model, industry, website, founded, size)
4. Locations (ALL locations with source attribution — list every address component)
5. Operating Hours (ALL days including holiday variations and notes)
6. Products & Services
7. Founders & Leadership (all named individuals with exact titles)
8. Team Members (all named individuals with titles and departments)
9. Technologies & Stack
10. Investors & Funding (all investors, rounds, amounts)
11. Partnerships & Customers
12. Social Profiles (URLs with follower counts)
13. Ratings & Reviews (every source with exact score and review count)
14. Recent News & Activity
15. Key Insights & Risks
16. Source Attribution Index

Use plain prose for sections 1–2. Use structured bullets for all other sections.`

export async function runSummaryPipeline(
  sweepResult: CompanyResearchSweepResult,
): Promise<SummaryPipelineResult> {
  const model = getModel()
  const dataStr = prepareForLLM(sweepResult)

  // Step 1 — Atomic fact extraction (no summarization, one fact per record)
  const { object: factRegistry } = await generateObject({
    model,
    schema: atomicFactRegistrySchema,
    system: SUMMARY_STEP1_SYSTEM,
    prompt: `DATA:\n\n${dataStr}`,
  })

  const factsStr = JSON.stringify(factRegistry.facts, null, 2)

  // Step 2 — Structured summary assembled from atomic facts
  const { object: structuredSummary } = await generateObject({
    model,
    schema: structuredSummarySchema,
    system: SUMMARY_STEP2_SYSTEM,
    prompt: `ATOMIC FACT REGISTRY:\n\n${factsStr}`,
  })

  // Step 3 — Human-readable report generated from atomic facts (not from summary)
  const { text: report } = await generateText({
    model,
    system: SUMMARY_STEP3_SYSTEM,
    prompt: `ATOMIC FACT REGISTRY:\n\n${factsStr}`,
  })

  return { atomicFacts: factRegistry.facts, structuredSummary, report }
}

// ---------------------------------------------------------------------------
// Knowledge graph pipeline types
// ---------------------------------------------------------------------------

const factSchema = z.object({
  facts: z.array(
    z.object({
      subject: z.string(),
      predicate: z.string(),
      object: z.string(),
      confidence: z.number().min(0).max(1),
      evidence: z.string(),
    }),
  ),
})

const entityNormalizationSchema = z.object({
  entities: z.array(
    z.object({
      canonical: z.string(),
      aliases: z.array(z.string()),
      type: z.enum([
        "COMPANY",
        "PERSON",
        "PRODUCT",
        "INVESTOR",
        "CUSTOMER",
        "TECHNOLOGY",
        "INDUSTRY",
        "LOCATION",
        "EVENT",
      ]),
    }),
  ),
})

export type KnowledgeGraphNode = {
  id: string
  label: string
  type: string
}

export type KnowledgeGraphEdge = {
  source: string
  target: string
  relation: string
  confidence: number
  evidence: string
}

export type KnowledgeGraphPipelineResult = {
  facts: z.infer<typeof factSchema>["facts"]
  entities: z.infer<typeof entityNormalizationSchema>["entities"]
  graph: {
    nodes: KnowledgeGraphNode[]
    edges: KnowledgeGraphEdge[]
  }
}

// ---------------------------------------------------------------------------
// Knowledge graph pipeline
// ---------------------------------------------------------------------------

const GRAPH_STEP1_SYSTEM = `You are a knowledge graph extraction engine with a mandate of ZERO DATA LOSS.
Extract ALL factual relationships from the provided company research data.

Rules:
- Extract EVERY named relationship: company↔person, company↔location, company↔technology, person↔role, company↔investor, company↔customer, company↔product, company↔socialProfile, etc.
- Use canonical entity names (full name where available).
- Do not infer facts — only extract explicit relationships present in the data.
- Include a short evidence quote for each fact.
- Locations (buildings, addresses, cities) MUST be extracted as LOCATION entities.
- All named people (founders, leadership, team members) MUST be extracted as PERSON entities with their roles.
- All technologies mentioned MUST be extracted as TECHNOLOGY entities.
- Confidence 1.0 = explicitly stated; 0.7 = strongly implied; 0.5 = uncertain.
- Err on the side of extracting more rather than fewer facts.`

const GRAPH_STEP2_SYSTEM = `You are an entity resolution engine.
Given a list of facts, identify all unique entities and merge aliases into a single canonical name.
Assign each entity one of the types: COMPANY, PERSON, PRODUCT, INVESTOR, CUSTOMER, TECHNOLOGY, INDUSTRY, LOCATION, EVENT.`

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
}

function buildGraph(
  facts: z.infer<typeof factSchema>["facts"],
  entities: z.infer<typeof entityNormalizationSchema>["entities"],
): KnowledgeGraphPipelineResult["graph"] {
  // Build alias → canonical map
  const aliasMap = new Map<string, string>()
  for (const entity of entities) {
    const key = entity.canonical.toLowerCase()
    aliasMap.set(key, entity.canonical)
    for (const alias of entity.aliases) {
      aliasMap.set(alias.toLowerCase(), entity.canonical)
    }
  }

  const resolve = (name: string) => aliasMap.get(name.toLowerCase()) ?? name

  // Collect unique canonical names seen in facts
  const seenLabels = new Set<string>()
  for (const fact of facts) {
    seenLabels.add(resolve(fact.subject))
    seenLabels.add(resolve(fact.object))
  }

  // Build nodes
  const entityTypeMap = new Map(entities.map((e) => [e.canonical, e.type]))

  const nodes: KnowledgeGraphNode[] = Array.from(seenLabels).map((label) => ({
    id: slugify(label),
    label,
    type: entityTypeMap.get(label) ?? "UNKNOWN",
  }))

  // Build edges
  const edges: KnowledgeGraphEdge[] = facts.map((fact) => ({
    source: slugify(resolve(fact.subject)),
    target: slugify(resolve(fact.object)),
    relation: fact.predicate,
    confidence: fact.confidence,
    evidence: fact.evidence,
  }))

  return { nodes, edges }
}

export async function runGraphPipeline(
  sweepResult: CompanyResearchSweepResult,
): Promise<KnowledgeGraphPipelineResult> {
  const model = getModel()
  const dataStr = prepareForLLM(sweepResult)

  // Step 1 — Fact extraction
  const { object: factResult } = await generateObject({
    model,
    schema: factSchema,
    system: GRAPH_STEP1_SYSTEM,
    prompt: `DATA:\n\n${dataStr}`,
  })

  // Step 2 — Entity normalization
  const factsStr = JSON.stringify(factResult.facts, null, 2)
  const { object: entityResult } = await generateObject({
    model,
    schema: entityNormalizationSchema,
    system: GRAPH_STEP2_SYSTEM,
    prompt: `FACTS:\n\n${factsStr}`,
  })

  // Step 3 — Build graph (programmatic, no extra LLM call)
  const graph = buildGraph(factResult.facts, entityResult.entities)

  return {
    facts: factResult.facts,
    entities: entityResult.entities,
    graph,
  }
}
