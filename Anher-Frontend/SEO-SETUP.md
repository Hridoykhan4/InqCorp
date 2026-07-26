# Inqilab Trading Corporation — How to actually rank on Google

The **code-side SEO is done**: meta tags, canonical URLs, LocalBusiness/Organization/WebSite
structured data (with "Inqilab", "Inqilab Corporation", "Inqilab Trading" as alternate names),
sitemap.xml, robots.txt, and OG/Twitter cards — all now point to the real domain
**https://inqilabtradingcorporation.com.bd**.

Code cannot make Google rank the site — ranking for brand searches ("inqilab", "inqilab
corporation", "inqilab trading") is earned after the site is live, indexed, and trusted. Do
these, in order:

## 1. Deploy live (mandatory)
- Frontend must be reachable at **https://inqilabtradingcorporation.com.bd** (the domain baked
  into sitemap.xml, robots.txt, canonical tags, and JSON-LD).
- Point the domain DNS to your host (Vercel/Netlify/etc). Confirm
  `https://inqilabtradingcorporation.com.bd/sitemap.xml` opens in a browser.
- If the production `VITE_SITE_URL` env var is ever set, it must match this exact domain
  (see `src/SEO/seo.js`) — otherwise canonical URLs will be wrong again.

## 2. Google Search Console (biggest lever for brand-name ranking)
1. Go to https://search.google.com/search-console → **Add property** → Domain →
   `inqilabtradingcorporation.com.bd`.
2. Verify via DNS TXT record (your host/registrar gives you this).
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL Inspection** → paste the homepage URL → **Request indexing**. Repeat for `/about`,
   `/all-products`, `/services`, `/contact`.

## 3. Google Business Profile (this is what makes "inqilab" surface fastest)
- https://business.google.com → create/claim profile: name **Inqilab Trading Corporation**,
  category "Building materials supplier" / "Construction material wholesaler", address
  All Over Bangladesh, phone **+880 1718 427 703**, website `https://inqilabtradingcorporation.com.bd`.
- Verify (postcard or phone). This is what puts the map pack + knowledge panel in front of
  anyone typing "inqilab", "inqilab corporation" or "inqilab trading" — it usually outranks
  organic results for exact-brand queries within days of verification.

## 4. Bing + backlinks
- https://www.bing.com/webmasters → add site → import from Search Console → submit sitemap.
- Get the business listed on a few Bangladeshi business directories (yellow pages, B2B
  marketplaces, chamber of commerce) linking back with the name "Inqilab Trading Corporation" —
  backlinks using the brand name as anchor text are what teach Google the name ↔ site mapping.
- Ask 2-3 partner/client sites to link back if possible.

## 5. Keep structured data honest
`src/Home/Home.jsx` has an `AggregateRating` (4.9 / 87 reviews) with two sample reviews
(Rahim Construction Ltd., Al-Amin Builders). Google can issue a manual action for fabricated
review markup. Replace these with real customer reviews (or remove the `reviewStructuredData`
block entirely) before submitting for indexing.

## Timeline
After deploy + GSC submit: indexing in **days**. Ranking #1 for "inqilab" / "inqilab
corporation" / "inqilab trading" in **1–3 weeks**, faster once the Google Business Profile is
verified — that's the single biggest lever for an exact brand-name query. Nothing in code
shortens this further; it's Google's crawl + trust cycle.
