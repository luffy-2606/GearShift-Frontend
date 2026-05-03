import { defineType, defineField } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'context', title: 'Context Section' },
    { name: 'video', title: 'Video Section' },
    { name: 'features', title: 'Features Section' },
    { name: 'reviews', title: 'Reviews Section' },
  ],
  fields: [
    // Hero 
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      description: 'Large heading word shown in the hero (e.g. "enhance").',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroCoverImage',
      title: 'Hero Cover / Overlay Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      description: 'Car cover image that animates on load.',
    }),

    // Context
    defineField({
      name: 'contextHeading',
      title: 'Context Heading',
      type: 'string',
      group: 'context',
    }),
    defineField({
      name: 'contextHeadingAccent',
      title: 'Context Heading Accent (gradient text)',
      type: 'string',
      group: 'context',
      description: 'Second line of the heading shown with gradient effect.',
    }),
    defineField({
      name: 'contextBody',
      title: 'Context Body Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      group: 'context',
      description: 'Each item becomes a separate paragraph.',
    }),
    defineField({
      name: 'contextBackgroundImage',
      title: 'Context Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'context',
    }),
    defineField({
      name: 'contextCardTitle',
      title: '"Why Us?" Card Title',
      type: 'string',
      group: 'context',
    }),
    defineField({
      name: 'contextCardBody',
      title: '"Why Us?" Card Body Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      group: 'context',
    }),

    // Video
    defineField({
      name: 'videoFile',
      title: 'Background Video',
      type: 'file',
      options: { accept: 'video/*' },
      group: 'video',
    }),
    defineField({
      name: 'videoSectionTitle',
      title: 'Section Heading',
      type: 'string',
      group: 'video',
      description: 'e.g. "What We Offer"',
    }),
    defineField({
      name: 'videoCards',
      title: 'Feature Cards',
      type: 'array',
      of: [{ type: 'featureCard' }],
      group: 'video',
    }),

    // Features
    defineField({
      name: 'featuresHeading',
      title: 'Features Heading',
      type: 'string',
      group: 'features',
    }),
    defineField({
      name: 'featuresHeadingAccent',
      title: 'Features Heading Accent',
      type: 'string',
      group: 'features',
    }),
    defineField({
      name: 'featuresSubheading',
      title: 'Features Subheading',
      type: 'text',
      rows: 3,
      group: 'features',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{ type: 'statItem' }],
      group: 'features',
    }),
    defineField({
      name: 'services',
      title: 'Service Cards (scrolling gallery)',
      type: 'array',
      of: [{ type: 'serviceCard' }],
      group: 'features',
    }),

    // Reviews
    defineField({
      name: 'reviewsHeading',
      title: 'Reviews Section Heading',
      type: 'string',
      group: 'reviews',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reviewItem' }],
      group: 'reviews',
    }),
  ],
  preview: { prepare: () => ({ title: 'Landing Page' }) },
})
