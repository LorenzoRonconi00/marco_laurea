import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auguri Marco 🎓',
  description: 'Un piccolo regalo per un grande traguardo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}