"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepData {
  id: number;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

const stepsData: StepData[] = [
  {
    id: 1,
    step: "01",
    title: "Complétez",
    subtitle: "notre formulaire",
    description:
      "Remplissez notre formulaire en ligne simple et rapide avec les informations de votre véhicule.",
    icon: "📝",
  },
  {
    id: 2,
    step: "02",
    title: "Recevez",
    subtitle: "notre meilleure offre",
    description:
      "Notre équipe évalue votre véhicule et vous propose la meilleure offre du marché sous 24h.",
    icon: "💰",
  },
  {
    id: 3,
    step: "03",
    title: "Vendez-nous",
    subtitle: "votre véhicule",
    description:
      "Acceptez l'offre et nous nous occupons de tout. Paiement immédiat et démarches simplifiées.",
    icon: "🚗",
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const stepsContainer = stepsContainerRef.current;

    if (!section || !title || !stepsContainer) return;

    // Animate title on scroll
    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate steps
    const stepCards = stepsContainer.querySelectorAll(".step-card");
    stepCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Update active step on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    stepCards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gray-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gray-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
          >
            Comment ça <span className="text-gray-600">fonctionne</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-6">
            Vendez votre véhicule en 3 étapes simples
          </p>
        </div>

        {/* Steps Container */}
        <div ref={stepsContainerRef} className="relative">
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            {/* Timeline Line */}
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>

            <div className="grid grid-cols-3 gap-8 relative">
              {stepsData.map((step, index) => (
                <div
                  key={step.id}
                  data-index={index}
                  className="step-card group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transition-all duration-500 ${
                        activeStep >= index
                          ? "bg-black scale-110"
                          : "bg-gray-200"
                      }`}
                    >
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`mt-16 p-8 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm ${
                      activeStep >= index
                        ? "bg-white border-gray-300 shadow-2xl shadow-gray-200/50"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Step Number */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-6xl font-bold transition-colors duration-500 ${
                          activeStep >= index ? "text-black" : "text-gray-400"
                        }`}
                      >
                        {step.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xl text-gray-700 mb-4">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow indicator */}
                    {index < stepsData.length - 1 && (
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden xl:block">
                        <svg
                          className={`w-8 h-8 transition-colors duration-500 ${
                            activeStep > index
                              ? "text-primary"
                              : "text-gray-700"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet: Vertical Timeline */}
          <div className="lg:hidden space-y-8 md:space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-gray-300 to-transparent"></div>

            {stepsData.map((step, index) => (
              <div
                key={step.id}
                data-index={index}
                className="step-card relative pl-20 md:pl-28"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-4 top-0">
                  <div
                    className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transition-all duration-500 ${
                      activeStep >= index ? "bg-black" : "bg-gray-200"
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm ${
                    activeStep >= index
                      ? "bg-white border-gray-300 shadow-2xl shadow-gray-200/50"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {/* Step Number */}
                  <span
                    className={`text-5xl md:text-6xl font-bold block mb-3 transition-colors duration-500 ${
                      activeStep >= index ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {step.step}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 mb-4">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator for mobile */}
                {index < stepsData.length - 1 && (
                  <div className="absolute left-7 md:left-11 -bottom-4 md:-bottom-6">
                    <svg
                      className={`w-8 h-8 transition-colors duration-500 ${
                        activeStep > index ? "text-primary" : "text-gray-700"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 md:mt-24">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:scale-105 group"
          >
            <span>Commencer maintenant</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}


