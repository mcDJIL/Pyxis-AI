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

    // Post-process to remove markdown formatting from string values
    return cleanMarkdownFromObject(parsed)
  } catch (error) {
    console.error('JSON Parse Error:', error.message)
    console.error('Attempted to parse:', text.substring(0, 500))
    console.error('Full response:', text)

    throw new Error(
      'AI menghasilkan format JSON yang tidak valid. ' + error.message
    )
  }
}

function cleanMarkdownFromObject(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/^#+\s+/gm, '').replace(/[#•*-]\s+/g, '').trim()
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanMarkdownFromObject)
  }
  if (obj !== null && typeof obj === 'object') {
    const cleaned = {}
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = cleanMarkdownFromObject(value)
    }
    return cleaned
  }
  return obj
}
