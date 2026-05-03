import { defineType, defineField } from 'sanity'

export const pageConfig = defineType({
  name: 'pageConfig',
  title: 'Page Config',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Page Route Key',
      type: 'slug',
      description: 'Matches the route path, e.g. "login", "register", "dashboard". Use "home" for the landing page.',
      options: { source: 'pageTitle', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Browser Tab Title',
      type: 'string',
      description: 'Shown in the browser tab for this page.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the <title> tag for SEO. Falls back to pageTitle.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-page background image (used on login, register, etc.).',
    }),
  ],
  preview: {
    select: { title: 'pageTitle', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `/${subtitle}` }),
  },
})
