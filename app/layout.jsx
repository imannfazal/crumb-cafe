import localFont from 'next/font/local';
import { Atkinson_Hyperlegible } from 'next/font/google';
import { CartProvider } from '../context/CartContext';
import './globals.css';

const slopes = localFont({
  src: '../public/fonts/Slopes.ttf',
  variable: '--font-hand',
  display: 'swap',
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${slopes.variable} ${atkinson.variable}`}>
      <body className="font-body">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}