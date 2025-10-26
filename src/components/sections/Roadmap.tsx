"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
  id: string;
  phase: string;
  date: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string; // kept for API compatibility; icons rendered as colored dots
  image: string;
}

const PRIMARY = "#0E2C47"; // site brand

const cardsData: CardData[] = [
  {
    id: "card-1",
    phase: "Étape #01",
    date: "",
    title: "Complétez",
    subtitle: "notre formulaire",
    color: PRIMARY,
    icon: "form",
    image: "/assets/card-1.png",
  },
  {
    id: "card-2",
    phase: "Étape #02",
    date: "",
    title: "Recevez",
    subtitle: "notre meilleure offre",
    color: PRIMARY,
    icon: "offer",
    image: "/assets/card-2.png",
  },
  {
    id: "card-3",
    phase: "Étape #03",
    date: "",
    title: "Vendez‑nous",
    subtitle: "votre véhicule",
    color: PRIMARY,
    icon: "sell",
    image: "/assets/card-3.png",
  },
];

export default function Roadmap() {
  const pinnedSectionRef = useRef<HTMLElement | null>(null);
  const stickyHeaderRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const progressBarContainerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const indicesContainerRef = useRef<HTMLDivElement | null>(null);
  const indicesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pinnedSection = pinnedSectionRef.current;
    const stickyHeader = stickyHeaderRef.current;
    const cards = cardsRef.current;
    const progressBarContainer = progressBarContainerRef.current;
    const progressBar = progressBarRef.current;
    const indicesContainer = indicesContainerRef.current;
    const indices = indicesRef.current;

    if (
      !pinnedSection ||
      !stickyHeader ||
      !cards.length ||
      !progressBarContainer ||
      !progressBar ||
      !indicesContainer ||
      !indices.length
    )
      return;

    let lenisInstance: any | null = null;
    let rafCb: ((t: number) => void) | null = null;

    (async () => {
      try {
        const mod: any = await import("lenis");
        const LenisCtor = mod?.Lenis ?? mod?.default;
        if (LenisCtor) {
          lenisInstance = new LenisCtor();
          lenisInstance.on("scroll", ScrollTrigger.update);
          rafCb = (time: number) => {
            lenisInstance && lenisInstance.raf(time * 1000);
          };
          gsap.ticker.add(rafCb as any);
          gsap.ticker.lagSmoothing(0);
        }
      } catch {}
    })();

    const cardCount = cards.length;
    const pinnedHeight = window.innerHeight * (cardCount + 1) * 0.8; // shorten pin duration by ~20%
    const startPattern = [0, 5, 0, -5];
    const endPattern = [-10, -5, 10, 5];
    const startRotations = Array.from({ length: cardCount }, (_, i) => startPattern[i % startPattern.length]);
    const endRotations = Array.from({ length: cardCount }, (_, i) => endPattern[i % endPattern.length]);
    const progressColors = Array.from({ length: cardCount }, () => PRIMARY);

    cards.forEach((card, index) => {
      gsap.set(card, { rotation: startRotations[index] });
    });

    let isProgressBarVisible = false;
    let currentActiveIndex = -1;

    const animateIndexOpacity = (newIndex: number) => {
      if (newIndex !== currentActiveIndex) {
        indices.forEach((el, i) => {
          gsap.to(el, {
            opacity: i === newIndex ? 1 : 0.25,
            duration: 0.5,
            ease: "power2.out",
          });
        });
        currentActiveIndex = newIndex;
      }
    };

    const showProgressAndIndices = () => {
      gsap.to([progressBarContainer, indicesContainer], {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      isProgressBarVisible = true;
    };

    const hideProgressAndIndices = () => {
      gsap.to([progressBarContainer, indicesContainer], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      isProgressBarVisible = false;
      animateIndexOpacity(-1);
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: pinnedSection,
      start: "top top",
      end: `+=${pinnedHeight}`,
      pin: true,
      pinSpacing: true,
      onLeave: () => {
        hideProgressAndIndices();
      },
      onEnterBack: () => {
        showProgressAndIndices();
      },
      onUpdate: (self) => {
        const progress = self.progress * (cardCount + 1);
        const currentCard = Math.floor(progress);

        if (progress <= 1) {
          gsap.to(stickyHeader, {
            opacity: 1 - progress,
            duration: 0.1,
            ease: "none",
          });
        } else {
          gsap.set(stickyHeader, { opacity: 0 });
        }

        if (progress > 1 && !isProgressBarVisible) {
          showProgressAndIndices();
        } else if (progress <= 1 && isProgressBarVisible) {
          hideProgressAndIndices();
        }

        let progressHeight = 0;
        let colorIndex = -1;
        if (progress > 1) {
          progressHeight = ((progress - 1) / cardCount) * 100;
          colorIndex = Math.min(Math.floor(progress - 1), cardCount - 1);
        }

        gsap.to(progressBar, {
          height: `${progressHeight}%`,
          backgroundColor: progressColors[colorIndex],
          duration: 0.3,
          ease: "power1.out",
        });

        if (isProgressBarVisible) {
          animateIndexOpacity(colorIndex);
        }

        cards.forEach((card, index) => {
          if (index < currentCard) {
            gsap.set(card, {
              top: "50%",
              rotation: endRotations[index],
            });
          } else if (index === currentCard) {
            const cardProgress = progress - currentCard;
            const newTop = gsap.utils.interpolate(150, 50, cardProgress);
            const newRotation = gsap.utils.interpolate(
              startRotations[index],
              endRotations[index],
              cardProgress
            );
            gsap.set(card, {
              top: `${newTop}%`,
              rotation: newRotation,
            });
          } else {
            gsap.set(card, {
              top: "150%",
              rotation: startRotations[index],
            });
          }
        });
      },
    });

    return () => {
      scrollTrigger.kill();
      if (rafCb) gsap.ticker.remove(rafCb as any);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <>
      <section className="pinned" ref={pinnedSectionRef as any}>
        <div className="stickyHeader" ref={stickyHeaderRef}>
          <h1>Comment ça fonctionne</h1>
        </div>

        <div className="progressBar" ref={progressBarContainerRef}>
          <div className="progress" ref={progressBarRef} />
        </div>

        <div className="indices" ref={indicesContainerRef}>
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className="index"
              ref={(el) => {
                if (el) indicesRef.current[index] = el;
              }}
            >
              <p style={{ color: "#ffffff" }}>●</p>
              <p style={{ color: "#ffffff" }}>{card.date}</p>
              <p style={{ color: "#ffffff" }}>{card.title} {card.subtitle}</p>
            </div>
          ))}
        </div>

        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className="card"
            id={card.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            style={{
              border: `2px solid ${card.color}35`,
              backgroundImage: `url(${card.image})`,
            }}
          >
            <div className="cardPhase" style={{ backgroundColor: card.color }}>
              <p>{card.phase}</p>
            </div>
            <div className="cardTitle" style={{ color: card.color }}>
              <p>{card.date ? `Dès ${card.date}` : ""}</p>
              <h1>
                {card.title} <span>{card.subtitle}</span>
              </h1>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}


