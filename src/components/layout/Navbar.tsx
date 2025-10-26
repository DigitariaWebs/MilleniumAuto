import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "../ui/AnimatedButton";

export default function Navbar() {
  return (
    <div className="bg-[#1D4760] pt-4">
      <div className="container mx-auto max-w-7xl px-4">
        <nav className="h-28 flex items-center justify-between">
          <div className="flex-1 flex items-center -ml-12 sm:-ml-20 md:-ml-32 lg:-ml-48 xl:-ml-66 2xl:-ml-86">
            <Link href="/" aria-label="Accueil">
              <Image
                src="/Modern_M_Letter_Logo-removebg-preview.png"
                alt="Millenium Auto"
                width={420}
                height={120}
                className="h-20 md:h-24 w-auto object-contain"
                priority
              />
            </Link>
            <Image
              src="/SAAQ_logo.svg"
              alt="SAAQ"
              width={160}
              height={48}
              className="ml-3 md:ml-4 h-8 md:h-10 w-auto object-contain opacity-95"
            />
          </div>
          <ul className="flex items-center gap-8 text-sm tracking-wider uppercase text-white">
            <li>
              <Link href="/" className="hover:opacity-80 transition">
                ACCUEIL
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:opacity-80 transition">
                À PROPOS
              </Link>
            </li>
            <li>
              <Link href="/cars" className="hover:opacity-80 transition">
                NOS VÉHICULES
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:opacity-80 transition">
                CONTACT
              </Link>
            </li>
          </ul>
          <div className="hidden md:flex items-center flex-1 justify-end md:ml-12 lg:ml-20 -mr-8 sm:-mr-12 md:-mr-18 lg:-mr-28 xl:-mr-40 2xl:-mr-48">
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


