import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const siteUrl = (import.meta.env.SITE ?? 'https://marienbad2.vercel.app').replace(/\/$/, '')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Marienbad.com — Stories</title>
    <link>${siteUrl}</link>
    <description>Guest stories from Mariánské Lázně.</description>
    <atom:link href="${siteUrl}/stories-feed.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
