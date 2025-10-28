import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CarsProvider } from "../components/CarsContext";

export const metadata: Metadata = {
  title: "RÉSERVEZ VOTRE VOITURE DE RÊVE",
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} font-sans antialiased`}>
        <CarsProvider>
          <Navbar />
          {children}
          <Footer />
        </CarsProvider>
      </body>
    </html>
  );
}


