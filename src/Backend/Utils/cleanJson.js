export function cleanJson(text) {
  try {
    let cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const jsonMatch = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }

    const parsed = JSON.parse(cleaned)
    return parsed
  } catch (error) {
    console.error('JSON Parse Error:', error.message)
    console.error('Attempted to parse:', text.substring(0, 500))
    console.error('Full response:', text)

    throw new Error(
      'AI menghasilkan format JSON yang tidak valid. ' + error.message
    )
  }
}
