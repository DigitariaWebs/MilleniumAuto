import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "../ui/AnimatedButton";

export default function Navbar() {
  return (
    <div className="bg-white pt-4">
      <div className="container mx-auto max-w-7xl">
        <nav className="h-28 flex items-center justify-between">
          <div className="flex-1 flex items-center">
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
          </div>
          <ul className="flex items-center gap-8 text-sm tracking-wider uppercase text-black">
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
          <div className="hidden md:flex items-center flex-1 justify-end">
            <Link href="/contact">
              <AnimatedButton
                text="Vendre ma voiture"
                textColor="#000000"
                borderColor="#000000"
                circleColor="#000000"
                arrowColor="#000000"
                hoverTextColor="#ffffff"
                hoverArrowColor="#ffffff"
              />
            </Link>
          </div>
        </nav>
        {/* Mobile button below nav */}
        <div className="md:hidden flex space-x-4 pb-4 justify-center">
          <Link href="/contact" className="flex-1 max-w-xs">
            <AnimatedButton
              text="Vendre ma voiture"
              textColor="#000000"
              borderColor="#000000"
              circleColor="#000000"
              arrowColor="#000000"
              hoverTextColor="#ffffff"
              hoverArrowColor="#ffffff"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}


