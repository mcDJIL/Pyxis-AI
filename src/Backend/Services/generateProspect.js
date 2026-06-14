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
    'Korean': 'Korean',
    'Chinese (Simplified)': 'Simplified Chinese',
  }

  const outputLanguage = languageMap[language] || 'English'
  const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut:\n${globalInstruction}` : ''

  const prompt = `
Analisis prospek bisnis berikut:

${JSON.stringify(businessConcept)}

Berikan skor (skala 0-10) berdasarkan:
- Market Demand
- Scalability
- Competition
- Profitability

Respond dalam bahasa ${outputLanguage}.${globalContext}

Output JSON:

{
  "score": 8.5,
  "label": "High Potential",
  "insights": [
    {
      "id": "growth",
      "title": "Growth Opportunities",
      "description": "..."
    },
    {
      "id": "scalability",
      "title": "Market Scalability",
      "description": "..."
    },
    {
      "id": "competitive",
      "title": "Competitive Advantage",
      "description": "..."
    }
  ]
}

Catatan:
- "score" adalah angka desimal antara 0 hingga 10
- "label" bisa berupa: "High Potential", "Medium Potential", atau "Low Potential"
- Setiap insight harus memiliki deskripsi 2-3 kalimat yang spesifik dan relevan
`

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: [{ text: prompt }],
  })

  return cleanJson(response.text)
}
