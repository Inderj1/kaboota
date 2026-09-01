import React from "react"
import type { Metadata } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/landing/navigation'
import { FooterSection } from '@/components/landing/footer-section'
import './globals.css'

// Kaboota type system: Bricolage Grotesque for display, Hanken Grotesk for body, Space Mono for labels.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kaboota — Conversation-to-action intelligence for service businesses',
    template: '%s | Kaboota',
  },
  description:
    'Every conversation should end in the right action. Kaboota turns every call, text and chat into verified structured data, decides the right next move, executes the workflows you approve, and learns from what the job actually earned.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${hanken.variable} ${spaceMono.variable} font-sans antialiased`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[11px] focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navigation />
        <div id="content">{children}</div>
        <FooterSection />
        <Analytics />
      </body>
    </html>
  )
}
