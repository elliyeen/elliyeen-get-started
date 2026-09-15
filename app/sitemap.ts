import type { MetadataRoute } from "next";
import { articles } from "@/lib/good-profits";
import { sampleGameCard } from "@/lib/sports/esa/sample-game-card";

export const dynamic = "force-static";

const BASE_URL = "https://www.elliyeen.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const goodProfitArticles: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/good-profits/${a.slug}`,
    lastModified: new Date(a.dateISO),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reports`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/case-studies/savannah`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reports/sohalal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/revenue_card/so-halal-soul-food`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/good-profits`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...goodProfitArticles,
    // ESA (Elliyeen Sports Analytics) published game cards. Only games that
    // have reached the PUBLISHED state belong here — see the ESA
    // architecture proposal's publishing state machine.
    {
      url: `${BASE_URL}/sports/nfl/analysis/2026/week-6/denver-broncos-vs-kansas-city-chiefs`,
      lastModified: new Date(sampleGameCard.generatedAtUtc),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/accessibility`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/do-not-sell`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/sitemap-page`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
