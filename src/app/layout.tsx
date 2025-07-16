import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata = {
  title: 'Orkestra CRM - Neural Command Center',
  description: 'Orchestrating AI Chaos into CRM Symphony',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-black text-white font-mono min-h-screen">
        {children}
      </body>
    </html>
  )
}
