export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="uppercase text-sm font-bold tracking-wider opacity-90">
              Millenium Auto inc
            </h3>
            <p className="mt-3 text-gray-300 text-sm leading-relaxed">
              Achat et revente de véhicules au Québec. Transparence, simplicité
              et service humain.
            </p>
          </div>
          <div>
            <h4 className="uppercase text-sm font-bold tracking-wider opacity-90">
              Coordonnées
            </h4>
            <ul className="mt-3 space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="tel:+14389402500"
                  className="hover:text-white transition"
                >
                  +1 (438) 940‑2500
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@milleniumauto.ca"
                  className="hover:text-white transition"
                >
                  info@milleniumauto.ca
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-sm font-bold tracking-wider opacity-90">
              Adresse
            </h4>
            <p className="mt-3 text-gray-300 text-sm">
              7295 rue Waverly, bureau 403-7
              <br />
              Montréal, QC H2R 0B2
            </p>
          </div>
          <div>
            <h4 className="uppercase text-sm font-bold tracking-wider opacity-90">
              Liens
            </h4>
            <ul className="mt-3 space-y-2 text-gray-300 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/cars" className="hover:text-white transition">
                  Nos véhicules
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-600 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Millenium Auto inc. Tous droits
            réservés.
          </p>
          <p className="text-xs text-gray-400">
            SAAQ partenaire • Service rapide et fiable
          </p>
        </div>
      </div>
    </footer>
  );
}


