import { cleanJson } from '../Utils/cleanJson.js'

export async function generateSummary(
  ai,
  businessConcept,
  settings = {}
) {
  const { globalInstruction = '', language = 'English (US)' } = settings

  const languageMap = {
    'English (US)': 'English',
    'Indonesian': 'Indonesian (Bahasa Indonesia)',
    'Spanish': 'Spanish',
    'French': 'French',
    'German': 'German',
    'Japanese': 'Japanese',
    'Korean': 'Korean',
    'Chinese (Simplified)': 'Simplified Chinese',
  }

  const outputLanguage = languageMap[language] || 'English'
  const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut:\n${globalInstruction}` : ''

  const prompt = `
Berdasarkan konsep bisnis berikut:

${JSON.stringify(businessConcept)}

Buat Executive Summary profesional dalam bahasa ${outputLanguage}.

PENTING:
- JANGAN gunakan markdown headers (###, ##, #)
- JANGAN gunakan bullet points (•, -, *)
- Struktur sebagai array of plain text paragraphs
${globalContext}

Output JSON:

{
  "title": "Business Executive Summary",
  "content": [
    "First paragraph summarizing the business concept and value proposition in plain text without any markdown or special formatting.",
    "Second paragraph with key metrics and financial projections in plain text format.",
    "Third paragraph with action plan and execution strategy in plain text format."
  ]
}
`

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: [{ text: prompt }],
  })

  return cleanJson(response.text)
}
