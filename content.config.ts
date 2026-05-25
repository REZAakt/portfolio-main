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
  url: z.string().nonempty(),
  tags: z.array(z.string()),
  date: z.date()
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

const speakingSchema = z.object({
  links: z.array(createButtonSchema()),
  events: z.array(
    z.object({
      category: z.enum(['Live talk', 'Podcast', 'Conference']),
      title: z.string(),
      date: z.date(),
      location: z.string(),
      url: z.string().optional()
    })
  )
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
      type: 'data',
      source: [{ include: 'fa/projects/*.yml' }, { include: 'en/projects/*.yml' }],
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

    speaking: defineCollection({
      type: 'page',
      source: [{ include: 'fa/speaking.yml' }, { include: 'en/speaking.yml' }],
      schema: speakingSchema
    }),

    about: defineCollection({
      type: 'page',
      source: [{ include: 'fa/about.yml' }, { include: 'en/about.yml' }],
      schema: aboutSchema
    })
  }
})
