// app/admin/layout.tsx
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'VITMUN Admin Panel',
  description: 'Administrative panel for VITMUN delegate management',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}