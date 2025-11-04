import Image from "next/image";

export default function Collaborators() {
  return (
    <section className="py-12 md:py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wider">
            En collaboration avec
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
            <Image
              src="/Logo.png"
              alt="Millenium Logo"
              width={180}
              height={80}
              className="h-16 md:h-20 w-auto object-contain"
              priority
            />
          </div>
          
          <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
            <Image
              src="/LogoColab.png"
              alt="Office de la protection du consommateur Québec"
              width={280}
              height={100}
              className="h-16 md:h-20 w-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

