import { cleanJson } from '../Utils/cleanJson.js'

export async function generateRoadmap(
  ai,
  businessConcept
) {
  const prompt = `
Buat roadmap bisnis selama 1 tahun dan dibagi menjadi 4 kuartal.

Bisnis:

${JSON.stringify(businessConcept)}

Output JSON:

[
  {
    "id": "phase-1",
    "title": "",
    "description": "",
    "tasks": []
  }
]
`

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  })

  return cleanJson(response.text)
}