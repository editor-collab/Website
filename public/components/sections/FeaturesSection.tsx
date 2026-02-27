"use client";

import { Icon } from "@iconify/react";

const FEATURES = [
  {
    icon: "solar:bolt-bold",
    accent: "#FE3794",
    title: "Feature Card!",
    description:
      "Information here.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-ink text-white py-24 px-6 lg:px-8 overflow-hidden">


      {/* ── Separator ───────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex flex-col items-center z-10">
        {/* Gradient line */}
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #367AD4 25%, #5FD5EC 50%, #FE3794 75%, transparent 100%)",
          }}
        />
        {/* Glow bloom behind the line */}
        <div
          className="w-3/4 h-12 -mt-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(95,213,236,0.12) 0%, rgba(54,122,212,0.06) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ── Background dot grid ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Ambient palette glow blobs ───────────────────────────────────── */}
      {/* Dragonfruit — top-left */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl z-0"
        style={{ background: "rgba(254,55,148,0.07)" }}
      />
      {/* Azure — center-right */}
      <div
        className="pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full blur-3xl z-0"
        style={{ background: "rgba(54,122,212,0.08)" }}
      />
      {/* Sky Blue — bottom-left */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full blur-3xl z-0"
        style={{ background: "rgba(95,213,236,0.07)" }}
      />
      {/* Soft Peach — bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-16 right-1/3 h-72 w-72 rounded-full blur-3xl z-0"
        style={{ background: "rgba(255,223,164,0.05)" }}
      />
      {/* Cotton Candy — center */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl z-0"
        style={{ background: "rgba(254,163,179,0.04)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">

          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(54,122,212,0.12)",
              border: "1px solid rgba(95,213,236,0.30)",
              color: "#5FD5EC",
            }}
          >
            Features
          </span>

          {/* Title */}
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl max-w-xl leading-tight">
            Everything you need for a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #367AD4, #5FD5EC)",
              }}
            >
              smooth collab
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-md text-base text-zinc-400 leading-7">
            Editor Collab packs all the tools your team needs into one clean,
            fast, and reliable editor.
          </p>
        </div>

        {/* ── Cards grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              className="group relative flex flex-col gap-5 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {/* Icon square */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: `${feat.accent}18`,
                  border: `1px solid ${feat.accent}40`,
                }}
              >
                <Icon
                  icon={feat.icon}
                  className="size-5"
                  style={{ color: feat.accent }}
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white leading-snug">
                  {feat.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Hover glow — accent radial, top-left corner */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${feat.accent}14 0%, transparent 60%)`,
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
