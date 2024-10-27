import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confeti-provider'

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
     <html lang="en" className='m-0 '>
      <body className={inter.className}>
        <ConfettiProvider />
        <ToasterProvider />
        {children}
        </body>
    </html>
   </ClerkProvider>
  )
}
