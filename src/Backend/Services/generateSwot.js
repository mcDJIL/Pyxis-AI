import { cleanJson } from '../Utils/cleanJson.js'

export async function generateSwot(
  ai,
  businessConcept,
  settings = {}
) {
  const { globalInstruction = '', language = 'English (US)', swotDepth = 2 } = settings

  const languageMap = {
    'English (US)': 'English',
    'Indonesian': 'Indonesian (Bahasa Indonesia)',
    'Spanish': 'Spanish',
    'French': 'French',
    'German': 'German',
    'Japanese': 'Japanese',
    'Chinese (Simplified)': 'Simplified Chinese',
  }

  const depthMap = {
    0: 'Provide 3-5 items per kategori',
    1: 'Provide 5-8 items per kategori dengan detail menengah',
    2: 'Provide 8-12 items per kategori dengan analisis mendalam dan actionable insights',
  }

  const outputLanguage = languageMap[language] || 'English'
  const depthInstruction = depthMap[swotDepth] || depthMap[2]
  const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut:\n${globalInstruction}` : ''

  const prompt = `
Analisis SWOT untuk bisnis berikut:

${JSON.stringify(businessConcept)}

${depthInstruction}

Kembalikan response dalam bahasa ${outputLanguage}.${globalContext}

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
    contents: [{ text: prompt }],
  })

  return cleanJson(response.text)
}
