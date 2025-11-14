import './globals.css'

export const metadata = {
  title: 'STYLEHAUS - Contemporary Fashion',
  description: 'Your destination for contemporary fashion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
