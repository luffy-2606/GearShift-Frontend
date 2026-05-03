import { defineType, defineField } from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'href', title: 'URL / Path', type: 'string', validation: (R) => R.required() }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
})
