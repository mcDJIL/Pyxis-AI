import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

import { analyzeBusiness } from './Services/analyzeBusiness.js'

dotenv.config({ path: '../../.env' })

const app = express()

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.get('/', (req, res) => {
  res.send('Business AI Backend Running 🚀')
})

app.post('/api/analyze-business', async (req, res) => {
  try {
    const { idea, settings = {} } = req.body

    if (!idea?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Business idea is required',
      })
    }

    console.log('====================================')
    console.log('NEW ANALYSIS REQUEST')
    console.log('Idea:', idea)
    console.log('Settings:', settings)
    console.log('====================================')

    const analysis = await analyzeBusiness(
      ai,
      idea,
      settings
    )

    res.json({
      success: true,
      analysis,
    })

  } catch (error) {

    console.error('Analysis Error:')
    console.error(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  )
})
