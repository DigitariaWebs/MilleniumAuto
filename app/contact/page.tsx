import ContactForm from '../components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nous Contacter - MILLENNIUM AUTO',
  description: 'Formulaire de contact pour discuter de votre projet avec notre équipe.',
};

export default function ContactPage() {
  return <ContactForm />;
}
