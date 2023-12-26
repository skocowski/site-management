import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css'
import type { Metadata } from 'next'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
export const metadata: Metadata = {
  title: 'Site Management',
  description: 'Manage your site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <head>
    
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
              />

              {children}

       
     </ThemeProvider>
      </body>
    </html>
  )
}



