import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./components/navbar";
import StoreProvider from "./StoreProvider";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Joshua Maduri - Software Developer",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`md:container md:mx-auto ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
            <Navbar/>
            {children}
        </StoreProvider>
        <script src="https://kit.fontawesome.com/84ce35745e.js" crossorigin="anonymous"></script>
      </body>
    </html>
  );
}