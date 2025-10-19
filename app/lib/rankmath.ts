// lib/rankmath.ts
//
// Headless SEO helper for Next.js + Rank Math
// - Fetches WP Rank Math "getHead" REST endpoint
// - Parses <title>, meta tags, canonical, Open Graph, Twitter
// - Extracts JSON-LD blocks
// - Builds a Next.js Metadata object for generateMetadata()
// Docs: Rank Math Headless endpoint returns head HTML for a given URL.  ↴
//   /wp-json/rankmath/v1/getHead?url=<absolute permalink>
// Source ref: https://mortezakarimi.ir/wordpress/rank-math-rest-api/  (Persian)  ✅
//
// Usage (App Router):
// export async function generateMetadata({ params }): Promise<Metadata> {
//   const permalink = `${process.env.NEXT_PUBLIC_SITE_ORIGIN}/tin-tuc/${params.slug}`;
//   const { metadata } = await getRankMathMetadata(permalink);
//   return metadata;
// }
//
// In your page component, render JSON-LD (server component OK):
// import Script from 'next/script'
// const { jsonLd } = await getRankMathMetadata(permalink);
// {jsonLd.map((j, i) => (
//   <Script id={`ld-${i}`} key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: j }} />
// ))}
//
// -------------------------------------------------------------

import 'server-only';
import type { Metadata } from 'next';

type FetchOpts = {
  /** Override WP site root, default from env */
  site?: string;
  /** Extra fetch init (headers, etc.) */
  fetchInit?: RequestInit;
};

export type RankMathParse = {
  title?: string;
  description?: string;
  canonical?: string;
  og: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    images: string[];
  };
  twitter: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  robots?: string;
};

export type RankMathResult = {
  /** Raw HTML string returned by Rank Math getHead */
  headHtml: string;
  /** Parsed meta fields */
  parsed: RankMathParse;
  /** Array of JSON-LD strings (raw) */
  jsonLd: string[];
  /** Next Metadata built from the parsed values */
  metadata: Metadata;
};

const ENV_WP =
  process.env.NEXT_PUBLIC_WP_URL ||
  process.env.WORDPRESS_URL ||
  'https://nivexhub.learningchain.vn';

/* -------------------------------------------------------------
 * Core fetcher: call Rank Math getHead endpoint with absolute URL
 * ----------------------------------------------------------- */
export async function getRankMathHead(
  permalink: string,
  opts: FetchOpts = {}
): Promise<string> {
  const site = (opts.site || ENV_WP).replace(/\/+$/, '');
  const abs = permalink; // must be absolute
  const url = `${site}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(abs)}`;

  const res = await fetch(url, {
    // small cache window; adjust as needed
    next: { revalidate: 60 },
    ...opts.fetchInit,
  });

  // Rank Math returns HTML string directly
  const text = await res.text();

  // Sometimes the endpoint returns JSON { head: "<html...>" }
  // Try to detect and unwrap:
  if (looksLikeJson(text)) {
    try {
      const j = JSON.parse(text);
      if (typeof j?.head === 'string') return j.head;
    } catch {
      /* ignore and fallthrough */
    }
  }

  // If 200 OK, assume HTML string; otherwise throw with body snippet
  if (!res.ok) {
    throw new Error(
      `RankMath getHead failed (${res.status}): ${text.slice(0, 200)}`
    );
  }
  return text;
}

/* -------------------------------------------------------------
 * Parsing helpers (regex-based, no DOM dependency)
 * ----------------------------------------------------------- */

// Safe single capture
function matchOne(str: string, re: RegExp): string | undefined {
  const m = re.exec(str);
  return m?.[1]?.trim();
}

// Capture all (e.g., multiple og:image)
function matchAll(str: string, re: RegExp): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(str))) {
    if (m[1]) out.push(m[1].trim());
  }
  return out;
}

function looksLikeJson(s: string) {
  const t = s.trim();
  return (t.startsWith('{') && t.endsWith('}')) || (t.startsWith('[') && t.endsWith(']'));
}

/** Extract <script type="application/ld+json"> blocks as raw strings */
export function extractJsonLd(headHtml: string): string[] {
  // Grabs inner JSON including whitespace (non-greedy)
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  return matchAll(headHtml, re).map((s) => {
    // Optional: compact whitespace
    try {
      const obj = JSON.parse(s);
      return JSON.stringify(obj);
    } catch {
      return s.trim();
    }
  });
}

/** Extract common meta & link tags from the head string */
export function extractMeta(headHtml: string): RankMathParse {
  // <title>...</title>
  const title = matchOne(headHtml, /<title[^>]*>([\s\S]*?)<\/title>/i);

  // <meta name="description" content="...">
  const description = matchOne(
    headHtml,
    /<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );

  // <link rel="canonical" href="...">
  const canonical = matchOne(
    headHtml,
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
  );

  // Robots (optional)
  const robots =
    matchOne(
      headHtml,
      /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i
    ) || undefined;

  // Open Graph
  const ogTitle = matchOne(
    headHtml,
    /<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogDesc = matchOne(
    headHtml,
    /<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogUrl = matchOne(
    headHtml,
    /<meta[^>]+property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogType = matchOne(
    headHtml,
    /<meta[^>]+property=["']og:type["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogImages = [
    ...matchAll(
      headHtml,
      /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/gi
    ),
    ...matchAll(
      headHtml,
      /<meta[^>]+property=["']og:image:url["'][^>]*content=["']([^"']+)["'][^>]*>/gi
    ),
  ];

  // Twitter
  const twCard = matchOne(
    headHtml,
    /<meta[^>]+name=["']twitter:card["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const twTitle = matchOne(
    headHtml,
    /<meta[^>]+name=["']twitter:title["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const twDesc = matchOne(
    headHtml,
    /<meta[^>]+name=["']twitter:description["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const twImage = matchOne(
    headHtml,
    /<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );

  return {
    title,
    description,
    canonical,
    robots,
    og: {
      title: ogTitle,
      description: ogDesc,
      url: ogUrl,
      type: ogType,
      images: Array.from(new Set(ogImages)), // dedupe
    },
    twitter: {
      card: twCard,
      title: twTitle,
      description: twDesc,
      image: twImage,
    },
  };
}

/* -------------------------------------------------------------
 * Build Next.js Metadata from parsed fields
 * ----------------------------------------------------------- */
export function toNextMetadata(
  parsed: RankMathParse,
  opts?: { fallbackUrl?: string }
): Metadata {
  const title = parsed.title || parsed.og.title;
  const description = parsed.description || parsed.og.description || parsed.twitter.description;

  // Prefer canonical, else og:url, else fallback
  const canonical = parsed.canonical || parsed.og.url || opts?.fallbackUrl;

  const images = parsed.og.images?.length
    ? parsed.og.images
    : parsed.twitter.image
    ? [parsed.twitter.image]
    : [];

  // Translate robots
  let robots: Metadata['robots'] | undefined;
  if (parsed.robots) {
    const r = parsed.robots.toLowerCase();
    robots = {
      index: !/noindex/.test(r),
      follow: !/nofollow/.test(r),
      // you can expand advanced rules from r if you want
    };
  }

  const md: Metadata = {
    title: title,
    description: description,
    alternates: canonical ? { canonical } : undefined,
    robots,
    openGraph: {
      title: parsed.og.title || title,
      description: parsed.og.description || description,
      url: canonical || parsed.og.url,
      type: parsed.og.type as 'article' | 'website' | 'video.other' | undefined as 'article',
      images,
    },
    twitter: {
      card: (parsed.twitter.card as any) || 'summary_large_image',
      title: parsed.twitter.title || title,
      description: parsed.twitter.description || description,
      images: images.length ? images : undefined,
    },
  };

  return md;
}

/* -------------------------------------------------------------
 * High-level convenience: fetch → parse → build Metadata
 * ----------------------------------------------------------- */
export async function getRankMathMetadata(
  permalink: string,
  opts?: FetchOpts & { fallbackUrl?: string }
): Promise<RankMathResult> {
  let headHtml = '';
  try {
    headHtml = await getRankMathHead(permalink, opts);
  } catch (e) {
    // If endpoint disabled or unavailable, return minimal Metadata as fallback
    const minimal: RankMathResult = {
      headHtml: '',
      parsed: {
        og: { images: [] },
        twitter: {},
      },
      jsonLd: [],
      metadata: {
        title: undefined,
        description: undefined,
        alternates: opts?.fallbackUrl ? { canonical: opts.fallbackUrl } : undefined,
      },
    };
    return minimal;
  }

  const parsed = extractMeta(headHtml);
  const jsonLd = extractJsonLd(headHtml);
  const metadata = toNextMetadata(parsed, { fallbackUrl: opts?.fallbackUrl });

  return { headHtml, parsed, jsonLd, metadata };
}

/* -------------------------------------------------------------
 * Tiny helpers you may reuse
 * ----------------------------------------------------------- */

/** Ensure an input path becomes an absolute permalink using site origin */
export function toPermalink(pathOrUrl: string, siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN): string {
  if (!pathOrUrl) return '';
  try {
    // absolute already
    new URL(pathOrUrl);
    return pathOrUrl;
  } catch {
    const base = (siteOrigin || '').replace(/\/+$/, '');
    const rel = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${base}${rel}`;
  }
}
