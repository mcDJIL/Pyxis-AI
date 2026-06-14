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
    id: 'q1',
    quarter: 'Kuartal 1',
    summaryTitle: '',
    summaryText: '',
    detailedTitle: '',
    themeColor: '',
    position: '',
    detailedContent: [
      'Proprietary NLP engine reduces integration time by 40% in initial tests.',
      'High net dollar retention (124%) among enterprise cohorts validates mid-market focus.',
      'Short-term liquidity risk was partially mitigated by aggressive cash management strategies.',
    ]
  },
]
`

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: prompt,
  })

  return cleanJson(response.text)
}