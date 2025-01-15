import "./globals.css";
import { Navbar } from "./components/navbar";
import { roboto } from "./lib/fonts/fonts";
import StoreProvider from "./StoreProvider";
import { ThemeToggle } from "./components/themeToggle";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false




export const metadata = {
  title: "Joshua Maduri - Software Developer",
  description: "Generated by create next app",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
        <body>
          <header><Navbar/></header>
          <main>
            <StoreProvider>
              {children}
              <ThemeToggle/>
            </StoreProvider>
          </main>
          <script src="https://kit.fontawesome.com/84ce35745e.js" crossOrigin="anonymous"></script>
        </body>
    </html>
  );
}
