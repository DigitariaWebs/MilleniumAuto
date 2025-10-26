import Image from "next/image";

export default function BelowHero() {
  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <h2 className="text-center text-[#0E2C47] font-extrabold uppercase tracking-wide text-2xl md:text-3xl">
          À PROPOS DE MILLENIUM AUTO INC
        </h2>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left column cards */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#0E2C47]">{/* icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0E2C47]">Notre engagement depuis 2013</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Depuis 2013, Millenium Auto inc poursuit l’ambition de devenir le plus grand
                    grossiste de véhicules au Québec. Une équipe dévouée œuvre chaque jour pour offrir
                    une expérience d’achat transparente et satisfaisante, portée par notre passion
                    pour l’automobile et l’excellence.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#0E2C47]">{/* icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0E2C47]">Transparence et sérénité</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Nous privilégions une information claire et complète, des démarches simplifiées et
                    un suivi proactif. Vous gardez le contrôle à chaque étape, sans surprise—uniquement
                    des engagements tenus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center image */}
          <div className="order-first lg:order-none flex justify-center lg:justify-self-center">
            <div className="relative w-full max-w-sm mx-auto transform lg:translate-x-16">
              <Image
                src="/6ebd8914709e0376ab325bf98eb614c452133d54.png"
                alt="Vue du dessus d’une voiture bleue"
                width={600}
                height={900}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right column cards */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#0E2C47]">{/* icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0E2C47]">Satisfaction avant tout</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Votre satisfaction est notre priorité numéro un. Conseils honnêtes, évaluation juste
                    et accompagnement de A à Z : nous mettons tout en œuvre pour que votre transaction
                    soit simple, sécurisée et sans pression.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#0E2C47]">{/* icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0E2C47]">Toujours à la recherche de véhicules</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Nous enrichissons continuellement notre inventaire. Vous souhaitez vendre votre
                    véhicule ? Soumettez une demande en ligne, un membre de notre équipe vous répondra
                    rapidement avec la meilleure offre possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


