import { expandIdea } from './expandIdea.js'
import { generateSummary } from './generateSummary.js'
import { generateSwot } from './generateSwot.js'
import { generateRoadmap } from './generateRoadmap.js'
import { generateProspect } from './generateProspect.js'

export async function analyzeBusiness(
  ai,
  userIdea,
  settings = {}
) {
  const businessConcept =
    await expandIdea(ai, userIdea, settings)

  const [
    summary,
    swot,
    roadmap,
    prospect,
  ] = await Promise.all([
    generateSummary(ai, businessConcept, settings),
    generateSwot(ai, businessConcept, settings),
    generateRoadmap(ai, businessConcept, settings),
    generateProspect(ai, businessConcept, settings),
  ])

  return {
    generatedAt: new Date().toISOString(),
    summary,
    businessConcept,
    swot,
    roadmap,
    prospect,
  }
}
