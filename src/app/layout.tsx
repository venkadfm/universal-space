import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Universal Space",
    template: "%s | Universal Space",
  },

  description:
    "Universal Space helps busy professionals simplify AI, investing, technology and online business through practical guides and powerful tools.",

  keywords: [
    "Artificial Intelligence",
    "AI Tools",
    "Personal Finance",
    "Investing",
    "Technology",
    "Online Business",
    "Side Hustle",
    "Productivity",
  ],

  authors: [
    {
      name: "Venkadesh",
    },
  ],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
