import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCurrentSession } from "@/actions/auth";
import { SanityLive } from "@/sanity/lib/live";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";
import Cart from "@/components/cart/Cart";
import UmamiScript from "@/components/analytics/UmamiScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KLIK MART - Your Trusted Online Marketplace",
  description: "Shop quality products at unbeatable prices with free shipping and secure checkout at KLIK MART Indonesia.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await getCurrentSession();


  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white min-h-screen flex flex-col`}>
        <Header 
        user={user}
        categorySelector={<HeaderCategorySelector/>} 
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Cart />
        <SanityLive />
        <UmamiScript />
      </body>
    </html>
  );
};

export default RootLayout;