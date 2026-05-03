import { useState, useEffect } from 'react'
import { sanityClient } from '../client'
import { PAGE_CONFIG_QUERY } from '../queries'
import { mapPageConfig } from '../mappers'

const cache = {}

export function usePageConfig(slug) {
  const [config, setConfig] = useState(cache[slug] || mapPageConfig(null, slug))
  const [loading, setLoading] = useState(!cache[slug])

  useEffect(() => {
    if (cache[slug]) return
    if (!sanityClient) {
      setLoading(false)
      return
    }
    sanityClient
      .fetch(PAGE_CONFIG_QUERY, { slug })
      .then((doc) => {
        cache[slug] = mapPageConfig(doc, slug)
        setConfig(cache[slug])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  // Apply browser tab title whenever config changes
  useEffect(() => {
    if (config?.pageTitle) {
      document.title = config.pageTitle
    }
  }, [config])

  return { config, loading }
}
