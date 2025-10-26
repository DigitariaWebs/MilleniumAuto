import Hero from "./components/Hero";
import BelowHero from "./components/BelowHero";
import Roadmap from "./components/Roadmap";
import Cars from "./components/Cars";

export default function Page() {
  return (
    <main>
      <Hero />
      <Roadmap />
      <Cars />
      <BelowHero />
    </main>
  );
}


