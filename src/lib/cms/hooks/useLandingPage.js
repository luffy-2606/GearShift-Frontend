import { useState, useEffect } from 'react'
import { sanityClient } from '../client'
import { LANDING_PAGE_QUERY } from '../queries'
import { mapLandingPage } from '../mappers'

let cachedData = null

export function useLandingPage() {
  const [data, setData] = useState(cachedData || mapLandingPage(null))
  const [loading, setLoading] = useState(!cachedData)

  useEffect(() => {
    if (cachedData) return
    if (!sanityClient) {
      setLoading(false)
      return
    }
    sanityClient
      .fetch(LANDING_PAGE_QUERY)
      .then((doc) => {
        cachedData = mapLandingPage(doc)
        setData(cachedData)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}
