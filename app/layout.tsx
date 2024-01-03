import { ThemeProvider } from '@/components/ThemeProvider'; 

import './globals.css'
import type { Metadata } from 'next'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { Toaster } from '@/components/ui/toaster';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
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
   /*  <html lang="en" suppressHydrationWarning={true}> */
      <html lang="en" >
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
<Toaster />
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
          <MaxWidthWrapper>
            {children}
</MaxWidthWrapper>
             

       
   </ThemeProvider>  
      </body>
    </html>
  )
}



