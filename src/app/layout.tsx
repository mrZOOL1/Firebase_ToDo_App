import '../styles/globals.css'
import type { Metadata } from 'next'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import Providers from './providers';
import React from 'react';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'My Todo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
          <Providers>
            <ThemeSwitcher/>
            {children}
            <Toaster />
          </Providers>
        </body>
    </html>
  )
}