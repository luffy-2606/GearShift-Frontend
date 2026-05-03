import { defineType, defineField } from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
})
