"use client";

import { useEffect, useRef } from "react";
import React from "react";
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
  icon: React.ReactNode;
}

const stepsData: StepData[] = [
  {
    id: 1,
    step: "01",
    title: "Complétez",
    subtitle: "notre formulaire",
    description:
      "Remplissez notre formulaire en ligne simple et rapide avec les informations de votre véhicule.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    step: "02",
    title: "Recevez",
    subtitle: "notre meilleure offre",
    description:
      "Notre équipe évalue votre véhicule et vous propose la meilleure offre du marché sous 24h.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
    ),
  },
  {
    id: 3,
    step: "03",
    title: "Vendez-nous",
    subtitle: "votre véhicule",
    description:
      "Acceptez l'offre et nous nous occupons de tout. Paiement immédiat et démarches simplifiées.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

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
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate step cards
    const stepCards = stepsContainer.querySelectorAll(".step-card");
    stepCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight"
          >
            Comment ça{" "}
            <span className="relative inline-block">
              fonctionne
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-black opacity-20 rounded-full"></div>
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Vendez votre véhicule en{" "}
            <span className="font-semibold text-black">3 étapes simples</span>{" "}
            et sécurisées
          </p>
        </div>

        {/* Steps Layout */}
        <div ref={stepsContainerRef} className="space-y-0">
          {stepsData.map((step, index) => (
            <div
              key={step.id}
              className={`step-card relative py-8 md:py-12 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* Connecting Line */}
              {index > 1 && index < stepsData.length - 1 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>
              )}

              {/* Step Content */}
              <div className="max-w-7xl mx-auto px-8 md:px-16">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                    index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  {/* Step Number Side */}
                  <div
                    className={`flex justify-center ${
                      index % 2 === 0
                        ? "lg:justify-start lg:order-1"
                        : "lg:justify-end lg:order-2"
                    }`}
                  >
                    <div className="flex items-center">
                      {/* Step number - large and prominent */}
                      <div className="text-8xl md:text-9xl font-bold text-black opacity-10">
                        {step.step}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`text-center ${
                      index % 2 === 0
                        ? "lg:text-left lg:order-2"
                        : "lg:text-left lg:order-1"
                    } space-y-2`}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xl md:text-2xl text-gray-700 font-medium">
                      {step.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Prêt à vendre votre véhicule ?
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Commencez dès maintenant et recevez une offre en moins de 24h
              </p>

              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>Commencer maintenant</span>
                <svg
                  className="w-5 h-5"
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

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Évaluation gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Paiement immédiat</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Processus rapide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


