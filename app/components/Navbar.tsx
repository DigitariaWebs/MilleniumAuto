import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  return (
    <div className="bg-[#1D4760] pt-4">
      <div className="container mx-auto max-w-7xl px-4">
        <nav className="h-28 flex items-center justify-between">
          <div className="flex-1 flex items-center ml-[-48px] sm:ml-[-80px] md:ml-[-128px] lg:ml-[-192px] xl:ml-[-264px] 2xl:ml-[-344px]">
            <Link href="/" aria-label="Accueil">
              <Image src="/Modern_M_Letter_Logo-removebg-preview.png" alt="Millenium Auto" width={420} height={120} className="h-20 md:h-24 w-auto object-contain" priority />
            </Link>
            <Image src="/SAAQ_logo.svg" alt="SAAQ" width={160} height={48} className="ml-3 md:ml-4 h-8 md:h-10 w-auto object-contain opacity-95" />
          </div>
          <ul className="flex items-center gap-8 text-sm tracking-wider uppercase text-white">
            <li><Link href="/" className="hover:opacity-80 transition">ACCUEIL</Link></li>
            <li><Link href="/#about" className="hover:opacity-80 transition">À PROPOS</Link></li>
            <li><Link href="/cars" className="hover:opacity-80 transition">NOS VÉHICULES</Link></li>
            <li><Link href="/contact" className="hover:opacity-80 transition">CONTACT</Link></li>
          </ul>
          <div className="hidden md:flex items-center flex-1 justify-end md:ml-12 lg:ml-20 mr-[-32px] sm:mr-[-48px] md:mr-[-72px] lg:mr-[-112px] xl:mr-[-160px] 2xl:mr-[-192px]">
            <Link href="/contact">
              <AnimatedButton text="Vendre ma voiture" />
            </Link>
          </div>
        </nav>
        {/* Mobile button below nav */}
        <div className="md:hidden flex space-x-4 pb-4 justify-center">
          <Link href="/contact" className="flex-1 max-w-xs">
            <AnimatedButton text="Vendre ma voiture" />
          </Link>
        </div>
      </div>
    </div>
  );
}


