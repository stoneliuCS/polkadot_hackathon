import { Button, Card, CardBody, NextUIProvider } from "@nextui-org/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grid Game",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <div className="h-screen p-8">
            <Card className="w-full h-full" shadow="lg">
              <CardBody>
                {children}
              </CardBody>
            </Card>
          </div>
        </NextUIProvider>
      </body>
    </html>
  )
}
