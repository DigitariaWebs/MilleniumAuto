"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AnimatedButton from "../ui/AnimatedButton";

export default function Navbar() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
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
        <nav className="h-28 flex items-center justify-between">
          <div className="flex-1 flex items-center">
            <Link href="/" aria-label="Accueil">
              <Image
                src="/Logo.png"
                alt="Millenium Auto"
                width={420}
                height={120}
                className="h-20 md:h-24 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <ul className="flex items-center gap-8 text-sm tracking-wider uppercase text-gray-800">
            <li>
              <Link href="/" className="hover:text-gray-600 transition">
                ACCUEIL
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-gray-600 transition">
                À PROPOS
              </Link>
            </li>
            <li>
              <Link href="/cars" className="hover:text-gray-600 transition">
                NOS VÉHICULES
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-600 transition">
                CONTACT
              </Link>
            </li>
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
        {/* Mobile button below nav */}
        <div className="md:hidden flex space-x-4 pb-4 justify-center">
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
              <Link href="/admin/dashboard" className="flex-1 max-w-xs">
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
            <Link href="/contact" className="flex-1 max-w-xs">
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
      </div>
    </div>
  );
}
