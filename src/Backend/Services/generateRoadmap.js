import { cleanJson } from '../Utils/cleanJson.js'

export async function generateRoadmap(
  ai,
  businessConcept,
  settings = {}
) {
  const { globalInstruction = '', language = 'English (US)', financialDepth = 1 } = settings

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

  const depthMap = {
    0: 'Keep roadmap items concise and high-level (1-2 points per quarter)',
    1: 'Provide detailed roadmap with 3-5 action items per quarter',
    2: 'Create comprehensive roadmap with 6-10 detailed items per quarter including financial milestones, metrics, and strategic decisions',
  }

  const outputLanguage = languageMap[language] || 'English'
  const depthInstruction = depthMap[financialDepth] || depthMap[1]
  const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut:\n${globalInstruction}` : ''

  const prompt = `
Buat roadmap bisnis selama 1 tahun dan dibagi menjadi 4 kuartal.

${depthInstruction}

Respond dalam bahasa ${outputLanguage}.${globalContext}

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
    contents: [{ text: prompt }],
  })

  return cleanJson(response.text)
}
