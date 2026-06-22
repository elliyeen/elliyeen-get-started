import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://elliyeen-get-started.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Elliyeen Research — Engineer Higher Revenue",
    template: "%s | Elliyeen Research",
  },

  description:
    "Elliyeen Research helps organizations understand customers, remove friction, and engineer exceptional experiences that increase revenue, profitability, and sustainable growth.",

  keywords: [
    "revenue engineering",
    "customer experience strategy",
    "AI business advisor",
    "growth consulting",
    "CX design",
    "conversion optimization",
    "revenue audit",
    "business growth",
    "Elliyeen Research",
  ],

  authors: [{ name: "Elliyeen Research", url: BASE_URL }],
  creator: "Elliyeen Research",
  publisher: "Elliyeen Research",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Elliyeen Research",
    title: "Elliyeen Research — Engineer Higher Revenue",
    description:
      "AI-powered revenue engineering for growth-focused organizations. We help you understand customers, remove friction, and build experiences that convert.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elliyeen Research — Engineer Higher Revenue",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Elliyeen Research — Engineer Higher Revenue",
    description:
      "AI-powered revenue engineering for growth-focused organizations.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elliyeen Research",
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  sameAs: ["https://www.linkedin.com/in/abbasabdullah/"],
  description:
    "Elliyeen Research is an AI-powered revenue engineering and customer experience consultancy helping organizations engineer higher revenue, profit, and customer satisfaction.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://www.linkedin.com/in/abbasabdullah/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
