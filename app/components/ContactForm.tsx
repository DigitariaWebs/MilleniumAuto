'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Barlow } from 'next/font/google';
import { ThumbsUp } from 'lucide-react';

const barlow = Barlow({ subsets: ['latin'], weight: ['400','500','600','700','800'] });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i },
  }),
};

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  index: number;
  thumbVisible?: boolean;
};

const Section: React.FC<SectionProps> = ({ id, title, children, index, thumbVisible = false }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  return (
    <section id={id} ref={ref} className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-[74px] md:mb-[106px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        custom={0}
        className="mb-3 flex items-center"
      >
        <h2 className="text-white font-semibold text-[15px] md:text-[16px]">{title}</h2>
        <motion.span
          initial={{ opacity: 0, scale: 0.6, y: -2 }}
          animate={thumbVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: -2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          className="ml-2 text-white"
          aria-hidden
        >
          <ThumbsUp size={20} />
        </motion.span>
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={1}>
        {children}
      </motion.div>
    </section>
  );
};

interface ChoiceButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ label, active = false, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(255,255,255,0.3)' }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center justify-center px-1 md:px-1 lg:px-1 py-[14px] md:py-4 lg:py-4 rounded-full border text-[15px] md:text-[15px] font-semibold tracking-[0.04em] min-w-[120px] md:min-w-[140px] lg:min-w-[160px] backdrop-blur-sm transition-colors duration-300 ${
      active
        ? 'bg-white text-black border-white'
        : 'bg-transparent text-white border-white/20 hover:bg-white hover:text-black hover:border-white/60'
    }`}
    type="button"
  >
    {label}
  </motion.button>
);

const ContactForm: React.FC = () => {
  const [thumbFor, setThumbFor] = React.useState<string | null>(null);
  const [personal, setPersonal] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: 'Québec',
    postalCode: '',
  });
  const [vehicle, setVehicle] = React.useState({
    vin: '',
    make: '',
    model: '',
    submodel: '',
    year: '',
    mileageKm: '',
    isAccidented: null as null | boolean,
  });
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = React.useState<string[]>([]);

  const smoothScrollTo = (targetY: number, duration = 750) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (elapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = (window.scrollY || window.pageYOffset) + rect.top - 5;
    smoothScrollTo(targetY, 750);
  };

  const showThumbThenScroll = (currentId: string, nextId: string) => {
    setThumbFor(currentId);
    window.setTimeout(() => {
      goTo(nextId);
    }, 450);
    window.setTimeout(() => setThumbFor(null), 1000);
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonal(prev => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handleAccidented = (value: boolean) => {
    setVehicle(prev => ({ ...prev, isAccidented: value }));
  };

  // VIN lookup retiré (VIN optionnel)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) return;
    const next = [...photos, ...files].slice(0, 12);
    setPhotos(next);
    setPhotoPreviews(prev => [
      ...prev,
      ...files.map(f => URL.createObjectURL(f)),
    ].slice(0, 12));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).filter(f => f.type.startsWith('image/')) : [];
    if (files.length === 0) return;
    const next = [...photos, ...files].slice(0, 12);
    setPhotos(next);
    setPhotoPreviews(prev => [
      ...prev,
      ...files.map(f => URL.createObjectURL(f)),
    ].slice(0, 12));
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    // Validation basique
    if (!personal.firstName || !personal.lastName || !personal.phone || !personal.email || !personal.address || !personal.city || !personal.province || !personal.postalCode) {
      alert('Veuillez remplir toutes vos informations personnelles.');
      return;
    }
    if (!vehicle.make || !vehicle.model || !vehicle.year || !vehicle.mileageKm || vehicle.isAccidented === null) {
      alert('Veuillez compléter les informations du véhicule.');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(personal).forEach(([k, v]) => formDataToSend.append(`personal_${k}`, v));
    Object.entries(vehicle).forEach(([k, v]) => formDataToSend.append(`vehicle_${k}`, String(v ?? '')));
    photos.forEach(file => formDataToSend.append('photos', file));

    console.log('Soumission prête (FormData):', {
      personal,
      vehicle,
      photosCount: photos.length,
    });
    // Exemple POST (à brancher sur votre API):
    // await fetch('/api/submit-car', { method: 'POST', body: formDataToSend });

    alert('Merci! Votre soumission a été envoyée.');
  };

  return (
    <div className={`${barlow.className} pb-24 bg-[#1D4760]`}>
      {/* Header */}
      <header className="pt-[140px] md:pt-[180px] pb-8 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="uppercase tracking-[0.12em] text-[11px] text-white">Soumission</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-2 text-[11vw] md:text-[3.75rem] lg:text-[4.5rem] md:leading-[1] leading-[0.95] font-extrabold -tracking-[0.02em] md:whitespace-nowrap"
          >
            Soumettre votre véhicule
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-8 md:mt-10 max-w-[520px] text-white font-medium text-[15px] md:text-[16px]">
            Dites-nous ce que vous souhaitez faire avec votre voiture et envoyez-nous quelques photos. Nous vous recontacterons rapidement avec la suite.
          </motion.p>
        </div>
      </header>

      {/* Vos informations personnelles */}
      <Section id="sec-personnel" index={0} title="Vos informations personnelles" thumbVisible={thumbFor === 'sec-personnel'}>
        <div className="mt-2 space-y-6">
          <p className="text-white font-medium text-[15px] md:text-[16px]">Nous avons besoin de vos informations personnelles pour pouvoir vous contacter pour vous donner votre prix.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Prénom *</label>
              <input name="firstName" value={personal.firstName} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Nom *</label>
              <input name="lastName" value={personal.lastName} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Téléphone *</label>
              <input name="phone" value={personal.phone} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Courriel *</label>
              <input name="email" type="email" value={personal.email} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Adresse *</label>
              <input name="address" value={personal.address} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Ville *</label>
              <input name="city" value={personal.city} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Province *</label>
              <select name="province" value={personal.province} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]">
                <option value="Québec">Québec</option>
                <option value="Ontario">Ontario</option>
                <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
                <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
                <option value="Manitoba">Manitoba</option>
                <option value="Saskatchewan">Saskatchewan</option>
                <option value="Alberta">Alberta</option>
                <option value="Colombie-Britannique">Colombie-Britannique</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Code postal *</label>
              <input name="postalCode" value={personal.postalCode} onChange={handlePersonalChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
          </div>
        </div>
      </Section>

      {/* Informations sur le véhicule */}
      <div className="mt-4 md:mt-6" />
      <Section id="sec-vehicule" index={1} title="Informations sur le véhicule" thumbVisible={thumbFor === 'sec-vehicule'}>
        <div className="mt-2 space-y-6">
          <p className="text-white font-medium text-[15px] md:text-[16px]">Renseignez les informations du véhicule. Le numéro de série (VIN) est optionnel.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <div className="md:col-span-2">
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Numéro de série du véhicule (VIN) — optionnel</label>
              <input name="vin" value={vehicle.vin} onChange={handleVehicleChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Marque *</label>
              <input name="make" value={vehicle.make} onChange={handleVehicleChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Modèle *</label>
              <input name="model" value={vehicle.model} onChange={handleVehicleChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Sous-modèle</label>
              <input name="submodel" value={vehicle.submodel} onChange={handleVehicleChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">Année *</label>
              <input name="year" value={vehicle.year} onChange={handleVehicleChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
            <div>
              <label className="block text-[12px] text-[#9aa1a6] mb-2">KM du véhicule *</label>
              <input name="mileageKm" value={vehicle.mileageKm} onChange={handleVehicleChange} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px]" />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-white font-medium text-[15px] md:text-[16px] mb-3">Le véhicule est-il accidenté ? *</p>
            <div className="flex gap-3">
              <ChoiceButton label="Oui" active={vehicle.isAccidented === true} onClick={() => handleAccidented(true)} />
              <ChoiceButton label="Non" active={vehicle.isAccidented === false} onClick={() => handleAccidented(false)} />
            </div>
          </div>
        </div>
      </Section>

      {/* Photos */}
      <div className="mt-4 md:mt-6" />
      <Section id="sec-photos" index={2} title="Photos du véhicule" thumbVisible={thumbFor === 'sec-photos'}>
        <div className="mt-2 space-y-6">
          <p className="text-white font-medium text-[15px] md:text-[16px]">Ajoutez des photos de votre voiture et des dommages visibles (jusqu'à 12).</p>
          <div 
            onDrop={handleDrop} 
            onDragEnter={preventDefaults} 
            onDragOver={preventDefaults} 
            onDragLeave={preventDefaults}
            className="border border-dashed border-white/30 rounded-2xl p-6 md:p-8 text-center text-white/80 bg-white/5"
          >
            <p className="text-sm md:text-base">Glissez-déposez vos images ici ou</p>
            <div className="mt-3">
              <label className="inline-block px-5 py-2 rounded-full bg-white text-[#131618] font-semibold cursor-pointer">
                Sélectionner des fichiers
                <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
              </label>
            </div>
            {photoPreviews.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photoPreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img src={src} alt={`photo-${idx+1}`} className="w-full h-28 object-cover rounded-lg" />
                    <button 
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs px-2 py-1 rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Envoi */}
      <div className="mt-4 md:mt-6" />
      <Section id="sec-envoi" index={3} title="Envoyer la demande">
        <div className="mt-2">
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="px-10 h-[52px] rounded-full bg-white text-[#131618] font-bold tracking-[0.04em] cursor-pointer"
          >
            ENVOYER
          </motion.button>
        </div>
      </Section>

      {/* Footer-like info rows */}
      <div className="mt-24 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-3 gap-10 py-10 text-sm text-[#b6bdc2]">
          <div>
            <h4 className="uppercase text-white font-bold tracking-[0.06em] text-[12px] mb-4">Vous souhaitez nous jaser?</h4>
            <p>info@treize.pro<br/>438-940-2500</p>
          </div>
          <div>
            <h4 className="uppercase text-white font-bold tracking-[0.06em] text-[12px] mb-4">Sinon, on est vieux jeu, on aime le présentiel.</h4>
            <p>7295 rue Waverly, bureau 403-7<br/>Montréal, QC H2R 0B2</p>
          </div>
          <div>
            <h4 className="uppercase text-white font-bold tracking-[0.06em] text-[12px] mb-4">Et on aime encore plus prendre une bière!</h4>
            <ul className="space-y-1">
              <li>2 jours</li>
              <li>18 heures</li>
              <li>32 minutes</li>
              <li>32 secondes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
