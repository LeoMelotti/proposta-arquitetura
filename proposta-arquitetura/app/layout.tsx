import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Proposta de Projeto | Studio CM Arquitetura',
  description: 'Proposta comercial para projeto de arquitetura e interiores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
