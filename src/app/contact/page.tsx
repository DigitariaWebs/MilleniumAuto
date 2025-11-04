import ContactForm from '../../components/ui/ContactForm';
import ContactHero from '../../components/sections/ContactHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nous Contacter - MILLENNIUM AUTOS',
  description: 'Formulaire de contact pour discuter de votre véhicule avec notre équipe.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <div id="form">
        <ContactForm />
      </div>
    </main>
  );
}
