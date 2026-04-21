import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const siteUrl = (import.meta.env.SITE ?? 'https://marienbad2.vercel.app').replace(/\/$/, '')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Marienbad.com — Magazine</title>
    <link>${siteUrl}</link>
    <description>Editorial guide to Mariánské Lázně by Ensana Health Spa Hotels.</description>
    <language>de</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
