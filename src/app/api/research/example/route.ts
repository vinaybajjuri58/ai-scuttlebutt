import { exampleResearchPayload } from "@/lib/example-research-data"

export async function GET() {
  return Response.json(exampleResearchPayload)
}
