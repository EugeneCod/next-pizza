export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      DASHBOARD HEADER
      <body>{children}</body>
    </html>
  )
}
