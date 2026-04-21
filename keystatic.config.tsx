import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: process.env.NODE_ENV === 'production' ? 'github' : 'local',
    repo: 'veritasderman-rgb/marienbad2',
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        locale: fields.select({
          label: 'Language',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
            { label: 'Čeština', value: 'cs' },
            { label: 'Русский', value: 'ru' },
          ],
          defaultValue: 'de',
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        coverImage: fields.text({ label: 'Cover image path' }),
        category: fields.text({ label: 'Category' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        date: fields.text({ label: 'Date (YYYY-MM-DD)' }),
        readingTime: fields.integer({ label: 'Reading time (min)' }),
        metaTitle: fields.text({ label: 'Meta title' }),
        metaDescription: fields.text({ label: 'Meta description', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    stories: collection({
      label: 'Stories',
      slugField: 'title',
      path: 'src/content/stories/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        locale: fields.select({
          label: 'Language',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
            { label: 'Čeština', value: 'cs' },
            { label: 'Русский', value: 'ru' },
          ],
          defaultValue: 'de',
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        personName: fields.text({ label: 'Person name' }),
        location: fields.text({ label: 'Location' }),
        visitLabel: fields.text({ label: 'Visit label' }),
        quote: fields.text({ label: 'Pull quote', multiline: true }),
        portrait: fields.text({ label: 'Portrait image path' }),
        content: fields.markdoc({ label: 'Story content' }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        locale: fields.select({
          label: 'Language',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
            { label: 'Čeština', value: 'cs' },
            { label: 'Русский', value: 'ru' },
          ],
          defaultValue: 'de',
        }),
        section: fields.text({ label: 'Section key' }),
        featuredImage: fields.text({ label: 'Featured image path' }),
        metaTitle: fields.text({ label: 'Meta title' }),
        metaDescription: fields.text({ label: 'Meta description', multiline: true }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
})
