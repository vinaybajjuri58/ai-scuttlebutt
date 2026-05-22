# AI Scuttlebutt

AI-powered startup intelligence tool. Drop in a company name, get a full research report — financials, product intel, customer sentiment, MOAT analysis, and founder deep-dive. Know everything about any startup. In minutes, not days.

## Overview

AI Scuttlebutt is a Next.js application that aggregates startup intelligence from 15+ public and API-based data sources, then runs structured AI pipelines to generate comprehensive research reports with interactive knowledge graphs.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + shadcn/ui (base-nova)
- **AI**: OpenAI GPT-4o via AI SDK (`ai` + `@ai-sdk/openai`)
- **Graph Visualization**: React Flow (`@xyflow/react`)
- **UI Components**: Base UI + shadcn/ui primitives

## Data Sources

The platform queries 15+ sources simultaneously:

### News & Media
- **NewsAPI** — worldwide news articles
- **World News API** — global news with sentiment analysis
- **NewsData.io** — real-time news aggregation

### Search & Web Intelligence
- **SerpAPI (Google)** — brand search, company search, news search, LinkedIn search
- **Wayback Machine** — historical website snapshots and CDX captures

### Company Intelligence
- **Hunter.io Domain Search** — people index (names, positions, departments)
- **Hunter.io Company Enrichment** — technologies, tech categories, funding rounds, metrics, social links
- **Company Website Scraper** — JSON-LD / microdata extraction for team pages

### Developer & Product
- **GitHub Search** — repositories, org profiles
- **App Store (iTunes)** — app metadata, ratings, screenshots
- **Product Hunt** — product launches, votes, reviews

### Financial & Legal
- **Google Patents** — patent search URLs
- **Screener.in** — Indian public company financials
- **MCA (India)** — Ministry of Corporate Affairs portal access

## AI Pipelines

### 1. Summary Pipeline (`runSummaryPipeline`)

A 3-step structured output pipeline that converts raw API data into a comprehensive intelligence brief:

**Step 1 — Atomic Fact Registry**
- Extracts every fact into individual records (location, contact, person, product, technology, etc.)
- Zero aggregation or summarization — preserves exact wording from sources
- Source attribution with dot-paths (e.g., `serpapi.knowledge_graph.address`)
- Confidence scoring (1.0 = explicit, 0.7 = implied, 0.5 = inferred)

**Step 2 — Structured Summary**
- Assembles structured data from atomic facts only
- Outputs: company meta, locations, operating hours, products, founders, leadership, team, investors, customers, industries, technologies, partnerships, social profiles, ratings, news, key insights, risks

**Step 3 — Intelligence Brief**
- Generates a human-readable report from atomic facts
- 16 sections including executive summary, company descriptions, team profiles, funding, ratings, and source attribution

### 2. Knowledge Graph Pipeline (`runGraphPipeline`)

A 3-step pipeline that extracts entities and relationships into an interactive graph:

**Step 1 — Fact Extraction**
- Extracts subject-predicate-object triples from raw data
- Entity types: COMPANY, PERSON, PRODUCT, INVESTOR, CUSTOMER, TECHNOLOGY, INDUSTRY, LOCATION, EVENT
- Evidence quotes and confidence scoring for each fact

**Step 2 — Entity Normalization**
- Resolves aliases into canonical entity names
- Assigns entity types

**Step 3 — Graph Construction**
- Builds nodes and edges programmatically
- Radial layout with color-coded node types
- Interactive React Flow visualization with minimap and controls

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/research` | POST | Run company research sweep across all sources |
| `/api/research/summary` | POST | Run AI summary pipeline on raw data |
| `/api/research/graph` | POST | Run knowledge graph pipeline on raw data |
| `/api/research/example` | GET | Load saved example (Altir) with pre-computed results |

## Pages

### Home (`/`)
- Marketing landing page with animated dot-grid background
- Feature highlights (Financial Intelligence, Founder Deep-Dive, MOAT Analysis, Customer Sentiment, Product Intelligence, Real-Time Alerts)
- How it works: Search → Analyze → Discover
- Stats counters and demo preview

### Research (`/research`)
- Search input for company name or URL
- Results displayed in tabs:
  - **Raw Data** — full JSON from all sources
  - **Team** — company intelligence from Hunter.io + website scraper
  - **AI Summary** — structured intelligence brief with sections
  - **Knowledge Graph** — interactive entity-relationship visualization
- Example data loader (Altir) for offline demo

## Environment Variables

| Variable | Source | Required For |
|----------|--------|-------------|
| `OPENAI_API_KEY` | OpenAI | AI pipelines (summary + graph) |
| `NEWS_API_KEY` | NewsAPI | News articles |
| `HUNTER_API_KEY` | Hunter.io | People index + company enrichment |
| `SERP_API_KEY` | SerpAPI | Google search results |
| `PRODUCT_HUNT_API_KEY` | Product Hunt | Product launches |
| `PRODUCT_HUNT_API_SECRET` | Product Hunt | OAuth token |
| `GITHUB_KEY` / `GITHUB_TOKEN` | GitHub | Repository/org search |
| `WORLD_NEWS_API_KEY` | World News API | Global news |
| `NEWS_DATA_IO_API_KEY` | NewsData.io | News aggregation |

## Key Design Decisions

1. **Zero data loss principle** — atomic fact extraction preserves every piece of information with source attribution
2. **Never merge conflicting sources** — conflicting facts are both emitted with separate source paths
3. **Structured outputs via Zod schemas** — all AI pipelines use `generateObject` with strict schemas
4. **Graceful degradation** — each data source is wrapped in try/catch; partial failures don't break the sweep
5. **URL-aware parsing** — detects URLs in search input to extract domain for enhanced queries
6. **Example data for demos** — pre-computed Altir dataset loads instantly when APIs are unavailable

## Getting Started

```bash
# Install dependencies
npm install

# Set environment variables in .env
# (see Environment Variables section)

# Run dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  app/
    page.tsx              # Landing page
    layout.tsx            # Root layout with fonts
    research/
      page.tsx            # Research dashboard
    api/research/
      route.ts            # Main research sweep endpoint
      summary/
        route.ts          # AI summary pipeline endpoint
      graph/
        route.ts          # Knowledge graph pipeline endpoint
      example/
        route.ts          # Example data endpoint
  components/
    graph-visualization.tsx   # React Flow graph renderer
    ui/                   # shadcn/ui components
  lib/
    research-tools.ts     # Orchestrates all data source calls
    public-data-sources.ts    # Free/public data sources
    keyed-data-sources.ts     # API-key-based data sources
    ai-pipelines.ts       # Summary + graph AI pipelines
    example-research-data.ts  # Pre-computed demo data
```

## License

Private — All rights reserved.
