# SafetyPlus — How to actually rank on Google

The **code-side SEO is done** (meta, canonical, LocalBusiness + Review structured data,
sitemap.xml, robots.txt, noscript fallback, OG/Twitter). Code cannot make Google rank you —
ranking is earned after the site is live and submitted. Do these, in order:

## 1. Deploy live (mandatory)
- Frontend must be reachable at **https://safetyplusbd.com** (the domain in sitemap/canonical).
- Point the domain DNS to your host (Vercel/Netlify). Confirm `https://safetyplusbd.com/sitemap.xml` opens.

## 2. Google Search Console (biggest lever)
1. Go to https://search.google.com/search-console → **Add property** → Domain → `safetyplusbd.com`.
2. Verify via DNS TXT record (host gives you the record).
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL Inspection** → paste the homepage URL → **Request indexing**. Repeat for /about, /all-products, /contact.

## 3. Google Business Profile (ranks "safetyplus" fastest, local)
- https://business.google.com → create profile: name **Safety Plus Industry**, address
  **Plot No- 68, Mirpara, Demra, Dhaka-1360**, phone **+880 1911643816**, website, category "Fire protection equipment supplier".
- Verify (postcard/phone). This is what surfaces the map + knowledge panel for your brand name.

## 4. Bing + extras
- https://www.bing.com/webmasters → add site → import from GSC → submit sitemap.
- Add the site to a few BD business directories for backlinks.

## 5. Replace placeholder numbers (trust + avoid penalties)
Google can penalize fake review ratings. Update with REAL figures:
- `src/SEO/seo.js` / `src/Home/Home.jsx` → AggregateRating (currently 4.9 / 127).
- `src/Stats/CompanyStats.jsx` → 250 / 60 / 2500 stats.
- `src/Testimonial Slider/TestimonialSlider.jsx` → testimonial quotes.

## Timeline
After deploy + GSC submit: indexing in **days**, ranking for "safetyplus" in **1–3 weeks**
(faster with the Business Profile). Nothing in code shortens this — it's Google's crawl + trust cycle.
