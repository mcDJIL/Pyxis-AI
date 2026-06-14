import { expandIdea } from './expandIdea.js'
import { generateSummary } from './generateSummary.js'
import { generateSwot } from './generateSwot.js'
import { generateRoadmap } from './generateRoadmap.js'
import { generateProspect } from './generateProspect.js'

export async function analyzeBusiness(
  ai,
  userIdea
) {
  const businessConcept =
    await expandIdea(ai, userIdea)

  const [
    summary,
    swot,
    roadmap,
    prospect,
  ] = await Promise.all([
    generateSummary(ai, businessConcept),
    generateSwot(ai, businessConcept),
    generateRoadmap(ai, businessConcept),
    generateProspect(ai, businessConcept),
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