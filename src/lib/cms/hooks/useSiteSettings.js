import { useState, useEffect } from 'react'
import { sanityClient } from '../client'
import { SITE_SETTINGS_QUERY } from '../queries'
import { mapSiteSettings } from '../mappers'

let cachedSettings = null

export function useSiteSettings() {
  const [settings, setSettings] = useState(cachedSettings || mapSiteSettings(null))
  const [loading, setLoading] = useState(!cachedSettings)

  useEffect(() => {
    if (cachedSettings) return
    if (!sanityClient) {
      setLoading(false)
      return
    }
    sanityClient
      .fetch(SITE_SETTINGS_QUERY)
      .then((doc) => {
        cachedSettings = mapSiteSettings(doc)
        setSettings(cachedSettings)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { settings, loading }
}
