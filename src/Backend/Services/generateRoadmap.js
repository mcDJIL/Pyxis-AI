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

  // Quarter names untuk setiap bahasa
  const quarterNames = {
    'English (US)': ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
    'Indonesian': ['Kuartal 1', 'Kuartal 2', 'Kuartal 3', 'Kuartal 4'],
    'Spanish': ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4'],
    'French': ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4'],
    'German': ['Quartal 1', 'Quartal 2', 'Quartal 3', 'Quartal 4'],
    'Japanese': ['第1四半期', '第2四半期', '第3四半期', '第4四半期'],
    'Korean': ['1분기', '2분기', '3분기', '4분기'],
    'Chinese (Simplified)': ['第一季度', '第二季度', '第三季度', '第四季度'],
  }

  const depthMap = {
    0: 'Keep roadmap items concise and high-level (1-2 points per quarter)',
    1: 'Provide detailed roadmap with 3-5 action items per quarter',
    2: 'Create comprehensive roadmap with 6-10 detailed items per quarter including financial milestones, metrics, and strategic decisions',
  }

  const outputLanguage = languageMap[language] || 'English'
  const quarterLabels = quarterNames[language] || quarterNames['English (US)']
  const depthInstruction = depthMap[financialDepth] || depthMap[1]
  const globalContext = globalInstruction ? `\n\nKepatuhan terhadap context berikut:\n${globalInstruction}` : ''

  // Generate quarter objects untuk dijadikan contoh
  const quarterExamples = quarterLabels.map((quarter, index) => ({
    id: `q${index + 1}`,
    quarter: quarter,
    position: index % 2 === 0 ? 'left' : 'right', // Alternating LEFT-RIGHT
    summaryTitle: '',
    summaryText: '',
    detailedTitle: '',
    themeColor: '',
    detailedContent: [
      'Example achievement or milestone',
      'Key metric or validation point',
      'Strategic focus area or outcome',
    ]
  }))

  const prompt = `
Buat roadmap bisnis selama 1 tahun dan dibagi menjadi 4 kuartal.

${depthInstruction}

Respond dalam bahasa ${outputLanguage}.${globalContext}

Bisnis:

${JSON.stringify(businessConcept)}

Output JSON (PENTING: Gunakan quarter names yang benar untuk bahasa ${language} dan position harus alternating LEFT-RIGHT):

${JSON.stringify(quarterExamples, null, 2)}
`

  const response = await ai.chat.completions.create({
    model: process.env.MODEL || 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return cleanJson(response.choices[0].message.content)
}