import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ogstudios.example"),
  title: {
    default: "OG Studios — Digital Experiences That Inspire",
    template: "%s · OG Studios",
  },
  description:
    "OG Studios is a premium digital agency crafting websites, brands, and digital systems with cinematic craft and engineering precision.",
  keywords: [
    "digital agency",
    "premium websites",
    "web design",
    "brand identity",
    "creative development",
  ],
  openGraph: {
    title: "OG Studios — Digital Experiences That Inspire",
    description:
      "Premium websites, brands, and digital systems engineered with cinematic craft.",
    url: "https://ogstudios.example",
    siteName: "OG Studios",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OG Studios — Digital Experiences That Inspire",
    description:
      "Premium websites, brands, and digital systems engineered with cinematic craft.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#010205",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
