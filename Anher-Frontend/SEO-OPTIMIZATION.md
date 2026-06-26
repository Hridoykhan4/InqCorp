# SEO Optimization Notes

This file documents the SEO-related work completed for the Liberty HVAC frontend.

## What Was Added

### 1. Default SEO tags in HTML

Updated [index.html](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/index.html) with:

- `meta description`
- `meta keywords`
- `meta robots`
- `meta author`
- `meta theme-color`
- Open Graph tags
- Twitter card tags
- canonical URL
- manifest link
- favicon and apple touch icon

### 2. Reusable React SEO system

Created:

- [seo.js](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/SEO/seo.js)
- [SeoManager.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/SEO/SeoManager.jsx)

These files handle:

- dynamic page titles add
- dynamic descriptions
- canonical URLs
- Open Graph updates
- Twitter meta updates
- JSON-LD structured data injection
- centralized SEO config like site URL, brand name, contact info

### 3. Structured data

Added schema support for:

- `LocalBusiness`
- `WebSite`
- page-level schema where needed
- product schema for product detail pages
- contact page schema

Site-level structured data is injected from:

- [Root.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Root/Root.jsx)

### 4. Page-specific SEO

Added page-level metadata to these pages:

- [Home.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Home/Home.jsx)
- [About.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/About/About.jsx)
- [ServicePage.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Service%20Page/ServicePage.jsx)
- [ContactSection.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Contact%20Section/ContactSection.jsx)
- [Catelogue.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Catelog/Catelogue.jsx)
- [Projects.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Projects/Projects.jsx)
- [AllProducts.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Product/AllProducts.jsx)
- [Product.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Product/Product.jsx)
- [Category.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Category/Category.jsx)
- [Blog.jsx](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/Blog/Blog.jsx)

### 5. Search engine crawl files

Added:

- [robots.txt](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/public/robots.txt)
- [sitemap.xml](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/public/sitemap.xml)
- [site.webmanifest](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/public/site.webmanifest)

These help search engines discover and understand the site.

## Current SEO Assumption

The SEO setup currently assumes the live website URL is:

`https://www.libertyhvac.us`

This was based on the existing email found in the project:

`info@libertyhvac.us`

## If Domain Changes

If the production domain is different, update these files:

- [seo.js](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/src/SEO/seo.js)
- [index.html](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/index.html)
- [robots.txt](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/public/robots.txt)
- [sitemap.xml](/d:/Abir/Projects/Liberty_HVAC/Liberty-hvac-Frontend/public/sitemap.xml)

## Verification

Build was tested successfully with:

```bash
npm run build
```

## Next Recommended Steps

After deployment:

1. Submit the sitemap in Google Search Console.
2. Verify the final production domain matches the SEO config.
3. Request indexing for important pages like home, services, products, and contact.
4. If needed later, add server-side rendering or prerendering for even stronger SEO.
