
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    logo,
    favicon,
    navLinks[] { label, href },
    footerText
  }
`

export const LANDING_PAGE_QUERY = `
  *[_type == "landingPage" && _id == "landingPage"][0] {
    heroHeading,
    heroImage,
    heroCoverImage,
    contextHeading,
    contextHeadingAccent,
    contextBody,
    contextBackgroundImage,
    contextCardTitle,
    contextCardBody,
    "videoUrl": videoFile.asset->url,
    videoSectionTitle,
    videoCards[] { title, description },
    featuresHeading,
    featuresHeadingAccent,
    featuresSubheading,
    stats[] { value, label },
    services[] { name, image },
    reviewsHeading,
    reviews[] { name, avatar, rating, text, location, service, verified }
  }
`

export const PAGE_CONFIG_QUERY = `
  *[_type == "pageConfig" && slug.current == $slug][0] {
    pageTitle,
    seoTitle,
    seoDescription,
    backgroundImage
  }
`

export const ALL_PAGE_CONFIGS_QUERY = `
  *[_type == "pageConfig"] {
    "slug": slug.current,
    pageTitle,
    seoTitle,
    seoDescription,
    backgroundImage
  }
`
