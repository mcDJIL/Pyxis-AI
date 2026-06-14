import { cleanJson } from '../Utils/cleanJson.js'

export async function expandIdea(ai, userIdea) {
    const prompt = `
Anda adalah seorang Venture Builder dan Business Consultant.

Jika user memberikan ide yang terlalu umum,
buat asumsi yang masuk akal dan kembangkan menjadi
konsep bisnis yang lebih matang.

Kembalikan HANYA JSON VALID.

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

    const response = await ai.models.generateContent({
        model: process.env.MODEL,
        contents: prompt,
    })

    return cleanJson(response.text)
}