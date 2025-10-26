'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Barlow } from 'next/font/google';
import { ChevronLeft, ChevronRight, Check, Upload, X } from 'lucide-react';

const barlow = Barlow({ subsets: ['latin'], weight: ['400','500','600','700','800'] });

const steps = [
  { id: 'personal', title: 'Informations personnelles', description: 'Vos coordonnées' },
  { id: 'vehicle', title: 'Détails du véhicule', description: 'Informations techniques' },
  { id: 'photos', title: 'Photos', description: 'Images du véhicule' },
  { id: 'review', title: 'Confirmation', description: 'Vérification finale' }
];

const ContactForm: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
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
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!personal.firstName.trim()) newErrors.firstName = 'Prénom requis';
      if (!personal.lastName.trim()) newErrors.lastName = 'Nom requis';
      if (!personal.phone.trim()) newErrors.phone = 'Téléphone requis';
      if (!personal.email.trim()) newErrors.email = 'Courriel requis';
      else if (!/\S+@\S+\.\S+/.test(personal.email)) newErrors.email = 'Courriel invalide';
      if (!personal.address.trim()) newErrors.address = 'Adresse requise';
      if (!personal.city.trim()) newErrors.city = 'Ville requise';
      if (!personal.postalCode.trim()) newErrors.postalCode = 'Code postal requis';
    } else if (step === 1) {
      if (!vehicle.make.trim()) newErrors.make = 'Marque requise';
      if (!vehicle.model.trim()) newErrors.model = 'Modèle requis';
      if (!vehicle.year.trim()) newErrors.year = 'Année requise';
      if (!vehicle.mileageKm.trim()) newErrors.mileageKm = 'Kilométrage requis';
      if (vehicle.isAccidented === null) newErrors.isAccidented = 'Veuillez répondre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonal(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAccidented = (value: boolean) => {
    setVehicle(prev => ({ ...prev, isAccidented: value }));
    if (errors.isAccidented) {
      setErrors(prev => ({ ...prev, isAccidented: '' }));
    }
  };

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
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div
        className={`${barlow.className} min-h-screen bg-white flex items-center justify-center px-4`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">
            Demande envoyée !
          </h2>
          <p className="text-gray-600 mb-8">
            Merci pour votre soumission. Notre équipe vous contactera sous 24h
            avec une offre personnalisée.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${barlow.className} pb-14 bg-gray-50`}>
      {/* Header */}
      <header className="pt-20 md:pt-[120px] pb-8 md:pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.12em] text-[11px] text-gray-600"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-2 text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight"
          >
            Vendez votre véhicule
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Remplissez ce formulaire simple et recevez une offre en moins de 24h
          </motion.p>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 mb-12">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index < currentStep
                      ? "bg-black border-black text-white"
                      : index === currentStep
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium ${
                      index <= currentStep ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`text-xs ${
                      index <= currentStep ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-4 -mt-5 ${
                    index < currentStep ? "bg-black" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Informations personnelles
                </h2>
                <p className="text-gray-600">
                  Nous avons besoin de vos coordonnées pour vous contacter
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    name="firstName"
                    value={personal.firstName}
                    onChange={handlePersonalChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Votre prénom"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    name="lastName"
                    value={personal.lastName}
                    onChange={handlePersonalChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Votre nom"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    name="phone"
                    value={personal.phone}
                    onChange={handlePersonalChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="(438) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Courriel *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={personal.email}
                    onChange={handlePersonalChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse *
                  </label>
                  <input
                    name="address"
                    value={personal.address}
                    onChange={handlePersonalChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123 rue Example"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    name="city"
                    value={personal.city}
                    onChange={handlePersonalChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Montréal"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province *
                  </label>
                  <select
                    name="province"
                    value={personal.province}
                    onChange={handlePersonalChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors"
                  >
                    <option value="Québec">Québec</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
                    <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                    <option value="Alberta">Alberta</option>
                    <option value="Colombie-Britannique">
                      Colombie-Britannique
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    name="postalCode"
                    value={personal.postalCode}
                    onChange={handlePersonalChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.postalCode ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="H1A 1A1"
                  />
                  {errors.postalCode && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Détails du véhicule
                </h2>
                <p className="text-gray-600">
                  Renseignez les caractéristiques de votre véhicule
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de série (VIN) - Optionnel
                  </label>
                  <input
                    name="vin"
                    value={vehicle.vin}
                    onChange={handleVehicleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                    placeholder="17 caractères alphanumériques"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marque *
                  </label>
                  <input
                    name="make"
                    value={vehicle.make}
                    onChange={handleVehicleChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.make ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Toyota, Honda, etc."
                  />
                  {errors.make && (
                    <p className="text-red-400 text-sm mt-1">{errors.make}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modèle *
                  </label>
                  <input
                    name="model"
                    value={vehicle.model}
                    onChange={handleVehicleChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.model ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Camry, Civic, etc."
                  />
                  {errors.model && (
                    <p className="text-red-400 text-sm mt-1">{errors.model}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-modèle
                  </label>
                  <input
                    name="submodel"
                    value={vehicle.submodel}
                    onChange={handleVehicleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors"
                    placeholder="LE, EX, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année *
                  </label>
                  <input
                    name="year"
                    value={vehicle.year}
                    onChange={handleVehicleChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.year ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="2020"
                  />
                  {errors.year && (
                    <p className="text-red-400 text-sm mt-1">{errors.year}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kilométrage *
                  </label>
                  <input
                    name="mileageKm"
                    value={vehicle.mileageKm}
                    onChange={handleVehicleChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors ${
                      errors.mileageKm ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="150000"
                  />
                  {errors.mileageKm && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.mileageKm}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Le véhicule est-il accidenté ? *
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAccidented(true)}
                    className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                      vehicle.isAccidented === true
                        ? "bg-white text-black border-white"
                        : "bg-gray-900 text-white border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    Oui
                  </button>
                  <button
                    onClick={() => handleAccidented(false)}
                    className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                      vehicle.isAccidented === false
                        ? "bg-white text-black border-white"
                        : "bg-gray-900 text-white border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    Non
                  </button>
                </div>
                {errors.isAccidented && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.isAccidented}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Photos du véhicule
                </h2>
                <p className="text-gray-600">
                  Ajoutez des photos de votre voiture (jusqu'à 12 images)
                </p>
              </div>

              <div
                onDrop={handleDrop}
                onDragEnter={preventDefaults}
                onDragOver={preventDefaults}
                onDragLeave={preventDefaults}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Glissez-déposez vos photos ici
                </p>
                <p className="text-gray-500 text-sm mb-4">ou</p>
                <label className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                  Sélectionner des fichiers
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 text-sm mt-4">
                  PNG, JPG jusqu'à 10MB chacun
                </p>
              </div>

              {photoPreviews.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Photos sélectionnées ({photoPreviews.length}/12)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {photoPreviews.map((src, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={src}
                          alt={`photo-${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Confirmation
                </h2>
                <p className="text-gray-600">
                  Vérifiez vos informations avant l'envoi
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Informations personnelles
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <span className="text-gray-500">Nom:</span>{" "}
                        {personal.firstName} {personal.lastName}
                      </p>
                      <p>
                        <span className="text-gray-500">Téléphone:</span>{" "}
                        {personal.phone}
                      </p>
                      <p>
                        <span className="text-gray-500">Courriel:</span>{" "}
                        {personal.email}
                      </p>
                      <p>
                        <span className="text-gray-500">Adresse:</span>{" "}
                        {personal.address}, {personal.city}, {personal.province}{" "}
                        {personal.postalCode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Détails du véhicule
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      {vehicle.vin && (
                        <p>
                          <span className="text-gray-500">VIN:</span>{" "}
                          {vehicle.vin}
                        </p>
                      )}
                      <p>
                        <span className="text-gray-500">Véhicule:</span>{" "}
                        {vehicle.year} {vehicle.make} {vehicle.model}{" "}
                        {vehicle.submodel}
                      </p>
                      <p>
                        <span className="text-gray-500">Kilométrage:</span>{" "}
                        {vehicle.mileageKm} km
                      </p>
                      <p>
                        <span className="text-gray-500">Accidenté:</span>{" "}
                        {vehicle.isAccidented ? "Oui" : "Non"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Photos ({photoPreviews.length})
                  </h3>
                  {photoPreviews.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {photoPreviews.slice(0, 4).map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`photo-${idx + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                      {photoPreviews.length > 4 && (
                        <div className="w-full h-20 bg-gray-800 rounded flex items-center justify-center text-gray-400 text-sm">
                          +{photoPreviews.length - 4} autres
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucune photo ajoutée</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-2">
                  Prochaines étapes
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Évaluation de votre véhicule par notre équipe</li>
                  <li>• Réception d'une offre personnalisée sous 24h</li>
                  <li>• Processus de vente simplifié si vous acceptez</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          <div className="text-gray-600 text-sm">
            Étape {currentStep + 1} sur {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer la demande
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="mt-24 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 pt-12">
          <div className="flex flex-col md:flex-row md:justify-between text-center md:text-left">
            <div>
              <h4 className="text-black font-semibold mb-2">Contactez-nous</h4>
              <p className="text-gray-600 text-sm">
                info@milleniumauto.ca
                <br />
                +1 (438) 940-2500
              </p>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-2">Adresse</h4>
              <p className="text-gray-600 text-sm">
                7295 rue Waverly, bureau 403-7
                <br />
                Montréal, QC H2R 0B2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
