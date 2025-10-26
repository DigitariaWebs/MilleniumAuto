export default function ContactHero() {
  return (
    <section className="py-16 md:py-20 bg-linear-to-br from-gray-50 to-white min-h-[50vh] flex items-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          

          <h1 className="text-black font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Vendez votre véhicule
            <span className="block text-gray-600 font-semibold text-2xl md:text-4xl lg:text-5xl mt-2">
              en quelques clics
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Obtenez une{" "}
            <span className="font-semibold text-black">
              offre personnalisée
            </span>{" "}
            en moins de 24h. Processus simple, transparent et sécurisé.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#form"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Commencer l'évaluation</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Rapide</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


