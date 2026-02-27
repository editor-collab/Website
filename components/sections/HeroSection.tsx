"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@heroui/react";
import { ShoppingBag } from "@gravity-ui/icons"
import BeforePurchaseModal from "@/components/modals/BeforePurchase";
import CollabCursors from "@/components/sections/CollabCursors";
import SLIDES_DATA from "@/data/slides.json";

const DELAY = 5500;

// Set to false to freeze the waves
const ANIMATE_WAVES = true;

const SLIDES = SLIDES_DATA.slides;

function darkenHex(hex: any, amount = 0.2) {
  let col = hex.replace("#", "");

  let r = parseInt(col.substring(0, 2), 16);
  let g = parseInt(col.substring(2, 4), 16);
  let b = parseInt(col.substring(4, 6), 16);

  r = Math.max(0, Math.floor(r * (1 - amount)));
  g = Math.max(0, Math.floor(g * (1 - amount)));
  b = Math.max(0, Math.floor(b * (1 - amount)));

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, DELAY);
  }, []);

  const goTo = useCallback((index: number) => {
    setActive(index);
    startTimer();
  }, [startTimer]);

  const prev = useCallback(() =>
    goTo((active - 1 + SLIDES.length) % SLIDES.length), [active, goTo]);

  const next = useCallback(() =>
    goTo((active + 1) % SLIDES.length), [active, goTo]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  return (
    <div className="hero-bg min-h-screen bg-ink text-white pt-18 flex flex-col justify-center">
      {/* Wave layers — each SVG is 200% wide so the animation loops seamlessly */}
      <div className="wave-bg" aria-hidden="true">
        <div className="wave wave-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2880 320" preserveAspectRatio="none"
            className={ANIMATE_WAVES ? "wave-anim wave-anim-1" : ""}
            style={{ width: "200%", height: "100%", display: "block" }}>
            <path d="M0,0 L1440,0 L1440,220 C1200,300 960,140 720,220 C480,300 240,140 0,220 Z M1440,0 L2880,0 L2880,220 C2640,300 2400,140 2160,220 C1920,300 1680,140 1440,220 Z" className="wave-path-1"/>
          </svg>
        </div>
        <div className="wave wave-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2880 260" preserveAspectRatio="none"
            className={ANIMATE_WAVES ? "wave-anim wave-anim-2" : ""}
            style={{ width: "200%", height: "100%", display: "block" }}>
            <path d="M0,0 L1440,0 L1440,175 C1080,245 720,105 360,175 C180,210 90,145 0,175 Z M1440,0 L2880,0 L2880,175 C2520,245 2160,105 1800,175 C1620,210 1530,145 1440,175 Z" className="wave-path-2"/>
          </svg>
        </div>
        <div className="wave wave-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2880 200" preserveAspectRatio="none"
            className={ANIMATE_WAVES ? "wave-anim wave-anim-3" : ""}
            style={{ width: "200%", height: "100%", display: "block" }}>
            <path d="M0,0 L1440,0 L1440,130 C1200,180 840,80 540,130 C300,170 150,100 0,130 Z M1440,0 L2880,0 L2880,130 C2640,180 2280,80 1980,130 C1740,170 1590,100 1440,130 Z" className="wave-path-3"/>
          </svg>
        </div>
        <div className="wave wave-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2880 140" preserveAspectRatio="none"
            className={ANIMATE_WAVES ? "wave-anim wave-anim-4" : ""}
            style={{ width: "200%", height: "100%", display: "block" }}>
            <path d="M0,0 L1440,0 L1440,90 C1080,130 720,55 360,90 C180,110 90,70 0,90 Z M1440,0 L2880,0 L2880,90 C2520,130 2160,55 1800,90 C1620,110 1530,70 1440,90 Z" className="wave-path-4"/>
          </svg>
        </div>
      </div>

      <CollabCursors />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 flex flex-col items-center">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 w-full">

          <div className="flex flex-1 flex-col items-center gap-8 lg:items-start w-full">
            <h1 className="max-w-lg text-center text-4xl leading-tight font-bold tracking-tight lg:text-left lg:text-5xl lg:leading-[1.15]">
              A{" "}
              <span className="bg-linear-to-r from-dragonfruit to-cotton-candy bg-clip-text text-transparent">
                <span className="font-bold">better</span> way
              </span>{" "}
              to host{" "}
              <span className="bg-linear-to-r from-azure to-sky-blue bg-clip-text text-transparent">
                Geometry Dash
              </span>{" "}
              levels
            </h1>

            <p className="max-w-md text-center text-base leading-7 text-zinc-400 lg:text-left lg:text-lg">
              A real-time team editor built for Geometry Dash Collaborations.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onPress={() => window.open("https://buy.stripe.com/aEUbLb38R2Cw91K9AA", "_blank")}
              >
                <ShoppingBag />
                Get it now.
              </Button>

              <Button
                variant="outline"
                onPress={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                What is Editor Collab?
              </Button>
            </div>
          </div>

          {/* Image carousel */}
          <div className="flex flex-1 flex-col items-center gap-4 w-full max-w-xl">
            <div
              className="hero-slide-card relative w-full overflow-hidden rounded-2xl backdrop-blur-md"
              style={{ aspectRatio: "16/10" }}
            >
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.id}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: i === active ? 1 : 0,
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                >
                  {slide.src ? (
                    <img
                      src={slide.src}
                      alt={slide.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm select-none"
                      style={{ background: `linear-gradient(135deg, ${slide.accent}18 0%, ${slide.accent}08 100%)` }}
                    >
                      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-${slide.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${slide.id})`}/>
                      </svg>
                    </div>
                  )}

                  {/* Bottom gradient for text readability */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to top, rgba(5,5,18,0.88) 0%, rgba(5,5,18,0.3) 55%, transparent 100%)" }}
                  />

                  <div className="absolute top-3 left-3 z-20">
                    <span
                      className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold backdrop-blur-sm"
                      style={{
                        background: `${darkenHex(slide.accent, .85)}80`,
                        border: `1px solid ${slide.accent}60`,
                        color: slide.accent,
                      }}
                    >
                      {slide.label}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4">
                    <p className="text-white/85 text-sm leading-snug">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}

              <button
                onClick={prev}
                aria-label="Previous slide"
                className="slide-nav-btn absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={next}
                aria-label="Next slide"
                className="slide-nav-btn absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === active ? "24px" : "8px",
                    background: i === active ? SLIDES[active].accent : "var(--star-empty)",
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-64 z-30"
        style={{ background: "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--fade-color) 55%, transparent) 50%, var(--fade-color) 100%)" }}
      />
    </div>
  );
}
