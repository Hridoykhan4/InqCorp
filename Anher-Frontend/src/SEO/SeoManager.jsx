import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  createTitle,
  getAbsoluteUrl,
  SEO_CONFIG,
} from "./seo";

const setMetaTag = (selector, attrs) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      tag.setAttribute(key, value);
    }
  });
};

const setLinkTag = (selector, attrs) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("link");
    document.head.appendChild(tag);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      tag.setAttribute(key, value);
    }
  });
};

export const SeoManager = ({
  title,
  description,
  path,
  image,
  keywords,
  robots = "index, follow",
  type = "website",
  structuredData,
}) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = path || `${location.pathname}${location.search}`;
    const canonicalUrl = getAbsoluteUrl(currentPath);
    const resolvedTitle = createTitle(title);
    const resolvedDescription = description || SEO_CONFIG.defaultDescription;
    const resolvedImage = getAbsoluteUrl(image || SEO_CONFIG.defaultImage);

    document.title = resolvedTitle;

    setMetaTag('meta[name="description"]', {
      name: "description",
      content: resolvedDescription,
    });
    setMetaTag('meta[name="keywords"]', {
      name: "keywords",
      content: keywords || SEO_CONFIG.defaultKeywords,
    });
    setMetaTag('meta[name="robots"]', {
      name: "robots",
      content: robots,
    });
    setMetaTag('meta[name="author"]', {
      name: "author",
      content: SEO_CONFIG.siteName,
    });
    setMetaTag('meta[name="theme-color"]', {
      name: "theme-color",
      content: SEO_CONFIG.themeColor,
    });

    setMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: resolvedTitle,
    });
    setMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: resolvedDescription,
    });
    setMetaTag('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    setMetaTag('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    setMetaTag('meta[property="og:image"]', {
      property: "og:image",
      content: resolvedImage,
    });
    setMetaTag('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SEO_CONFIG.siteName,
    });
    setMetaTag('meta[property="og:locale"]', {
      property: "og:locale",
      content: SEO_CONFIG.locale,
    });

    setMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMetaTag('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: resolvedTitle,
    });
    setMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: resolvedDescription,
    });
    setMetaTag('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: resolvedImage,
    });

    setLinkTag('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    const previousScripts = document.head.querySelectorAll(
      'script[data-seo-structured-data="true"]'
    );
    previousScripts.forEach((script) => script.remove());

    const schemaItems = Array.isArray(structuredData)
      ? structuredData
      : structuredData
        ? [structuredData]
        : [];

    schemaItems.forEach((item) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoStructuredData = "true";
      script.text = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }, [description, image, keywords, location.pathname, location.search, path, robots, structuredData, title, type]);

  return null;
};
