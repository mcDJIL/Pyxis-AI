import OpenAI from 'openai'
import { analyzeBusiness } from '../src/Backend/Services/analyzeBusiness.js'

// Initialize OpenAI client dengan Sumopod API
const initializeAI = () => {
  const apiKey = process.env.SUMOPOD_KEY

  if (!apiKey) {
    throw new Error('SUMOPOD_KEY environment variable is not set')
  }

  return new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://ai.sumopod.com/v1',
  })
}

let ai
try {
  ai = initializeAI()
} catch (error) {
  console.error('Failed to initialize AI:', error.message)
}

/**
 * Vercel Serverless Function Handler
 * Endpoint: POST /api/analyze-business
 *
 * Request body:
 * {
 *   idea: string,                    // Business idea description
 *   settings: {                      // Optional
 *     globalInstruction?: string,
 *     language?: string,
 *     financialDepth?: number
 *   }
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   analysis: { ... },               // Analysis result
 *   timestamp: string,
 *   message?: string                 // Error message if failed
 * }
 */
export default async function handler(req, res) {
  // === CORS Headers ===
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // === Handle Preflight (OPTIONS) ===
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // === Only Accept POST ===
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST request.',
      code: 'METHOD_NOT_ALLOWED',
    })
  }

  try {
    // === Validate AI Client ===
    if (!ai) {
      return res.status(500).json({
        success: false,
        message: 'AI service is not properly configured',
        code: 'AI_NOT_INITIALIZED',
      })
    }

    // === Extract Request Body ===
    const { idea, settings = {} } = req.body

    // === Validate Input ===
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request. "idea" must be a string.',
        code: 'INVALID_INPUT',
      })
    }

    const trimmedIdea = idea.trim()
    if (!trimmedIdea) {
      return res.status(400).json({
        success: false,
        message: 'Business idea cannot be empty',
        code: 'EMPTY_IDEA',
      })
    }

    // === Log Request ===
    console.log('====================================')
    console.log('📊 NEW ANALYSIS REQUEST')
    console.log('Idea:', trimmedIdea.substring(0, 80) + (trimmedIdea.length > 80 ? '...' : ''))
    console.log('Settings:', JSON.stringify(settings))
    console.log('Timestamp:', new Date().toISOString())
    console.log('====================================')

    // === Call Analysis Service with Timeout ===
    const analysisPromise = analyzeBusiness(ai, trimmedIdea, settings)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Request timeout (60 seconds)')),
        60000 // 60 second timeout
      )
    )

    const analysis = await Promise.race([analysisPromise, timeoutPromise])

    // === Success Response ===
    return res.status(200).json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    // === Error Handling ===
    const errorMessage = error.message || 'Unknown error occurred'
    const errorCode = error.code || 'ANALYSIS_ERROR'

    console.error('====================================')
    console.error('❌ ANALYSIS ERROR')
    console.error('Message:', errorMessage)
    console.error('Code:', errorCode)
    console.error('Stack:', error.stack)
    console.error('Timestamp:', new Date().toISOString())
    console.error('====================================')

    // === Determine Status Code & Message ===
    let statusCode = 500
    let userMessage = 'An error occurred while analyzing the business'

    if (errorMessage.includes('timeout')) {
      statusCode = 504
      userMessage = 'Request took too long. Please try again.'
    } else if (errorMessage.includes('API') || errorMessage.includes('key')) {
      statusCode = 500
      userMessage = 'API configuration error. Please contact support.'
    } else if (errorMessage.includes('network') || errorMessage.includes('ECONNREFUSED')) {
      statusCode = 503
      userMessage = 'Network error. Please try again.'
    } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      statusCode = 401
      userMessage = 'Authentication failed. Invalid API key.'
    } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
      statusCode = 429
      userMessage = 'Too many requests. Please try again later.'
    }

    return res.status(statusCode).json({
      success: false,
      message: userMessage,
      code: errorCode,
      // Include error details hanya di development
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    })
  }
}