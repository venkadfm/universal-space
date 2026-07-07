import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Venveel",
    template: "%s | Venveel",
  },

  description:
    "Trusted AI tools, technology reviews, buying guides, and practical insights to help busy professionals make smarter decisions.",

  keywords: [
    "Artificial Intelligence",
    "AI Tools",
    "Technology Reviews",
    "Buying Guides",
    "Personal Finance",
    "Investing",
    "Online Business",
    "Productivity",
  ],

  authors: [
    {
      name: "Venkadesh",
    },
  ],

  verification: {
    google: "4Dqsw6ooXaL5lBR4xK0shH6NN1iovaIqoSE30Z5eYR4",
  },

  metadataBase: new URL("https://venveel.com"),

  openGraph: {
    title: "Venveel",
    description:
      "Trusted AI tools, technology reviews, buying guides, and practical insights for busy professionals.",
    url: "https://venveel.com",
    siteName: "Venveel",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Venveel",
    description:
      "Trusted AI tools, technology reviews, buying guides, and practical insights for busy professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Venveel",
    url: "https://venveel.com",
    description:
      "Trusted AI tools, technology reviews, buying guides, and practical insights for busy professionals.",
    publisher: {
      "@type": "Organization",
      name: "Venveel",
      url: "https://venveel.com",
    },
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>

      <GoogleAnalytics gaId="G-44HMMJ18PY" />
    </html>
  );
}
