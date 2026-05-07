import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inferix",
  description:
    "Privacy-first, offline AI playground — Run, benchmark & compare Small Language Models locally.",
  keywords: [
    "AI",
    "LLM",
    "Ollama",
    "offline AI",
    "benchmark",
    "local AI",
    "SLM",
  ],
  authors: [{ name: "Ashutosh Kumar Rao" }],
  creator: "Ashutosh Kumar Rao",
  openGraph: {
    title: "Inferix",
    description: "Your private AI, running locally.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
