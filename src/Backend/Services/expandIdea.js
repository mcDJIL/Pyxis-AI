import { cleanJson } from '../Utils/cleanJson.js'

export async function expandIdea(ai, userIdea, settings = {}) {
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
    const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut dalam semua respons:\n${globalInstruction}` : ''

    const prompt = `
Anda adalah seorang Venture Builder dan Business Consultant.

Jika user memberikan ide yang terlalu umum,
buat asumsi yang masuk akal dan kembangkan menjadi
konsep bisnis yang lebih matang.

Kembalikan output dalam bahasa: ${outputLanguage}.
Kembalikan HANYA JSON VALID.${globalContext}

{
  "businessName": "",
  "industry": "",
  "targetMarket": "",
  "valueProposition": "",
  "description": "",
  "revenueModel": "",
  "assumptions": []
}

User Idea:
${userIdea}
`

    const response = await ai.chat.completions.create({
        model: process.env.MODEL || 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
    })

    return cleanJson(response.choices[0].message.content)
}
