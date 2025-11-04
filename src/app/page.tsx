import Hero from "../components/sections/Hero";
import Collaborators from "../components/sections/Collaborators";
import BelowHero from "../components/sections/BelowHero";
import Roadmap from "../components/sections/Roadmap";
import Cars from "../components/sections/Cars";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main>
      <Hero />
      <Collaborators />
      <Roadmap />
      <Cars />
      <BelowHero />
    </main>
  );
}


