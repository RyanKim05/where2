import './globals.css'

export const metadata = {
  title: 'Travel Recommender',
  description: 'Plan your trips efficiently!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <h1>Travel Recommender</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}