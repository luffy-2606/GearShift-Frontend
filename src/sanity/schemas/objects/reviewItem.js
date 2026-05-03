import { defineType, defineField } from 'sanity'

export const reviewItem = defineType({
  name: 'reviewItem',
  title: 'Review',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Reviewer Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'avatar', title: 'Avatar Initials', type: 'string', description: 'e.g. JS' }),
    defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (R) => R.required().min(1).max(5) }),
    defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'service', title: 'Service Used', type: 'string' }),
    defineField({ name: 'verified', title: 'Verified', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'service' } },
})
