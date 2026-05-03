import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './structure'

const studioConfig = defineConfig({
  name: 'gearshift',
  title: 'GearShift Studio',
  basePath: '/studio',
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
})

export default studioConfig
