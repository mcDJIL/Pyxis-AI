import { cleanJson } from '../Utils/cleanJson.js'

export async function generateProspect(
  ai,
  businessConcept
) {
  const prompt = `
Analisis prospek bisnis berikut:

${JSON.stringify(businessConcept)}

Berikan skor berdasarkan:

- Market Demand
- Scalability
- Competition
- Profitability

Output JSON:

{
  "score": 0,
  "description": ""
}
`

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: prompt,
  })

  return cleanJson(response.text)
}