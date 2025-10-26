import Image from "next/image";
import SocialLinks from "../ui/SocialLinks";

export default function Hero() {
  return (
    <section className="pb-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 relative">
        {/* Social column removed as requested */}

        {/* Content */}
        <div className="mx-auto max-w-5xl">
          <h1 className="text-gray-900 font-bold uppercase text-3xl md:text-5xl xl:text-6xl leading-tight text-center">
            NOUS ACHETONS VOTRE VÉHICULE
          </h1>
          <p className="mt-4 text-center tracking-wide text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
            Notre garantie : un processus simple, rapide, humain et clé en main.
          </p>

          <div className="mt-8 flex justify-center">
            <Image
              src="/test.png"
              alt="Voiture de sport gris bleuté de profil"
              width={1200}
              height={500}
              className="w-full max-w-[1200px] h-auto object-contain"
              priority
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              aria-label="Vendre mon véhicule"
              className="inline-flex items-center justify-center min-w-[200px] h-12 px-8 rounded-full font-semibold tracking-wide bg-gray-900 text-white ring-1 ring-gray-900/20 shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition duration-200 transform hover:-translate-y-0.5 hover:ring-gray-900/30 hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)] active:translate-y-0"
            >
              Vendre mon véhicule
            </a>

            <a
              href="tel:+14389402500"
              aria-label="Appeler un conseiller"
              className="inline-flex items-center justify-center min-w-[200px] h-12 px-8 rounded-full text-gray-700 bg-gray-100 backdrop-blur-sm border border-gray-300 transition duration-200 transform hover:-translate-y-0.5 hover:bg-gray-200 hover:border-gray-400 active:translate-y-0"
            >
              Appeler un conseiller
            </a>
          </div>

          {/* keyframes moved to globals.css to avoid client-only in Server Component */}
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}


