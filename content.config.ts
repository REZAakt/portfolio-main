import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () =>
  z.object({
    title: z.string(),
    description: z.string()
  })

const createSeoSchema = () =>
  z
    .object({
      title: z.string().optional(),
      description: z.string().optional()
    })
    .optional()

const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
    target: z.enum(['_blank', '_self']).optional(),
    external: z.boolean().optional(),
    download: z.union([z.boolean(), z.string()]).optional()
  })

const createImageSchema = () =>
  z.object({
    src: z.string().editor({ input: 'media' }),
    alt: z.string()
  })

const createAuthorSchema = () =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional()
  })

const createTestimonialSchema = () =>
  z.object({
    quote: z.string(),
    author: createAuthorSchema()
  })

const indexSchema = z.object({
  seo: createSeoSchema(),
  title: z.string(),
  description: z.string(),

  hero: z.object({
    links: z.array(createButtonSchema()),
    images: z.array(createImageSchema())
  }),

  about: createBaseSchema(),

  experience: z.object({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(
      z.object({
        date: z.union([z.string(), z.date()]),
        position: z.string(),
        company: z.object({
          name: z.string(),
          url: z.string(),
          logo: z.string().editor({ input: 'icon' }),
          color: z.string()
        })
      })
    )
  }),

  testimonials: z.array(createTestimonialSchema()),

  blog: createBaseSchema(),

  faq: createBaseSchema().extend({
    categories: z.array(
      z.object({
        title: z.string().nonempty(),
        questions: z.array(
          z.object({
            label: z.string().nonempty(),
            content: z.string().nonempty()
          })
        )
      })
    )
  })
})

const projectSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().nonempty().editor({ input: 'media' }),
  url: z.string().optional(),
  tags: z.array(z.string()),
  date: z.date(),
  client: z.string().optional(),
  role: z.string().optional(),
  year: z.string().optional(),
  duration: z.string().optional(),
  platform: z.string().optional(),
  details: z
    .array(
      z.object({
        label: z.string(),
        value: z.string()
      })
    )
    .optional(),
  media: z
    .array(
      z.object({
        type: z.enum(['image', 'video']).default('image'),
        src: z.string().editor({ input: 'media' }),
        alt: z.string().optional(),
        poster: z.string().optional().editor({ input: 'media' }),
        caption: z.string().optional()
      })
    )
    .optional()
})

const blogSchema = z.object({
  minRead: z.number(),
  date: z.date(),
  image: z.string().nonempty().editor({ input: 'media' }),
  author: createAuthorSchema()
})

const pageSchema = z.object({
  links: z.array(createButtonSchema())
})

const contactSchema = z.object({
  seo: createSeoSchema(),
  title: z.string(),
  description: z.string(),
  primaryAction: z.string(),
  secondaryAction: z.string().optional(),
  resumeUrl: z.string().optional(),
  email: z.string().email(),
  emailSubject: z.string().optional(),
  emailBody: z.string().optional(),
  location: z.string().optional(),
  responseTime: z.string().optional(),
  availability: z.object({
    label: z.string().optional(),
    title: z.string(),
    badge: z.string(),
    description: z.string(),
    unavailableTitle: z.string().optional(),
    unavailableBadge: z.string().optional(),
    unavailableDescription: z.string().optional()
  }),
  quickInfo: z.array(
    z.object({
      label: z.string(),
      value: z.string()
    })
  ),
  contactTitle: z.string(),
  contactDescription: z.string(),
  contactCards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      label: z.string(),
      buttonIcon: z.string(),
      to: z.string(),
      target: z.enum(['_blank', '_self']).optional()
    })
  ),
  workTitle: z.string(),
  workDescription: z.string(),
  workTypes: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })
  ),
  processTitle: z.string(),
  processDescription: z.string(),
  process: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ),
  faqTitle: z.string(),
  faqDescription: z.string(),
  faqs: z.array(
    z.object({
      label: z.string(),
      content: z.string()
    })
  ),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    primaryAction: z.string(),
    to: z.string().optional(),
    target: z.enum(['_blank', '_self']).optional()
  }),
  links: z.array(createButtonSchema()).optional()
})

const aboutSchema = z.object({
  content: z.object({}),
  images: z.array(createImageSchema())
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: [{ include: 'fa/index.yml' }, { include: 'en/index.yml' }],
      schema: indexSchema
    }),

    projects: defineCollection({
      type: 'page',
      source: [{ include: 'fa/projects/*.md' }, { include: 'en/projects/*.md' }],
      schema: projectSchema
    }),

    blog: defineCollection({
      type: 'page',
      source: [{ include: 'fa/blog/*.md' }, { include: 'en/blog/*.md' }],
      schema: blogSchema
    }),

    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'fa/projects.yml' },
        { include: 'fa/blog.yml' },
        { include: 'en/projects.yml' },
        { include: 'en/blog.yml' }
      ],
      schema: pageSchema
    }),

    contact: defineCollection({
      type: 'page',
      source: [{ include: 'fa/contact.yml' }, { include: 'en/contact.yml' }],
      schema: contactSchema
    }),

    about: defineCollection({
      type: 'page',
      source: [{ include: 'fa/about.yml' }, { include: 'en/about.yml' }],
      schema: aboutSchema
    })
  }
})
