import { cleanJson } from '../Utils/cleanJson.js'

export async function generateProspect(
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
    'Chinese (Simplified)': 'Simplified Chinese',
  }

  const outputLanguage = languageMap[language] || 'English'
  const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut:\n${globalInstruction}` : ''

  const prompt = `
Analisis prospek bisnis berikut:

${JSON.stringify(businessConcept)}

Berikan skor berdasarkan:

- Market Demand
- Scalability
- Competition
- Profitability

Respond dalam bahasa ${outputLanguage}.${globalContext}

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
