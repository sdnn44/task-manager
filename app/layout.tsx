import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar/Sidebar'
import './globals.css'
import ContextProvider from './providers/ContextProvider'
import GlobalStyleProvider from './providers/GlobalStyleProvider'

import { auth, ClerkProvider } from '@clerk/nextjs'
import NextTopLoader from "nextjs-toploader";
import { useGlobalState } from './context/globalContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TASKager',
  description: 'Twórz zadania na każdy dzień',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </head>
        <body className={inter.className}>
          <NextTopLoader 
            height={2}
            color="navy"
            easing='cubic-bezier(0.53, 0.21, 0, 1)'
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              <div className="w-full"> {children} </div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
