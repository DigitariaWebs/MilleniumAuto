import CarsHero from "../../components/sections/CarsHero";
import Cars from "../../components/sections/Cars";

export const dynamic = "force-dynamic";

export default function CarsPage() {
  return (
    <main>
      <CarsHero />
      <Cars />
    </main>
  );
}


