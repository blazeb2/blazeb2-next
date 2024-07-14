// for page navigation & to sort on leftbar
export const ROUTES = [
  {
    title: 'Getting Started',
    href: 'started',
    items: [
      { title: 'Introduction', href: '/introduction' },
      { title: 'Quick Start Guide', href: '/quick-start-guide' },
      { title: 'Use Config', href: '/use-config' },
      { title: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Quick Build',
    href: 'build',
    items: [
      { title: 'Netlify', href: '/netlify' },
      { title: 'Vercel', href: '/vercel' },
      { title: 'Heroku', href: '/heroku' },
      { title: 'Docker', href: '/docker' },
    ],
  },
]

export const page_routes = ROUTES.map(({ href, items }) => {
  return items.map((link) => {
    return {
      title: link.title,
      href: href + link.href,
    }
  })
}).flat()
