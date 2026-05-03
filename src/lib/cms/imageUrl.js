import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

// Builds a Sanity image URL from a Sanity image reference object.
export function urlFor(source, fallback = '') {
  if (!builder || !source) return fallback
  return builder.image(source).auto('format').url()
}

// Builds a Sanity image URL with explicit width/quality for responsive use.
export function urlForWidth(source, width, fallback = '') {
  if (!builder || !source) return fallback
  return builder.image(source).width(width).auto('format').quality(80).url()
}
