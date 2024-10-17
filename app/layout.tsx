import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'lms Interncify',
  description: 'Created and managed by Trixtern Technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <ClerkProvider>
     <html lang="en" className='m-4 '>
      <body className={inter.className}>{children}</body>
    </html>
   </ClerkProvider>
  )
}
