import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Page',
    description: 'next.js tutorial day 1',
  }

export default function AboutLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <>
        <nav>About NavBar</nav>
        <main>
            {children}
        </main>
    </>
  )
}
