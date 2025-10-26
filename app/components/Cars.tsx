import Image from "next/image";

interface CarItem {
  id: string;
  title: string;
  year: number;
  mileageKm: number;
  transmission: string;
  fuel: string;
  priceCad: number;
  image: string;
}

const BRAND_BG = "#1D4760"; // primary background used in hero
const BRAND_TEXT = "#0E2C47"; // brand text color used in sections

const cars: CarItem[] = [
  {
    id: "car-1",
    title: "Véhicule #1",
    year: 2019,
    mileageKm: 78500,
    transmission: "Automatique",
    fuel: "Essence",
    priceCad: 18990,
    image: "/voitures/552141942_1371803977737534_3280235638321807178_n (1).jpg",
  },
  {
    id: "car-2",
    title: "Véhicule #2",
    year: 2018,
    mileageKm: 94500,
    transmission: "Automatique",
    fuel: "Essence",
    priceCad: 14990,
    image: "/voitures/565502243_853021800798627_5730735100028919558_n (1).jpg",
  },
  {
    id: "car-3",
    title: "Véhicule #3",
    year: 2020,
    mileageKm: 60500,
    transmission: "Automatique",
    fuel: "Essence",
    priceCad: 22490,
    image: "/voitures/566348824_1103742945240953_1786329814872051366_n (1).jpg",
  },
  {
    id: "car-4",
    title: "Véhicule #4",
    year: 2017,
    mileageKm: 123400,
    transmission: "Manuelle",
    fuel: "Essence",
    priceCad: 10990,
    image: "/voitures/566511993_1318941909428182_4075510607577896042_n (1).jpg",
  },
  {
    id: "car-5",
    title: "Véhicule #5",
    year: 2021,
    mileageKm: 45500,
    transmission: "Automatique",
    fuel: "Essence",
    priceCad: 25990,
    image: "/voitures/566517227_1765550308170930_6140836955099261023_n (1).jpg",
  },
  {
    id: "car-6",
    title: "Véhicule #6",
    year: 2016,
    mileageKm: 135800,
    transmission: "Automatique",
    fuel: "Essence",
    priceCad: 8990,
    image: "/voitures/566641607_2206352529849043_3133478359230235746_n (1).jpg",
  },
];

function formatKm(value: number) {
  return new Intl.NumberFormat("fr-CA").format(value) + " km";
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);
}

export default function Cars() {
  return (
    <section id="cars" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide" style={{ color: BRAND_TEXT }}>
            Nos véhicules
          </h2>
          <a
            href="/contact"
            className="hidden md:inline-flex items-center justify-center h-11 px-6 rounded-full font-semibold text-white"
            style={{ backgroundColor: BRAND_BG }}
          >
            Nous vendre votre véhicule
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cars.map((car) => (
            <article key={car.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative w-full h-52 md:h-56">
                <Image
                  src={car.image}
                  alt={car.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: BRAND_BG }}>
                  {formatPrice(car.priceCad)}
                </div>
              </div>

              <div className="p-4 md:p-5">
                <h3 className="text-base md:text-lg font-semibold" style={{ color: BRAND_TEXT }}>
                  {car.title} · {car.year}
                </h3>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div>
                    <dt className="text-gray-500">Kilométrage</dt>
                    <dd className="font-medium text-gray-800">{formatKm(car.mileageKm)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Transmission</dt>
                    <dd className="font-medium text-gray-800">{car.transmission}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Carburant</dt>
                    <dd className="font-medium text-gray-800">{car.fuel}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Prix</dt>
                    <dd className="font-medium text-gray-800">{formatPrice(car.priceCad)}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-10 px-5 rounded-full font-semibold text-white"
                    style={{ backgroundColor: BRAND_BG }}
                  >
                    Demander plus d'infos
                  </a>
                  <a
                    href="tel:+14389402500"
                    className="inline-flex items-center justify-center h-10 px-5 rounded-full border text-[#0E2C47]"
                    style={{ borderColor: BRAND_TEXT }}
                  >
                    Appeler
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


