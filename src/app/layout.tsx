// import './globals.css'
'use client'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from '@/components/header/HeaderComponent';
import FooterComponent from '@/components/footer/FooterComponent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header><HeaderComponent /> </header>
        <Container style={{ minHeight: `calc(100vh - 120px)` }}>
          {children}
        </Container>
        <footer><FooterComponent /></footer>
        <ToastContainer
          theme='dark'
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  )
}
