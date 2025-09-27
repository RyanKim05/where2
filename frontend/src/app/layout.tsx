import './globals.css'

export const metadata = {
  title: 'Where2',
  description: 'Plan your trips efficiently!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}