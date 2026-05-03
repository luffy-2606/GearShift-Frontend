import { defineType, defineField } from 'sanity'

export const serviceCard = defineType({
  name: 'serviceCard',
  title: 'Service Card',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Service Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', media: 'image' } },
})
