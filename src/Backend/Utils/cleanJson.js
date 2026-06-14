export function cleanJson(text) {
  try {
    let cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }

    return JSON.parse(cleaned)
  } catch (error) {
    console.error('JSON Parse Error:', error)
    console.error('Attempted to parse:', text.substring(0, 500))

    throw new Error(
      'AI menghasilkan format JSON yang tidak valid'
    )
  }
}
