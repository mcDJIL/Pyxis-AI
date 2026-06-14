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
Analisis prospek bisnis berikut secara mendalam:

${JSON.stringify(businessConcept)}

Berikan skor (skala 0-10) berdasarkan analisis:
- Market Demand: Berapa besar permintaan pasar?
- Scalability: Seberapa skalabel model bisnis ini?
- Competition: Tingkat kompetisi di pasar?
- Profitability: Potensi profitabilitas?

Respond dalam bahasa ${outputLanguage}.${globalContext}

Berikan respons HANYA sebagai valid JSON (tanpa markdown, tanpa penjelasan):

{
  "score": 8.5,
  "label": "High Potential",
  "insights": [
    {
      "id": "growth",
      "title": "Growth Opportunities",
      "description": "Deskripsi spesifik tentang peluang pertumbuhan yang dapat dicapai. Jelaskan pasar target, segmen pelanggan potensial, dan strategi penetrasi pasar. 2-3 kalimat yang relevan dan actionable."
    },
    {
      "id": "scalability",
      "title": "Market Scalability",
      "description": "Analisis kemampuan bisnis untuk scale. Bagaimana sistem dapat berkembang dengan pertumbuhan? Apa saja bottleneck potensial? Jelaskan infrastruktur dan resources yang diperlukan. 2-3 kalimat terperinci."
    },
    {
      "id": "competitive",
      "title": "Competitive Advantage",
      "description": "Identifikasi keunggulan kompetitif utama dibandingkan pesaing. Apa yang membuat bisnis ini unique? Bagaimana mempertahankan posisi di pasar? Jelaskan value proposition yang jelas. 2-3 kalimat spesifik."
    }
  ]
}

PENTING:
- "score" HARUS berupa angka desimal antara 0 dan 10
- "label" HARUS salah satu dari: "High Potential", "Medium Potential", atau "Low Potential"
- HARUS ada 3 insights dengan id: "growth", "scalability", "competitive"
- Setiap deskripsi HARUS 2-3 kalimat, spesifik, actionable, dan dalam bahasa ${outputLanguage}
- Respons HANYA JSON, tidak ada markdown atau teks tambahan
`

  const response = await ai.chat.completions.create({
    model: process.env.MODEL || 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return cleanJson(response.choices[0].message.content)
}
