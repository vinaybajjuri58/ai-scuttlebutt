import type {
  KnowledgeGraphPipelineResult,
  SummaryPipelineResult,
} from "./ai-pipelines"
import type { CompanyResearchSweepResult } from "./research-tools"

export type ExampleResearchPayload = {
  rawData: CompanyResearchSweepResult
  summary: SummaryPipelineResult
  graph: KnowledgeGraphPipelineResult
}

export const exampleRawData = {
  companyName: "altir",
  domain: "altir.co",
  configuredSources: [
    { source: "newsapi", envNames: ["NEWS_API_KEY"], configured: true },
    { source: "hunter", envNames: ["HUNTER_API_KEY"], configured: true },
    { source: "serpapi", envNames: ["SERP_API_KEY"], configured: true },
    {
      source: "product_hunt_key",
      envNames: ["PRODUCT_HUNT_API_KEY"],
      configured: true,
    },
    {
      source: "product_hunt_secret",
      envNames: ["PRODUCT_HUNT_API_SECRET"],
      configured: true,
    },
    { source: "github", envNames: ["GITHUB_KEY", "GITHUB_TOKEN"], configured: true },
    { source: "world_news", envNames: ["WORLD_NEWS_API_KEY"], configured: true },
    {
      source: "newsdata",
      envNames: ["NEWS_DATA_IO_API_KEY", "NEWSDATA_API_KEY"],
      configured: true,
    },
  ],
  results: [
    {
      ok: false,
      name: "newsapi.search",
      error:
        'Request failed with 401 for https://newsapi.org/v2/everything?q=altir+altir.co&language=en&sortBy=publishedAt&pageSize=5&page=1: {"status":"error","code":"apiKeyInvalid","message":"Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key."}',
    },
    {
      ok: true,
      name: "world_news.search",
      data: {
        source: "world_news",
        query: { text: "altir altir.co", number: 5 },
        requestUrl:
          "https://api.worldnewsapi.com/search-news?text=altir+altir.co&language=en&number=5",
        rawCount: 0,
        articles: [],
      },
    },
    {
      ok: true,
      name: "newsdata.search",
      data: {
        source: "newsdata",
        query: { query: "altir altir.co", size: 5 },
        requestUrl:
          "https://newsdata.io/api/1/news?q=altir+altir.co&language=en&size=5",
        articles: [],
      },
    },
    {
      ok: true,
      name: "serpapi.brand_search",
      data: {
        source: "serpapi",
        query: { query: "altir", num: 5 },
        requestUrl:
          "https://serpapi.com/search.json?engine=google&q=altir&api_key=REDACTED&num=5",
        engine: "google",
        results: [
          {
            title: "Altir",
            link: "https://www.altir.co/",
            snippet:
              "Altir is a product studio that accelerates outcomes. We are a System for Innovation that helps startups and Global Fortune 500 companies create digital ...",
            position: 1,
            source: "Altir",
          },
          {
            title: "Altir",
            link: "https://www.linkedin.com/company/altirllc",
            snippet:
              "We're an Innovation studio where Fortune 500s innovate like startups, and startups scale to shape the future.",
            displayed_link: "7.7K+ followers",
            position: 2,
            source: "LinkedIn · Altir",
          },
          {
            title: "Altir (@altir.co) • Instagram photos and videos",
            link: "https://www.instagram.com/altir.co/",
            snippet:
              "Altir is an innovation studio that accelerates outcomes. We turn ideas into reality via our creation platform, a force multiplier for our partners.",
            displayed_link: "70+ followers",
            position: 3,
            source: "Instagram · altir.co",
          },
          {
            title: "Openings at Altir",
            link: "https://altir.breezy.hr/",
            snippet:
              "At Altir, we work on problems that have a global and social impact. We are rooted in a culture of builders, entrepreneurs, and empowerment - if you want to do ...",
            position: 4,
            source: "Breezy HR",
          },
          {
            title: "Altir Industries - Crunchbase Company Profile & Funding",
            link: "https://www.crunchbase.com/organization/altir-industries",
            snippet:
              "Altir Industries operates in the financial technology sector, providing solutions for consolidated banking and real-time financial management.",
            position: 5,
            source: "Crunchbase",
          },
          {
            title: "Altir | Software Development",
            link: "https://neuron.com/companies/7245691991/altir-7381",
            snippet:
              "What industry is Altir in? Altir operates in the Software Development industry. ; Where is Altir located? Altir is located in San Mateo, California, United ...",
            position: 9,
            source: "Neuron (formerly Prospect)",
          },
        ],
        knowledgeGraph: {
          title: "Altir India Private Limited",
          type: "Software company in India",
          entity_type: "local_nav",
          kgmid: "/g/11t7rbdmpc",
          place_id: "ChIJWdh5DBOTyzsRxW-DNU4eJpU",
          website: "https://www.altir.co/",
          rating: 5,
          review_count: 2,
          located_in: "Kapil Towers",
          address:
            "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
          raw_hours: "Open · Closes 6 PM",
          hours: {
            friday: { opens: "9 AM", closes: "6 PM" },
            saturday: { opens: "Closed" },
            sunday: { opens: "Closed" },
            monday: { opens: "9 AM", closes: "6 PM" },
            tuesday_eid_al_adha: {
              opens: "9 AM",
              closes: "6 PM Hours might differ",
            },
            wednesday_eid_al_adha: {
              opens: "9 AM",
              closes: "6 PM Hours might differ",
            },
            thursday: { opens: "9 AM", closes: "6 PM" },
          },
          merchant_description:
            '"Altir is a product studio that accelerates outcomes. We are a System for Innovation that helps startups and Global Fortune 500 companies create digital products and businesses to disrupt global industries. Altir is disruptive by design. We turn ideas into reality through our creation platform that is a force multiplier and an unfair advantage for our partners."',
          unclaimed_listing: true,
          profiles: [
            { name: "Instagram", link: "https://www.instagram.com/altir.co/" },
            { name: "LinkedIn", link: "https://www.linkedin.com/company/altirllc" },
          ],
        },
      },
    },
    {
      ok: true,
      name: "serpapi.company_search",
      data: {
        source: "serpapi",
        query: { query: "altir altir.co startup funding founders", num: 5 },
        requestUrl:
          "https://serpapi.com/search.json?engine=google&q=altir+altir.co+startup+funding+founders&api_key=REDACTED&num=5",
        engine: "google",
        results: [
          {
            title: "Altir Industries - Crunchbase Company Profile & Funding",
            link: "https://www.crunchbase.com/organization/altir-industries",
            snippet:
              "Altir also supports startups and large corporations in creating digital ... Pat Connors CEO & Co-Founder. View All. News. Technology. View Tech Report. Active ...",
            position: 1,
            source: "Crunchbase",
          },
          {
            title: "Altir Comes out of Stealth, Launches Product Creation ...",
            link: "https://www.prnewswire.com/news-releases/altir-comes-out-of-stealth-launches-product-creation-platform-to-accelerate-innovation-and-alter-outcomes-for-startup-and-enterprises-301533783.html",
            snippet:
              "Altir offers unique capabilities to create and grow disruptive digital products and platforms from startups to Fortune 500 companies.",
            position: 2,
            source: "PR Newswire",
            date: "Apr 28, 2022",
          },
          {
            title: "Altir",
            link: "https://www.linkedin.com/company/altirllc",
            snippet:
              "We become your business and funding partners, hiring managers, IP ... Seth Marlatt, CEO & Co-founder, Altir, will be hosting the kickoff session ...",
            displayed_link: "7.7K+ followers",
            position: 3,
            source: "LinkedIn · Altir",
          },
          {
            title: "Altir Industries - Valuation, Funding & Investors",
            link: "https://pitchbook.com/profiles/company/530505-28",
            snippet:
              "Caffeinated Capital, Clocktower Ventures, Founders Fund, Haystack Management Company, and Lux Capital are 5 of 6 investors who have invested in Altir Industries ...",
            position: 4,
            source: "PitchBook",
          },
          {
            title: "Altir - 2026 Company Profile & Team",
            link: "https://tracxn.com/d/companies/altir/__deUAWFBpWzyeRmOXB0l09o96QOA-A__Qx5JIFmLH_h8",
            snippet:
              "Altir is a funded company based in Latvia, founded in 2023 by Pat Connors. It operates as a Financial management platform for businesses.",
            position: 5,
            source: "Tracxn",
            date: "Feb 20, 2026",
          },
          {
            title: "Seth Marlatt Of Altir: 5 Things I Wish Someone Told Me ...",
            link: "https://medium.com/authority-magazine/seth-marlatt-of-altir-5-things-i-wish-someone-told-me-before-i-became-a-founder-6f102355e775",
            snippet:
              "I started Altir with my two co-founders off the back of a transition from another tech company. In my mind, every transition represents an ...",
            displayed_link: "50+ likes · 3 years ago",
            position: 9,
            source: "Medium · Authority Magazine Editorial Staff",
          },
          {
            title: "Altir accelerator program aims to help startups, enterprises ...",
            link: "https://www.bizjournals.com/sanjose/inno/stories/news/2022/05/11/new-accelerator-aims-to-speed-products-to-market.html",
            snippet:
              "Altir, co-founded by Seth Marlatt, aims to help startups and established businesses bring their ideas and products to market.",
            position: 10,
            source: "The Business Journals",
            date: "May 11, 2022",
          },
        ],
      },
    },
    {
      ok: true,
      name: "serpapi.news_search",
      data: {
        source: "serpapi",
        query: { query: "altir altir.co", engine: "google_news", num: 5 },
        requestUrl:
          "https://serpapi.com/search.json?engine=google_news&q=altir+altir.co&api_key=REDACTED&num=5",
        engine: "google_news",
        results: [
          {
            title:
              "Altir Comes out of Stealth, Launches Product Creation Platform To Accelerate Innovation and Alter Outcomes for Startup and Enterprises",
            link: "https://www.prnewswire.com/news-releases/altir-comes-out-of-stealth-launches-product-creation-platform-to-accelerate-innovation-and-alter-outcomes-for-startup-and-enterprises-301533783.html",
            position: 6,
            date: "04/28/2022, 07:00 AM, +0000 UTC",
          },
          {
            title:
              "New accelerator program aims to help startups and enterprises alike speed their products to market",
            link: "https://www.bizjournals.com/sanjose/inno/stories/news/2022/05/11/new-accelerator-aims-to-speed-products-to-market.html",
            position: 33,
            date: "05/11/2022, 07:00 AM, +0000 UTC",
          },
        ],
      },
    },
    {
      ok: true,
      name: "serpapi.linkedin_search",
      data: {
        source: "serpapi",
        query: {
          query: "site:linkedin.com/company altir OR site:linkedin.com/in altir founder",
          num: 5,
        },
        requestUrl:
          "https://serpapi.com/search.json?engine=google&q=site%3Alinkedin.com%2Fcompany+altir+OR+site%3Alinkedin.com%2Fin+altir+founder&api_key=REDACTED&num=5",
        engine: "google",
        results: [
          {
            title: "Altir",
            link: "https://www.linkedin.com/company/altirllc",
            snippet:
              "Seth Marlatt, CEO & Co-founder, Altir, will be hosting the kickoff session, with SILVERSIDE, Lowe's Companies, Inc., #Svedka, LVMH, Microsoft AI and other ...",
            displayed_link: "7.7K+ followers",
            position: 1,
            source: "LinkedIn · Altir",
          },
          {
            title: "Altir Industries, Inc.",
            link: "https://www.linkedin.com/company/altir-industries-inc",
            snippet:
              "Co-Founder at Pivot Accounting | M&A… Click here to view Allison Clark's profile. Allison Clark. Co-Founder & Designer at Altir · Click here to view Rafe ...",
            displayed_link: "110+ followers",
            position: 2,
            source: "LinkedIn · Altir Industries, Inc.",
          },
        ],
      },
    },
    {
      ok: true,
      name: "github.search",
      data: {
        source: "github_search",
        query: { query: "altir in:name", perPage: 5 },
        requestUrl:
          "https://api.github.com/search/repositories?q=altir+in%3Aname&per_page=5&page=1",
        totalCount: 172,
        items: [
          {
            id: 1197775619,
            name: "AltirraSDL",
            fullName: "ilmenit/AltirraSDL",
            description: "Portable version of Altirra - 8bit Atari emulator by Avery Lee",
            htmlUrl: "https://github.com/ilmenit/AltirraSDL",
            stars: 41,
            forks: 9,
            language: "C++",
            license: "GPL-2.0",
          },
          {
            id: 613490553,
            name: "altiro3D",
            fullName: "canessae/altiro3D",
            description:
              "2D-to-3D image and video conversion library for free-view LCD",
            htmlUrl: "https://github.com/canessae/altiro3D",
            stars: 20,
            forks: 4,
            language: "C++",
            license: "MIT",
          },
        ],
      },
    },
    {
      ok: true,
      name: "app_store.search",
      data: {
        source: "itunes_search",
        query: { term: "altir", limit: 5 },
        requestUrl:
          "https://itunes.apple.com/search?term=altir&media=software&entity=software&country=us&limit=5",
        resultCount: 3,
        apps: [
          {
            appName: "ALTijari Invest",
            sellerName: "Al-Tijari Financial Brokerage Company",
            averageUserRating: 0,
            userRatingCount: 0,
            primaryGenreName: "Finance",
          },
          {
            appName: "AZV",
            sellerName: "wadi altiqina Company For Information Technology",
            averageUserRating: 0,
            userRatingCount: 0,
            primaryGenreName: "Lifestyle",
          },
        ],
      },
    },
    {
      ok: true,
      name: "google_patents.search_url",
      data: {
        source: "google_patents",
        query: { query: "altir" },
        searchUrl: "https://patents.google.com/?q=altir",
        note:
          "Google Patents does not provide an official public API. Use this URL for manual review or fetch a specific public patent page by URL.",
      },
    },
    {
      ok: true,
      name: "wayback.latest",
      data: {
        source: "wayback_available",
        query: { url: "altir.co" },
        requestUrl: "https://archive.org/wayback/available?url=altir.co",
      },
    },
    {
      ok: true,
      name: "wayback.cdx",
      data: {
        source: "wayback_cdx",
        query: { url: "altir.co", limit: 10, collapse: "digest" },
        requestUrl:
          "https://web.archive.org/cdx?url=altir.co&output=json&fl=timestamp%2Coriginal%2Cstatuscode%2Cmimetype%2Cdigest&filter=statuscode%3A200&limit=10&collapse=digest",
        captures: [
          {
            timestamp: "20211210022614",
            original: "https://www.altir.co/",
            statusCode: "200",
            mimeType: "text/html",
            digest: "KESEFVGG346B5BPVVTYRY6AOGQH5Q5TJ",
            archiveUrl: "https://web.archive.org/web/20211210022614/https://www.altir.co/",
          },
          {
            timestamp: "20250323120229",
            original: "https://www.altir.co/",
            statusCode: "200",
            mimeType: "text/html",
            digest: "IJD4MEL7XTJLGQIPBMPQ3VT4MVKC7NLJ",
            archiveUrl: "https://web.archive.org/web/20250323120229/https://www.altir.co/",
          },
        ],
      },
    },
    {
      ok: true,
      name: "hunter.domain_search",
      data: {
        source: "hunter_domain_search",
        query: { domain: "altir.co", limit: 10 },
        requestUrl:
          "https://api.hunter.io/v2/domain-search?domain=altir.co&limit=10&required_field=full_name%2Cposition&type=personal",
        domain: "altir.co",
        organization: "Altir",
        totalResults: 15,
        people: [
          {
            firstName: "Jeff",
            lastName: "Cappel",
            position: "Head of Design",
            department: "design",
            seniority: "executive",
            linkedin: "https://www.linkedin.com/in/jeff-cappel-4513905",
          },
          {
            firstName: "Aditya",
            lastName: "Chopra",
            position: "Associate Director",
            department: "management",
            seniority: "executive",
            linkedin: "https://www.linkedin.com/in/aditya-chopra-2154961a",
          },
          {
            firstName: "Kandarp",
            lastName: "Shah",
            position: "Senior Director",
            department: "management",
            seniority: "executive",
            linkedin: "https://www.linkedin.com/in/kandarp-shah-55062077",
          },
          {
            firstName: "Himanshu",
            lastName: "Gauba",
            position: "Vice President of Engineering",
            department: "executive",
            seniority: "executive",
            linkedin: "https://www.linkedin.com/in/himanshugauba",
          },
          {
            firstName: "Ashok",
            lastName: "Sarraf",
            position: "Director of Engineering",
            department: "management",
            seniority: "executive",
            linkedin: "https://www.linkedin.com/in/ashok-kumar-sarraf-24751227",
          },
          {
            firstName: "Suresh",
            lastName: "Nandi",
            position: "Principal Engineer",
            department: "education",
            seniority: "senior",
            linkedin: "https://www.linkedin.com/in/suresh-nandi-957205155",
          },
          {
            firstName: "Manju",
            lastName: "Kalagi",
            position: "Quality Engineer",
            department: "operations",
            linkedin: "https://www.linkedin.com/in/manju-kalagi-25504a225",
          },
          {
            firstName: "Vanshika",
            lastName: "Sachdev",
            position: "Senior Software Engineer",
            department: "it",
            seniority: "senior",
            linkedin: "https://www.linkedin.com/in/vanshika-sachdev-316004179",
          },
          {
            firstName: "Varun",
            lastName: "Kukade",
            position: "Senior Software Engineer",
            department: "it",
            seniority: "senior",
            linkedin: "https://www.linkedin.com/in/varun-kukade-b29460171",
          },
          {
            firstName: "Deepti",
            lastName: "Vaidyula",
            position: "Principal Engineer",
            department: "education",
            seniority: "senior",
            linkedin: "https://www.linkedin.com/in/deepti-vaidyula-73b12029",
          },
        ],
      },
    },
    {
      ok: true,
      name: "hunter.company_enrichment",
      data: {
        source: "hunter_company_enrichment",
        domain: "altir.co",
        requestUrl: "https://api.hunter.io/v2/companies/find?domain=altir.co",
        name: "Altir",
        legalName: "Altir",
        foundedYear: 2020,
        location: "San Mateo, California, United States",
        logo: "https://logos.hunter.io/altir.co",
        category: {},
        metrics: { employees: "51-250" },
        tech: [
          "amazon-web-services",
          "docker",
          "hsts",
          "java",
          "kafka",
          "kubernetes",
          "microsoft-azure",
          "mongodb",
          "nosql",
          "sql",
          "squarespace",
          "stimulus",
        ],
        techCategories: [
          "cloud_computing_services",
          "content_management_system",
          "data_processing",
          "database",
          "programming_framework",
          "programming_language",
          "security",
        ],
        social: {
          linkedin: "https://linkedin.com/company/altirllc",
          instagram: "https://instagram.com/altir.co",
        },
        emailProvider: "outlook.com",
      },
    },
    {
      ok: true,
      name: "company_website.team",
      data: {
        source: "company_team_page",
        domain: "altir.co",
        pageUrl: "https://altir.co/team",
        members: [],
        totalFound: 0,
        note: "Could not load any team page. Last error: Request failed with 404 for https://altir.co/people",
      },
    },
    {
      ok: true,
      name: "product_hunt.company_search",
      data: {
        source: "product_hunt",
        data: {
          posts: {
            edges: [
              {
                node: {
                  id: "1104980",
                  name: "Plurai",
                  tagline: "Vibe-train evals and guardrails tailored to your use case",
                  description:
                    "Vibe training for AI agent reliability. Describe what your agent should and should not do — Plurai generates training data, validates it, and deploys a custom model in minutes.",
                  url: "https://www.producthunt.com/products/plurai/launches/plurai",
                  votesCount: 765,
                  commentsCount: 228,
                  reviewsRating: 5,
                  reviewsCount: 1,
                  createdAt: "2026-04-29T07:01:00Z",
                },
              },
            ],
          },
        },
      },
    },
  ],
} satisfies CompanyResearchSweepResult

export const exampleSummaryData = {
  atomicFacts: [
    {
      category: "description",
      field: "merchant_description",
      value:
        '"Altir is a product studio that accelerates outcomes. We are a System for Innovation that helps startups and Global Fortune 500 companies create digital products and businesses to disrupt global industries. Altir is disruptive by design. We turn ideas into reality through our creation platform that is a force multiplier and an unfair advantage for our partners."',
      sourcePath: "serpapi.brand_search.knowledgeGraph.merchant_description",
      evidence:
        '"Altir is a product studio that accelerates outcomes. We are a System for Innovation..."',
      confidence: 1,
    },
    {
      category: "location",
      field: "building",
      value: "Kapil Towers",
      sourcePath: "serpapi.brand_search.knowledgeGraph.located_in",
      evidence: "located_in: Kapil Towers",
      confidence: 1,
    },
    {
      category: "location",
      field: "address",
      value:
        "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
      sourcePath: "serpapi.brand_search.knowledgeGraph.address",
      evidence:
        "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
      confidence: 1,
    },
    {
      category: "location",
      field: "location",
      value: "San Mateo, California, United States",
      sourcePath: "hunter.company_enrichment.location",
      evidence: "location: San Mateo, California, United States",
      confidence: 1,
    },
    {
      category: "hours",
      field: "tuesday_eid_al_adha",
      value: "9 AM - 6 PM Hours might differ",
      sourcePath: "serpapi.brand_search.knowledgeGraph.hours.tuesday_eid_al_adha",
      evidence: "opens: 9 AM; closes: 6 PM Hours might differ",
      confidence: 1,
    },
    {
      category: "social",
      field: "linkedin_followers",
      value: "7.7K+ followers",
      sourcePath: "serpapi.brand_search.results[1].displayed_link",
      evidence: "7.7K+ followers",
      confidence: 1,
    },
    {
      category: "social",
      field: "instagram_followers",
      value: "70+ followers",
      sourcePath: "serpapi.brand_search.results[2].displayed_link",
      evidence: "70+ followers",
      confidence: 1,
    },
    {
      category: "rating",
      field: "google_rating",
      value: "5",
      sourcePath: "serpapi.brand_search.knowledgeGraph.rating",
      evidence: "rating: 5",
      confidence: 1,
    },
    {
      category: "rating",
      field: "ambitionbox_rating",
      value: "3.8",
      sourcePath:
        "serpapi.brand_search.results[6].rich_snippet.top.detected_extensions.rating",
      evidence: "3.8(5)",
      confidence: 1,
    },
    {
      category: "person",
      field: "leader",
      value: "Seth Marlatt, CEO & Co-founder",
      sourcePath: "serpapi.linkedin_search.results[0].snippet",
      evidence: "Seth Marlatt, CEO & Co-founder, Altir",
      confidence: 1,
    },
  ],
  structuredSummary: {
    company: "Altir",
    oneLineDescription: "Altir is a product studio and innovation studio.",
    businessModel:
      "Product studio, innovation studio, creation platform, and partner for startups and Global Fortune 500 companies creating digital products and businesses.",
    website: "https://www.altir.co/",
    founded: "2020 (Hunter); 2023 by Pat Connors (Tracxn search result)",
    companySize: "51-250",
    headquarters: "San Mateo, California, United States",
    fullAddress:
      "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
    officeBuilding: "Kapil Towers",
    locations: [
      {
        type: "India Office",
        building: "Kapil Towers",
        fullAddress:
          "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
        city: "Nanakramguda",
        state: "Telangana",
        country: "India",
        source: "SerpApi Google knowledge graph",
      },
      {
        type: "External Source Mention",
        building: null,
        fullAddress: null,
        city: "San Mateo",
        state: "California",
        country: "United States",
        source: "Hunter company enrichment",
      },
      {
        type: "External Source Mention",
        building: null,
        fullAddress: null,
        city: null,
        state: null,
        country: "Latvia",
        source: "Tracxn search result snippet",
      },
    ],
    operatingHours:
      "Friday: 9 AM - 6 PM; Saturday: Closed; Sunday: Closed; Monday: 9 AM - 6 PM; Tuesday Eid al-Adha: 9 AM - 6 PM Hours might differ; Wednesday Eid al-Adha: 9 AM - 6 PM Hours might differ; Thursday: 9 AM - 6 PM",
    operatingHoursStructured: [
      { day: "friday", hours: "9 AM - 6 PM", note: null },
      { day: "saturday", hours: "Closed", note: null },
      { day: "sunday", hours: "Closed", note: null },
      { day: "monday", hours: "9 AM - 6 PM", note: null },
      {
        day: "tuesday_eid_al_adha",
        hours: "9 AM - 6 PM",
        note: "Hours might differ",
      },
      {
        day: "wednesday_eid_al_adha",
        hours: "9 AM - 6 PM",
        note: "Hours might differ",
      },
      { day: "thursday", hours: "9 AM - 6 PM", note: null },
    ],
    products: [
      "Creation platform",
      "Digital products and businesses",
      "Product creation platform",
      "Financial management platform for businesses",
      "Consolidated banking and real-time financial management solutions",
    ],
    founders: ["Seth Marlatt", "Pat Connors"],
    leadership: [
      { name: "Seth Marlatt", title: "CEO & Co-founder" },
      { name: "Pat Connors", title: "CEO & Co-Founder" },
    ],
    teamMembers: [
      { name: "Jeff Cappel", title: "Head of Design", department: "design" },
      { name: "Aditya Chopra", title: "Associate Director", department: "management" },
      { name: "Kandarp Shah", title: "Senior Director", department: "management" },
      {
        name: "Himanshu Gauba",
        title: "Vice President of Engineering",
        department: "executive",
      },
      {
        name: "Ashok Sarraf",
        title: "Director of Engineering",
        department: "management",
      },
      { name: "Suresh Nandi", title: "Principal Engineer", department: "education" },
      { name: "Manju Kalagi", title: "Quality Engineer", department: "operations" },
      {
        name: "Vanshika Sachdev",
        title: "Senior Software Engineer",
        department: "it",
      },
      {
        name: "Varun Kukade",
        title: "Senior Software Engineer",
        department: "it",
      },
      { name: "Deepti Vaidyula", title: "Principal Engineer", department: "education" },
    ],
    investors: [
      "Caffeinated Capital",
      "Clocktower Ventures",
      "Founders Fund",
      "Haystack Management Company",
      "Lux Capital",
    ],
    customers: [
      "startups",
      "Global Fortune 500 companies",
      "large corporations",
      "Lowe's Companies, Inc.",
      "Svedka",
      "LVMH",
      "Microsoft AI",
    ],
    industries: [
      "Software Development",
      "Financial technology",
      "Innovation studio",
      "Product studio",
    ],
    technologies: [
      "amazon-web-services",
      "docker",
      "hsts",
      "java",
      "kafka",
      "kubernetes",
      "microsoft-azure",
      "mongodb",
      "nosql",
      "sql",
      "squarespace",
      "stimulus",
    ],
    partnerships: ["business partners", "funding partners", "hiring managers"],
    socialProfiles: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/altirllc",
        followers: "7.7K+ followers",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/altir.co/",
        followers: "70+ followers",
      },
    ],
    recentNews: [
      "Altir Comes out of Stealth, Launches Product Creation Platform To Accelerate Innovation and Alter Outcomes for Startup and Enterprises — PR Newswire, Apr 28, 2022",
      "Altir accelerator program aims to help startups, enterprises bring ideas and products to market — The Business Journals, May 11, 2022",
    ],
    fundingInfo:
      "PitchBook snippet says Caffeinated Capital, Clocktower Ventures, Founders Fund, Haystack Management Company, and Lux Capital are 5 of 6 investors who have invested in Altir Industries.",
    ratings: "Google: 5 rating with 2 reviews; AmbitionBox: 3.8 rating with 5 reviews.",
    ratingsStructured: [
      { source: "Google knowledge graph", rating: 5, reviewCount: 2 },
      { source: "AmbitionBox", rating: 3.8, reviewCount: 5 },
    ],
    descriptions: [
      {
        source: "SerpApi Google knowledge graph merchant_description",
        text:
          '"Altir is a product studio that accelerates outcomes. We are a System for Innovation that helps startups and Global Fortune 500 companies create digital products and businesses to disrupt global industries. Altir is disruptive by design. We turn ideas into reality through our creation platform that is a force multiplier and an unfair advantage for our partners."',
      },
      {
        source: "LinkedIn search result",
        text:
          "We're an Innovation studio where Fortune 500s innovate like startups, and startups scale to shape the future.",
      },
      {
        source: "Instagram search result",
        text:
          "Altir is an innovation studio that accelerates outcomes. We turn ideas into reality via our creation platform, a force multiplier for our partners.",
      },
      {
        source: "Breezy HR search result",
        text:
          "At Altir, we work on problems that have a global and social impact. We are rooted in a culture of builders, entrepreneurs, and empowerment - if you want to do ...",
      },
    ],
    keyInsights: [
      "The dataset contains multiple location claims: an India office in Kapil Towers, San Mateo from Hunter, and Latvia from Tracxn.",
      "Altir is described as both a product studio and an innovation studio.",
      "The same brand name also appears in unrelated search results, so source provenance matters.",
    ],
    risksOrUnknowns: [
      "NewsApi returned an invalid API key error in the saved example.",
      "Several news results are for Altair, not Altir, and should be treated as low relevance.",
      "Founded year conflicts: Hunter says 2020 while Tracxn snippet says founded in 2023 by Pat Connors.",
    ],
    evidence: [
      {
        fact: "Altir is a product studio that accelerates outcomes.",
        sourceSnippet:
          "Altir is a product studio that accelerates outcomes. We are a System for Innovation...",
        sourcePath: "serpapi.brand_search.knowledgeGraph.merchant_description",
        confidence: 1,
      },
      {
        fact: "Altir India Private Limited is located in Kapil Towers.",
        sourceSnippet: "located_in: Kapil Towers",
        sourcePath: "serpapi.brand_search.knowledgeGraph.located_in",
        confidence: 1,
      },
      {
        fact: "Altir is located in San Mateo, California, United States.",
        sourceSnippet: "location: San Mateo, California, United States",
        sourcePath: "hunter.company_enrichment.location",
        confidence: 1,
      },
      {
        fact: "LinkedIn shows 7.7K+ followers.",
        sourceSnippet: "7.7K+ followers",
        sourcePath: "serpapi.brand_search.results[1].displayed_link",
        confidence: 1,
      },
      {
        fact: "Instagram shows 70+ followers.",
        sourceSnippet: "70+ followers",
        sourcePath: "serpapi.brand_search.results[2].displayed_link",
        confidence: 1,
      },
    ],
  },
  report: `1. Executive Summary
Altir is described as a product studio and innovation studio. The saved data says: "Altir is a product studio that accelerates outcomes. We are a System for Innovation that helps startups and Global Fortune 500 companies create digital products and businesses to disrupt global industries. Altir is disruptive by design. We turn ideas into reality through our creation platform that is a force multiplier and an unfair advantage for our partners."

2. Company Descriptions
- SerpApi knowledge graph: "Altir is a product studio that accelerates outcomes. We are a System for Innovation that helps startups and Global Fortune 500 companies create digital products and businesses to disrupt global industries. Altir is disruptive by design. We turn ideas into reality through our creation platform that is a force multiplier and an unfair advantage for our partners."
- LinkedIn: We're an Innovation studio where Fortune 500s innovate like startups, and startups scale to shape the future.
- Instagram: Altir is an innovation studio that accelerates outcomes. We turn ideas into reality via our creation platform, a force multiplier for our partners.
- Breezy HR: At Altir, we work on problems that have a global and social impact. We are rooted in a culture of builders, entrepreneurs, and empowerment.

3. Company Overview
- Website: https://www.altir.co/
- Founded: 2020 from Hunter; 2023 by Pat Connors from Tracxn snippet.
- Company size: 51-250.
- Industries: Software Development, financial technology, innovation studio, product studio.

4. Locations
- India Office: Kapil Towers; Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India. (source: SerpApi Google knowledge graph)
- External Source Mention: San Mateo, California, United States. (source: Hunter company enrichment)
- External Source Mention: Latvia. (source: Tracxn snippet)

5. Operating Hours
- Friday: 9 AM - 6 PM.
- Saturday: Closed.
- Sunday: Closed.
- Monday: 9 AM - 6 PM.
- Tuesday Eid al-Adha: 9 AM - 6 PM; Hours might differ.
- Wednesday Eid al-Adha: 9 AM - 6 PM; Hours might differ.
- Thursday: 9 AM - 6 PM.

6. Products & Services
- Creation platform.
- Digital products and businesses.
- Product creation platform.
- Financial management platform for businesses.
- Consolidated banking and real-time financial management solutions.

7. Founders & Leadership
- Seth Marlatt, CEO & Co-founder.
- Pat Connors, CEO & Co-Founder.

8. Team Members
- Jeff Cappel, Head of Design, design.
- Aditya Chopra, Associate Director, management.
- Kandarp Shah, Senior Director, management.
- Himanshu Gauba, Vice President of Engineering, executive.
- Ashok Sarraf, Director of Engineering, management.
- Suresh Nandi, Principal Engineer, education.
- Manju Kalagi, Quality Engineer, operations.
- Vanshika Sachdev, Senior Software Engineer, it.
- Varun Kukade, Senior Software Engineer, it.
- Deepti Vaidyula, Principal Engineer, education.

9. Technologies & Stack
- amazon-web-services, docker, hsts, java, kafka, kubernetes, microsoft-azure, mongodb, nosql, sql, squarespace, stimulus.

10. Investors & Funding
- Caffeinated Capital, Clocktower Ventures, Founders Fund, Haystack Management Company, and Lux Capital are listed in a PitchBook snippet as 5 of 6 investors.

11. Partnerships & Customers
- Startups, Global Fortune 500 companies, large corporations, Lowe's Companies, Inc., Svedka, LVMH, Microsoft AI.

12. Social Profiles
- LinkedIn: https://www.linkedin.com/company/altirllc — 7.7K+ followers.
- Instagram: https://www.instagram.com/altir.co/ — 70+ followers.

13. Ratings & Reviews
- Google knowledge graph: rating 5, review count 2.
- AmbitionBox: rating 3.8, review count 5.

14. Recent News & Activity
- Altir Comes out of Stealth, Launches Product Creation Platform To Accelerate Innovation and Alter Outcomes for Startup and Enterprises — PR Newswire, Apr 28, 2022.
- Altir accelerator program aims to help startups, enterprises bring ideas and products to market — The Business Journals, May 11, 2022.

15. Key Insights & Risks
- Location, founded year, and company identity vary by source.
- NewsApi is intentionally represented as a failed API-key source in this example.
- Several Altair search results are unrelated to Altir and need relevance filtering.

16. Source Attribution Index
- SerpApi Google knowledge graph, SerpApi organic results, Hunter domain search, Hunter company enrichment, PitchBook snippet, Tracxn snippet, LinkedIn search result, Instagram search result, PR Newswire, The Business Journals.`,
} satisfies SummaryPipelineResult

export const exampleGraphData = {
  facts: [
    {
      subject: "Altir",
      predicate: "is_described_as",
      object: "product studio",
      confidence: 1,
      evidence: "Altir is a product studio that accelerates outcomes.",
    },
    {
      subject: "Altir",
      predicate: "is_described_as",
      object: "innovation studio",
      confidence: 1,
      evidence:
        "We're an Innovation studio where Fortune 500s innovate like startups.",
    },
    {
      subject: "Altir India Private Limited",
      predicate: "located_in",
      object: "Kapil Towers",
      confidence: 1,
      evidence: "located_in: Kapil Towers",
    },
    {
      subject: "Altir India Private Limited",
      predicate: "has_address",
      object:
        "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
      confidence: 1,
      evidence:
        "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
    },
    {
      subject: "Altir",
      predicate: "located_in",
      object: "San Mateo, California, United States",
      confidence: 1,
      evidence: "location: San Mateo, California, United States",
    },
    {
      subject: "Altir",
      predicate: "uses_technology",
      object: "kubernetes",
      confidence: 1,
      evidence: "tech: kubernetes",
    },
    {
      subject: "Altir",
      predicate: "uses_technology",
      object: "mongodb",
      confidence: 1,
      evidence: "tech: mongodb",
    },
    {
      subject: "Seth Marlatt",
      predicate: "has_role",
      object: "CEO & Co-founder",
      confidence: 1,
      evidence: "Seth Marlatt, CEO & Co-founder, Altir",
    },
    {
      subject: "Pat Connors",
      predicate: "has_role",
      object: "CEO & Co-Founder",
      confidence: 1,
      evidence: "Pat Connors CEO & Co-Founder",
    },
    {
      subject: "Altir Industries",
      predicate: "has_investor",
      object: "Founders Fund",
      confidence: 1,
      evidence:
        "Caffeinated Capital, Clocktower Ventures, Founders Fund, Haystack Management Company, and Lux Capital...",
    },
  ],
  entities: [
    { canonical: "Altir", aliases: ["altir", "Altir LLC"], type: "COMPANY" },
    {
      canonical: "Altir India Private Limited",
      aliases: ["Altir India"],
      type: "COMPANY",
    },
    {
      canonical: "Altir Industries",
      aliases: ["Altir Industries, Inc."],
      type: "COMPANY",
    },
    { canonical: "product studio", aliases: [], type: "INDUSTRY" },
    { canonical: "innovation studio", aliases: [], type: "INDUSTRY" },
    { canonical: "Kapil Towers", aliases: [], type: "LOCATION" },
    {
      canonical:
        "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
      aliases: ["Altir Hyderabad address"],
      type: "LOCATION",
    },
    {
      canonical: "San Mateo, California, United States",
      aliases: ["San Mateo, California"],
      type: "LOCATION",
    },
    { canonical: "kubernetes", aliases: ["Kubernetes"], type: "TECHNOLOGY" },
    { canonical: "mongodb", aliases: ["MongoDB"], type: "TECHNOLOGY" },
    { canonical: "Seth Marlatt", aliases: [], type: "PERSON" },
    { canonical: "CEO & Co-founder", aliases: [], type: "EVENT" },
    { canonical: "Pat Connors", aliases: [], type: "PERSON" },
    { canonical: "CEO & Co-Founder", aliases: [], type: "EVENT" },
    { canonical: "Founders Fund", aliases: [], type: "INVESTOR" },
  ],
  graph: {
    nodes: [
      { id: "altir", label: "Altir", type: "COMPANY" },
      {
        id: "altir_india_private_limited",
        label: "Altir India Private Limited",
        type: "COMPANY",
      },
      { id: "altir_industries", label: "Altir Industries", type: "COMPANY" },
      { id: "product_studio", label: "product studio", type: "INDUSTRY" },
      { id: "innovation_studio", label: "innovation studio", type: "INDUSTRY" },
      { id: "kapil_towers", label: "Kapil Towers", type: "LOCATION" },
      {
        id: "survey_no_115_1_7th_floor_financial_district_nanakramguda_telangana_500032_india",
        label:
          "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
        type: "LOCATION",
      },
      {
        id: "san_mateo_california_united_states",
        label: "San Mateo, California, United States",
        type: "LOCATION",
      },
      { id: "kubernetes", label: "kubernetes", type: "TECHNOLOGY" },
      { id: "mongodb", label: "mongodb", type: "TECHNOLOGY" },
      { id: "seth_marlatt", label: "Seth Marlatt", type: "PERSON" },
      { id: "ceo_co_founder", label: "CEO & Co-founder", type: "EVENT" },
      { id: "pat_connors", label: "Pat Connors", type: "PERSON" },
      { id: "founders_fund", label: "Founders Fund", type: "INVESTOR" },
    ],
    edges: [
      {
        source: "altir",
        target: "product_studio",
        relation: "is_described_as",
        confidence: 1,
        evidence: "Altir is a product studio that accelerates outcomes.",
      },
      {
        source: "altir",
        target: "innovation_studio",
        relation: "is_described_as",
        confidence: 1,
        evidence:
          "We're an Innovation studio where Fortune 500s innovate like startups.",
      },
      {
        source: "altir_india_private_limited",
        target: "kapil_towers",
        relation: "located_in",
        confidence: 1,
        evidence: "located_in: Kapil Towers",
      },
      {
        source: "altir_india_private_limited",
        target:
          "survey_no_115_1_7th_floor_financial_district_nanakramguda_telangana_500032_india",
        relation: "has_address",
        confidence: 1,
        evidence:
          "Survey No. 115/1, 7th Floor, Financial District, Nanakramguda, Telangana 500032, India",
      },
      {
        source: "altir",
        target: "san_mateo_california_united_states",
        relation: "located_in",
        confidence: 1,
        evidence: "location: San Mateo, California, United States",
      },
      {
        source: "altir",
        target: "kubernetes",
        relation: "uses_technology",
        confidence: 1,
        evidence: "tech: kubernetes",
      },
      {
        source: "altir",
        target: "mongodb",
        relation: "uses_technology",
        confidence: 1,
        evidence: "tech: mongodb",
      },
      {
        source: "seth_marlatt",
        target: "ceo_co_founder",
        relation: "has_role",
        confidence: 1,
        evidence: "Seth Marlatt, CEO & Co-founder, Altir",
      },
      {
        source: "altir_industries",
        target: "founders_fund",
        relation: "has_investor",
        confidence: 1,
        evidence:
          "Caffeinated Capital, Clocktower Ventures, Founders Fund, Haystack Management Company, and Lux Capital...",
      },
    ],
  },
} satisfies KnowledgeGraphPipelineResult

export const exampleResearchPayload = {
  rawData: exampleRawData,
  summary: exampleSummaryData,
  graph: exampleGraphData,
} satisfies ExampleResearchPayload
