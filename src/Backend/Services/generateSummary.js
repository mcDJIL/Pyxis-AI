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
    'Chinese (Simplified)': 'Simplified Chinese',
  }

  const outputLanguage = languageMap[language] || 'English'
  const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut:\n${globalInstruction}` : ''

  const prompt = `
Berdasarkan konsep bisnis berikut:

${JSON.stringify(businessConcept)}

Buat Executive Summary profesional dalam bahasa ${outputLanguage}.${globalContext}

Output JSON:

{
  "title": "",
  "content": [
    "Pyxis AI is an innovative Visual Business Engine designed to transform raw business ideas into interactive AI-driven analytics dashboards. By leveraging advanced natural language processing and data visualization techniques, Pyxis AI empowers entrepreneurs and business professionals to quickly validate, analyze, and iterate on their concepts. The platform offers a seamless user experience, allowing users to input their business ideas in natural language and receive comprehensive insights, market analysis, and strategic recommendations in return. With its cutting-edge technology and user-centric design, Pyxis AI aims to revolutionize the way businesses develop and refine their strategies in a rapidly evolving market landscape."
  ]
}
`

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: prompt,
  })

  return cleanJson(response.text)
}
