import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Shining Cloud Studio | Architectural Visualization",
  description: "Premium 3D Visualization, Walkthroughs, and Scale Models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans bg-archivi-light text-archivi-dark antialiased selection:bg-[#9F8C75]/30 selection:text-[#111] overflow-x-hidden flex flex-col min-h-screen`}>
        <Navigation />
        <SmoothScrolling>
          <main className="flex-1 w-full relative">
            {children}
          </main>
        </SmoothScrolling>
        <Footer />
      </body>
    </html>
  );
}
