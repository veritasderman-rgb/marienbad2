import { config, fields, collection, singleton } from '@keystatic/core'
import { block, wrapper } from '@keystatic/core/content-components'

const markdocComponents = {
  figure: block({
    label: 'Figure',
    schema: {
      src: fields.text({ label: 'Image path', validation: { isRequired: true } }),
      alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }),
      caption: fields.text({ label: 'Caption' }),
      width: fields.select({
        label: 'Width',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Wide', value: 'wide' },
          { label: 'Full', value: 'full' },
        ],
        defaultValue: 'default',
      }),
    },
  }),
  gallery: wrapper({
    label: 'Gallery',
    schema: {
      columns: fields.integer({ label: 'Columns (2 or 3)', defaultValue: 2 }),
      caption: fields.text({ label: 'Caption' }),
    },
  }),
  'gallery-image': block({
    label: 'Gallery Image',
    schema: {
      src: fields.text({ label: 'Image path', validation: { isRequired: true } }),
      alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }),
    },
  }),
  pullquote: block({
    label: 'Pull Quote',
    schema: {
      text: fields.text({ label: 'Quote text', validation: { isRequired: true } }),
      cite: fields.text({ label: 'Citation' }),
    },
  }),
  'treatment-box': block({
    label: 'Treatment Box',
    schema: {
      title: fields.text({ label: 'Title', validation: { isRequired: true } }),
      description: fields.text({ label: 'Description', validation: { isRequired: true }, multiline: true }),
      icon: fields.select({
        label: 'Icon',
        options: [
          { label: 'Water', value: 'water' },
          { label: 'Earth', value: 'earth' },
          { label: 'Gas', value: 'gas' },
          { label: 'Climate', value: 'climate' },
        ],
        defaultValue: 'water',
      }),
    },
  }),
  'hotel-box': block({
    label: 'Hotel Box',
    schema: {
      name: fields.text({ label: 'Hotel name', validation: { isRequired: true } }),
      stars: fields.integer({ label: 'Stars (1–5)', validation: { isRequired: true } }),
      badge: fields.text({ label: 'Badge (optional)' }),
      description: fields.text({ label: 'Description', validation: { isRequired: true }, multiline: true }),
      bookingUrl: fields.text({ label: 'Booking URL', validation: { isRequired: true } }),
      bookingLabel: fields.text({ label: 'Button text', validation: { isRequired: true } }),
    },
  }),
}

const localeOptions = [
  { label: 'Deutsch', value: 'de' },
  { label: 'English', value: 'en' },
  { label: 'Čeština', value: 'cs' },
  { label: 'Русский', value: 'ru' },
]

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
]

const markdocBodyOptions = {
  heading: [2, 3, 4] as (2 | 3 | 4)[],
  bold: true,
  italic: true,
  strikethrough: true,
  link: true,
  orderedList: true,
  unorderedList: true,
  table: true,
  blockquote: true,
  divider: true,
  image: {
    directory: 'public/images/content/articles',
    publicPath: '/images/content/articles/',
  },
}

const isProd = import.meta.env.PROD

export default config({
  storage: isProd
    ? { kind: 'github', repo: 'veritasderman-rgb/marienbad2' }
    : { kind: 'local' },
  ui: {
    brand: { name: 'Marienbad CMS' },
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        status: fields.select({
          label: 'Status',
          options: statusOptions,
          defaultValue: 'published',
          description: 'Only published articles appear on the site.',
        }),
        locale: fields.select({ label: 'Language', options: localeOptions, defaultValue: 'de' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/content/articles',
          publicPath: '/images/content/articles/',
          description: 'Recommended: 1200×630 px, JPG/WebP.',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Healing / Léčba', value: 'healing' },
            { label: 'Springs / Prameny', value: 'springs' },
            { label: 'Activities / Aktivity', value: 'activities' },
            { label: 'Culture / Kultura', value: 'culture' },
            { label: 'Planning / Plánování', value: 'planning' },
            { label: 'Nature / Příroda', value: 'nature' },
            { label: 'Wellness', value: 'wellness' },
            { label: 'Comparison / Srovnání', value: 'comparison' },
            { label: 'Health', value: 'health' },
            { label: 'History / Historie', value: 'history' },
            { label: 'Tip', value: 'tip' },
            { label: 'Food / Gastronomie', value: 'food' },
          ],
          defaultValue: 'health',
        }),
        articleType: fields.select({
          label: 'Article Type',
          options: [
            { label: 'Cluster (1 200–1 800 slov)', value: 'cluster' },
            { label: 'Pillar (2 000–3 000 slov)', value: 'pillar' },
            { label: 'Guide (1 500–2 500 slov)', value: 'guide' },
            { label: 'Comparison (1 500–2 000 slov)', value: 'comparison' },
            { label: 'FAQ (800–1 200 slov)', value: 'faq' },
          ],
          defaultValue: 'cluster',
        }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        date: fields.text({ label: 'Date (ISO)', description: 'e.g. 2025-06-15' }),
        readingTime: fields.text({ label: 'Reading Time', description: 'e.g. 8 min' }),
        primaryKeyword: fields.text({ label: 'Primary Keyword (SEO)' }),
        secondaryKeywords: fields.text({ label: 'Secondary Keywords (SEO)', multiline: true, description: 'Comma-separated' }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true, description: 'Max 155 chars' }),
        body: fields.markdoc({
          label: 'Article Content',
          components: markdocComponents,
          options: markdocBodyOptions,
        }),
      },
    }),

    stories: collection({
      label: 'Stories',
      slugField: 'name',
      path: 'src/content/stories/*',
      format: { contentField: 'body' },
      schema: {
        name: fields.slug({ name: { label: 'Person Name' } }),
        status: fields.select({
          label: 'Status',
          options: statusOptions,
          defaultValue: 'published',
        }),
        locale: fields.select({ label: 'Language', options: localeOptions, defaultValue: 'de' }),
        location: fields.text({ label: 'Location (City, Country)' }),
        visitLabel: fields.text({ label: 'Visit Label (e.g. "12th visit")' }),
        quote: fields.text({ label: 'Pull Quote', multiline: true }),
        portrait: fields.image({
          label: 'Portrait Photo',
          directory: 'public/images/content/stories',
          publicPath: '/images/content/stories/',
          description: 'Recommended: 600×800 px, JPG/WebP.',
        }),
        body: fields.markdoc({
          label: 'Full Story',
          components: markdocComponents,
          options: markdocBodyOptions,
        }),
      },
    }),

    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        locale: fields.select({ label: 'Language', options: localeOptions, defaultValue: 'de' }),
        section: fields.select({
          label: 'Section',
          options: [
            { label: 'Mineral Springs', value: 'mineral-springs' },
            { label: 'Things to Do', value: 'things-to-do' },
            { label: 'Accommodation', value: 'accommodation' },
            { label: 'History', value: 'history' },
            { label: 'Practical Info', value: 'practical-info' },
            { label: 'People', value: 'people' },
            { label: 'Magazine', value: 'magazine' },
          ],
          defaultValue: 'mineral-springs',
        }),
        featuredImage: fields.image({
          label: 'Featured Image',
          directory: 'public/images/content/pages',
          publicPath: '/images/content/pages/',
          description: 'Recommended: 1200×630 px, JPG/WebP.',
        }),
        metaTitle: fields.text({ label: 'Meta Title' }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        body: fields.markdoc({
          label: 'Page Content',
          components: markdocComponents,
          options: markdocBodyOptions,
        }),
      },
    }),
  },
  singletons: {
    homepageDe: makeHomepageSingleton('Homepage (Deutsch)', 'de'),
    homepageEn: makeHomepageSingleton('Homepage (English)', 'en'),
    homepageCs: makeHomepageSingleton('Homepage (Čeština)', 'cs'),
    homepageRu: makeHomepageSingleton('Homepage (Русский)', 'ru'),
  },
})

function makeHomepageSingleton(label: string, locale: string) {
  return singleton({
    label,
    path: `src/content/homepage/${locale}`,
    format: { data: 'json' },
    schema: {
      hero: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        title: fields.text({ label: 'Title', multiline: true }),
        body: fields.text({ label: 'Body', multiline: true }),
        badge: fields.text({ label: 'Badge' }),
        cta1Label: fields.text({ label: 'Primary CTA Label' }),
        cta1Url: fields.text({ label: 'Primary CTA URL' }),
        cta2Label: fields.text({ label: 'Secondary CTA Label' }),
        cta2Url: fields.text({ label: 'Secondary CTA URL' }),
      }, { label: 'Hero' }),
      seasonal: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        title: fields.text({ label: 'Title', multiline: true }),
        body: fields.text({ label: 'Body', multiline: true }),
        cta1Label: fields.text({ label: 'Primary CTA Label' }),
        cta1Url: fields.text({ label: 'Primary CTA URL' }),
        cta2Label: fields.text({ label: 'Secondary CTA Label' }),
        cta2Url: fields.text({ label: 'Secondary CTA URL' }),
      }, { label: 'Seasonal block' }),
      bookingCta: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        title: fields.text({ label: 'Title', multiline: true }),
        body: fields.text({ label: 'Body', multiline: true }),
        primaryCta: fields.text({ label: 'Primary CTA Label' }),
        primaryUrl: fields.text({ label: 'Primary CTA URL' }),
        secondaryCta: fields.text({ label: 'Secondary CTA Label' }),
        secondaryUrl: fields.text({ label: 'Secondary CTA URL' }),
      }, { label: 'Booking CTA' }),
    },
  })
}
