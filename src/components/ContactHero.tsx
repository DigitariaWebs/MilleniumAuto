export default function ContactHero() {
  return (
    <section className="pt-40 md:pt-52 pb-20 md:pb-28 bg-[#1D4760] min-h-[40vh] flex items-center">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-white font-bold uppercase text-3xl md:text-5xl leading-tight">
            Contactez‑nous
          </h1>
          <p className="mt-4 tracking-wide text-white/90 text-sm md:text-base">
            Une question, une estimation, ou vous souhaitez vendre votre voiture?
            Notre équipe vous répond rapidement.
          </p>
          <div className="mt-8">
            <a href="#form" className="inline-flex items-center justify-center h-12 px-8 rounded-full font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20">
              Accéder au formulaire
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


