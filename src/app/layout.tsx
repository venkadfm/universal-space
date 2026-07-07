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
    default: "Venveel",
    template: "%s | Venveel",
  },

  description:
  "Trusted AI tools, technology reviews, buying guides, and practical insights to help busy professionals make smarter decisions.",
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
