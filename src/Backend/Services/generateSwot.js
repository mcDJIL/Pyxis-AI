import { cleanJson } from '../Utils/cleanJson.js'

export async function generateSwot(
  ai,
  businessConcept
) {
  const prompt = `
Analisis SWOT untuk bisnis berikut:

${JSON.stringify(businessConcept)}

Kembalikan JSON:

{
  "strengths": [],
  "weaknesses": [],
  "opportunities": [],
  "threats": []
}
`

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: prompt,
  })

  return cleanJson(response.text)
}