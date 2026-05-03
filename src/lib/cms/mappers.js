import { urlFor } from './imageUrl'

// Fallback defaults 

const FALLBACKS = {
  siteSettings: {
    siteTitle: 'GearShift',
    siteDescription: 'Your Car, Understood. Finally.',
    logoUrl: '/GearShift/logo.png',
    favicon: null,
    navLinks: [
      { label: 'Shops', href: '/shops' },
      { label: 'Mechanics', href: '/mechanics' },
      { label: 'Service History', href: '/service-history' },
      { label: 'Cost Insights', href: '/cost-insights' },
    ],
    footerText: '© 2025 GearShift. All rights reserved.',
  },
  landingPage: {
    hero: {
      heading: 'enhance',
      heroImageUrl: '/GearShift/nbgn.jpg',
      coverImageUrl: '/GearShift/car_cover2.png',
    },
    context: {
      heading: 'The Problem',
      headingAccent: 'We Solve',
      body: [
        "Finding reliable car service shouldn't be a gamble. Yet millions of drivers struggle with opaque pricing, unverified mechanics, and booking systems that don't work.",
        'We built GearShift to change that. Transparent pricing, verified professionals, and real-time availability—all in one place.',
      ],
      backgroundImageUrl: '/GearShift/engine.png',
      cardTitle: 'Why GearShift?',
      cardBody: [
        'Finding reliable car service can be challenging, with concerns about pricing transparency and mechanic qualifications. GearShift addresses these challenges by providing upfront cost visibility, verified professional profiles, and real-time scheduling availability.',
        "Our comprehensive service tracking system maintains your complete maintenance history, enabling informed decisions about your vehicle's care. We deliver a streamlined, transparent, and dependable automotive service experience.",
      ],
    },
    video: {
      videoUrl: '/GearShift/video.mp4',
      sectionTitle: 'What We Offer',
      cards: [
        { title: 'Trusted Shops', description: 'Explore our curated network of verified automotive professionals. Filter by specialty, ratings, and availability to find your perfect match.' },
        { title: 'Schedule with Ease', description: 'Book appointments instantly with transparent pricing and real-time availability. Your service, your schedule, your terms.' },
        { title: 'Maintenance Tracking', description: "Track your complete service history, receive intelligent maintenance reminders, and gain valuable insights into your vehicle's health." },
        { title: 'Compare Pricing', description: 'Access transparent pricing from multiple providers. Make informed decisions with detailed cost breakdowns and service estimates.' },
        { title: 'Read Reviews', description: 'Browse authentic reviews from verified customers. Discover trusted mechanics through real experiences and community feedback.' },
        { title: 'Get Support', description: "Connect with our dedicated support team for any assistance. We're here to ensure your experience is seamless from start to finish." },
      ],
    },
    features: {
      heading: 'Mastering the',
      headingAccent: 'Art of Service',
      subheading: "For over a decade, we've been revolutionizing the automotive service industry. Our commitment to excellence has earned the trust of drivers across the nation.",
      stats: [
        { value: '10+', label: 'Years of Trust' },
        { value: '50,000+', label: 'Happy Drivers' },
        { value: '2,400+', label: 'Verified Shops' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '150+', label: 'Cities Covered' },
        { value: '24/7', label: 'Support Available' },
      ],
      services: [
        { name: 'Professional Cleaners', imageUrl: '/GearShift/img1.jpg' },
        { name: 'Expert Polishing', imageUrl: '/GearShift/img2.jpg' },
        { name: 'Premium Foam Wash', imageUrl: '/GearShift/img3.jpg' },
        { name: 'Custom Vehicle Wraps', imageUrl: '/GearShift/img4.jpg' },
      ],
    },
    reviews: {
      heading: 'What Our Customers Say',
      items: [
        { name: 'John Smith', rating: 5, text: 'Exceptional service! The mechanics were professional and the pricing was transparent. Highly recommended for anyone looking for reliable car care.', location: 'New York', service: 'Oil Change', verified: true, avatar: 'JS' },
        { name: 'Sarah Johnson', rating: 5, text: 'Found my go-to mechanic through this platform. The booking process was seamless and the work was top-notch. Will definitely use again!', location: 'Los Angeles', service: 'Brake Service', verified: true, avatar: 'SJ' },
        { name: 'Michael Chen', rating: 5, text: 'The maintenance tracking feature is a game-changer. I can keep track of all my service history in one place. Brilliant idea!', location: 'Chicago', service: 'Maintenance', verified: true, avatar: 'MC' },
        { name: 'Emily Davis', rating: 5, text: 'Love the transparency in pricing. No hidden fees, no surprises. The reviews from other customers helped me make an informed decision.', location: 'Houston', service: 'Tire Rotation', verified: true, avatar: 'ED' },
        { name: 'Robert Wilson', rating: 5, text: 'Quick, efficient, and professional. The support team was incredibly helpful when I had questions about my service history.', location: 'Phoenix', service: 'Engine Repair', verified: true, avatar: 'RW' },
      ],
    },
  },
}

// Mappers

export function mapSiteSettings(doc) {
  if (!doc) return FALLBACKS.siteSettings
  return {
    siteTitle: doc.siteTitle || FALLBACKS.siteSettings.siteTitle,
    siteDescription: doc.siteDescription || FALLBACKS.siteSettings.siteDescription,
    logoUrl: urlFor(doc.logo, FALLBACKS.siteSettings.logoUrl),
    favicon: doc.favicon ? urlFor(doc.favicon) : null,
    navLinks: doc.navLinks?.length ? doc.navLinks : FALLBACKS.siteSettings.navLinks,
    footerText: doc.footerText || FALLBACKS.siteSettings.footerText,
  }
}

export function mapLandingPage(doc) {
  if (!doc) return FALLBACKS.landingPage
  const fb = FALLBACKS.landingPage
  return {
    hero: {
      heading: doc.heroHeading || fb.hero.heading,
      heroImageUrl: urlFor(doc.heroImage, fb.hero.heroImageUrl),
      coverImageUrl: urlFor(doc.heroCoverImage, fb.hero.coverImageUrl),
    },
    context: {
      heading: doc.contextHeading || fb.context.heading,
      headingAccent: doc.contextHeadingAccent || fb.context.headingAccent,
      body: doc.contextBody?.length ? doc.contextBody : fb.context.body,
      backgroundImageUrl: urlFor(doc.contextBackgroundImage, fb.context.backgroundImageUrl),
      cardTitle: doc.contextCardTitle || fb.context.cardTitle,
      cardBody: doc.contextCardBody?.length ? doc.contextCardBody : fb.context.cardBody,
    },
    video: {
      videoUrl: doc.videoUrl || fb.video.videoUrl,
      sectionTitle: doc.videoSectionTitle || fb.video.sectionTitle,
      cards: doc.videoCards?.length ? doc.videoCards : fb.video.cards,
    },
    features: {
      heading: doc.featuresHeading || fb.features.heading,
      headingAccent: doc.featuresHeadingAccent || fb.features.headingAccent,
      subheading: doc.featuresSubheading || fb.features.subheading,
      stats: doc.stats?.length ? doc.stats : fb.features.stats,
      services: doc.services?.length
        ? doc.services.map((s) => ({ name: s.name, imageUrl: urlFor(s.image, '') }))
        : fb.features.services,
    },
    reviews: {
      heading: doc.reviewsHeading || fb.reviews.heading,
      items: doc.reviews?.length ? doc.reviews : fb.reviews.items,
    },
  }
}

export function mapPageConfig(doc, slug) {
  const defaults = {
    home: { pageTitle: 'GearShift — Enhance Your Drive', backgroundImageUrl: null },
    login: { pageTitle: 'Sign In — GearShift', backgroundImageUrl: '/GearShift/login.png' },
    register: { pageTitle: 'Create Account — GearShift', backgroundImageUrl: '/GearShift/login.png' },
    dashboard: { pageTitle: 'Dashboard — GearShift', backgroundImageUrl: null },
  }
  const fb = defaults[slug] || { pageTitle: `GearShift`, backgroundImageUrl: null }
  if (!doc) return fb
  return {
    pageTitle: doc.seoTitle || doc.pageTitle || fb.pageTitle,
    backgroundImageUrl: urlFor(doc.backgroundImage, fb.backgroundImageUrl),
    seoDescription: doc.seoDescription || '',
  }
}
