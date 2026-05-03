import { defineType, defineField } from 'sanity'

export const featureCard = defineType({
  name: 'featureCard',
  title: 'Feature Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
})
