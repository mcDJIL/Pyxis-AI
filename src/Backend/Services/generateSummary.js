import { cleanJson } from '../Utils/cleanJson.js'

export async function generateSummary(
  ai,
  businessConcept
) {
  const prompt = `
Berdasarkan konsep bisnis berikut:

${JSON.stringify(businessConcept)}

Buat Executive Summary profesional.

Output JSON:

{
  "title": "",
  "content": []
}
`

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: prompt,
  })

  return cleanJson(response.text)
}