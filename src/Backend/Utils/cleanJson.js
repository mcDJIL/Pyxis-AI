export function cleanJson(text) {
  try {
    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    return JSON.parse(cleaned)
  } catch (error) {
    console.error('JSON Parse Error:', error)

    throw new Error(
      'AI menghasilkan format JSON yang tidak valid'
    )
  }
}