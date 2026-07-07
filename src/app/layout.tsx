import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>

      <GoogleAnalytics gaId="G-44HMMJ18PY" />
    </html>
  );
}