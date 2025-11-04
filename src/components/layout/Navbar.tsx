"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AnimatedButton from "../ui/AnimatedButton";

export default function Navbar() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if admin is logged in
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("/api/admin/verify");
        const data = await response.json();
        setIsAdminLoggedIn(data.authenticated || false);
      } catch (error) {
        setIsAdminLoggedIn(false);
      }
    };

    checkAdminStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAdminLoggedIn(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="bg-gray-50 pt-4">
      <div className="container mx-auto max-w-7xl">
        <nav className="h-28 flex items-center justify-between relative">
          <div className="flex-1 flex items-center">
            <Link href="/" aria-label="Accueil">
              <Image
                src="/Logo.png"
                alt="Millenium Autos"
                width={420}
                height={120}
                className="h-20 md:h-24 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-800 hover:text-gray-600 transition"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <ul
            className={`md:flex items-center gap-8 text-sm tracking-wider uppercase text-gray-800 ${
              isMenuOpen
                ? "flex flex-col space-y-4 p-4 bg-gray-50 absolute top-full left-0 w-full z-50"
                : "hidden"
            } md:relative md:flex-row md:space-y-0 md:p-0 md:bg-transparent md:z-auto`}
          >
            <li>
              <Link
                href="/"
                className="hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                ACCUEIL
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                À PROPOS
              </Link>
            </li>
            <li>
              <Link
                href="/cars"
                className="hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                NOS VÉHICULES
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </li>
            {isMenuOpen && (
              <li className="md:hidden pt-4">
                {isAdminLoggedIn ? (
                  pathname === "/admin/dashboard" ? (
                    <AnimatedButton
                      text="Déconnexion"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      textColor="#dc2626"
                      borderColor="#dc2626"
                      circleColor="#dc2626"
                      arrowColor="#dc2626"
                      hoverTextColor="#ffffff"
                      hoverArrowColor="#ffffff"
                    />
                  ) : (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <AnimatedButton
                        text="Dashboard"
                        textColor="#1f2937"
                        borderColor="#374151"
                        circleColor="#374151"
                        arrowColor="#374151"
                        hoverTextColor="#ffffff"
                        hoverArrowColor="#ffffff"
                      />
                    </Link>
                  )
                ) : (
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <AnimatedButton
                      text="Vendre ma voiture"
                      textColor="#1f2937"
                      borderColor="#374151"
                      circleColor="#374151"
                      arrowColor="#374151"
                      hoverTextColor="#ffffff"
                      hoverArrowColor="#ffffff"
                    />
                  </Link>
                )}
              </li>
            )}
          </ul>
          <div className="hidden md:flex items-center flex-1 justify-end">
            {isAdminLoggedIn ? (
              pathname === "/admin/dashboard" ? (
                <AnimatedButton
                  text="Déconnexion"
                  onClick={handleLogout}
                  textColor="#dc2626"
                  borderColor="#dc2626"
                  circleColor="#dc2626"
                  arrowColor="#dc2626"
                  hoverTextColor="#ffffff"
                  hoverArrowColor="#ffffff"
                />
              ) : (
                <Link href="/admin/dashboard">
                  <AnimatedButton
                    text="Dashboard"
                    textColor="#1f2937"
                    borderColor="#374151"
                    circleColor="#374151"
                    arrowColor="#374151"
                    hoverTextColor="#ffffff"
                    hoverArrowColor="#ffffff"
                  />
                </Link>
              )
            ) : (
              <Link href="/contact">
                <AnimatedButton
                  text="Vendre ma voiture"
                  textColor="#1f2937"
                  borderColor="#374151"
                  circleColor="#374151"
                  arrowColor="#374151"
                  hoverTextColor="#ffffff"
                  hoverArrowColor="#ffffff"
                />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
