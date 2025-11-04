import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CarsProvider } from "../components/context/CarsContext";

export const metadata: Metadata = {
  title: "Millenium autos Inc - Vendez et Achetez des Voitures",
  description:
    "Découvrez Millenium Autos Inc, le plus grand grossiste de véhicules au Québec. Achetez ou vendez votre voiture en quelques clics avec des véhicules inspectés et un processus simplifié.",
  keywords: [
    "voitures",
    "automobiles",
    "achat voiture",
    "vente voiture",
    "Montréal",
    "Québec",
    "véhicules d'occasion",
  ],
  authors: [{ name: "Millenium Autos Inc" }],
  icons: {
    icon: "/Favicon.png",
  },
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


