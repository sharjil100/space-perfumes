import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import ProductsProvider from "./components/ProductsProvider";
import MainLayout from "./components/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Perfumes — A Memory Held in Time",
  description: "Discover luxury fragrances crafted to awaken the senses and carry you through time.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {/* No-flash theme script — runs before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('sp-theme');var L={"--bg":"#e8e8e8","--bg-2":"#dcdcdc","--bg-card":"#d0d0d0","--fg":"#1a1612","--muted":"#5a5450","--accent":"#8a6a3a","--border":"rgba(26,22,18,0.18)"};var D={"--bg":"#0c0b09","--bg-2":"#161410","--bg-card":"#1e1b16","--fg":"#e8e0d4","--muted":"#8a8076","--accent":"#c4a97d","--border":"rgba(196,169,125,0.18)"};var vars=t==='light'?L:D;var r=document.documentElement;for(var k in vars){r.style.setProperty(k,vars[k]);}if(t==='light')r.classList.add('light');}catch(e){}` }} />
        <ThemeProvider>
          <ProductsProvider>
            <MainLayout>{children}</MainLayout>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
