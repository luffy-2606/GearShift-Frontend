import { createClient } from '@sanity/client'

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production'
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION || '2024-01-01'

// Returns null when env vars are not added
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null
