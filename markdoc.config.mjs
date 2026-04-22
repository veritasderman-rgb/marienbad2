import { defineMarkdocConfig } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
  tags: {
    figure: {
      render: 'figure',
      selfClosing: true,
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        caption: { type: String },
        width: { type: String, default: 'default', matches: ['default', 'wide', 'full'] },
      },
    },
    gallery: {
      render: 'gallery',
      attributes: {
        columns: { type: Number, default: 2, matches: [2, 3] },
        layout: { type: String, default: 'grid', matches: ['grid', 'scroll'] },
        caption: { type: String },
      },
    },
    'gallery-image': {
      render: 'gallery-image',
      selfClosing: true,
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
      },
    },
    pullquote: {
      render: 'pullquote',
      selfClosing: true,
      attributes: {
        text: { type: String, required: true },
        cite: { type: String },
      },
    },
    'treatment-box': {
      render: 'treatment-box',
      selfClosing: true,
      attributes: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: 'water', matches: ['water', 'earth', 'gas', 'climate'] },
      },
    },
    'hotel-box': {
      render: 'hotel-box',
      selfClosing: true,
      attributes: {
        name: { type: String, required: true },
        stars: { type: Number, required: true },
        badge: { type: String },
        description: { type: String, required: true },
        bookingUrl: { type: String, required: true },
        bookingLabel: { type: String, required: true },
      },
    },
  },
})
