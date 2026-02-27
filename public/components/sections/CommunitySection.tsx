"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type ShowcaseMedia =
  | { type: "youtube"; id: string }
  | { type: "image"; src: string; alt?: string };

interface Showcase {
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  /** Optional link shown below the description */
  cta?: { label: string; href: string };
  media: ShowcaseMedia;
}

/* ─────────────────────────────────────────────
   Showcase items — edit these freely
   media can be { type: "youtube", id: "VIDEO_ID" }
              or { type: "image",   src: "/path/to/img.png", alt: "..." }
───────────────────────────────────────────── */
const SHOWCASES: Showcase[] = [
  {
    tag: "Player Collab",
    tagColor: "#FE3794",
    title: "Grief Created From Memory With Editor Collab",
    description:
      "TCD, a group consisting of popular Geometry Dash players, has created Grief using Editor Collab entirely from memory. Watch how they utilized real-time collaboration to create this level!",
    cta: { label: "Watch on YouTube", href: "https://youtube.com" },
    media: { type: "youtube", id: "XuRaio-BHK0" },
  },
  {
    tag: "Creator Collab",
    tagColor: "#5FD5EC",
    title: "First Rated Level Using Editor Collab",
    description:
      "Synergize, by Tricipital and 19 other creators, has become the first rated level in Geometry Dash that was created fully with Editor Collab. Watch what they were able to create with real-time collaboration!",
    media: { type: "youtube", id: "26ngwK4Q-dI" },
  },
];

/* ─────────────────────────────────────────────
   Bottom CTA — edit these freely
───────────────────────────────────────────── */
const CTA = {
  title: "Ready to achieve similar results?",
  description:
    "Get Editor Collab and start creating with your friends today. Whether you're a player or a creator, our platform is designed to enhance your collaborative experience.",
  buttons: [
    {
      label: "Get it now",
      href: "/pricing",
      primary: true,
    },
    {
      label: "Join Discord",
      href: "https://discord.gg/GFMnMMkpBq",
      primary: false,
    },
  ],
};

/* ─────────────────────────────────────────────
   Media renderer
───────────────────────────────────────────── */
function ShowcaseMediaBlock({ media, tagColor }: { media: ShowcaseMedia; tagColor: string }) {
  return (
    <div className="relative w-full">
      {/* Accent glow behind the media */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl blur-3xl opacity-15 scale-90 z-0"
        style={{ background: tagColor }}
      />
      <div className="relative z-10 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
        {media.type === "youtube" ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${media.id}`}
              title="Community showcase video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.src}
            alt={media.alt ?? "Community showcase"}
            className="w-full h-full object-cover aspect-video"
          />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function CommunitySection() {
  return (
    <section className="relative bg-ink text-white py-28 px-6 lg:px-8 overflow-hidden">

      {/* ── Separator ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex flex-col items-center z-10">
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #FE3794 25%, #5FD5EC 50%, #367AD4 75%, transparent 100%)",
          }}
        />
        <div
          className="w-3/4 h-12 -mt-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(254,55,148,0.10) 0%, rgba(95,213,236,0.06) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ── Ambient blobs ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-[28rem] w-[28rem] rounded-full blur-3xl z-0"
        style={{ background: "rgba(254,55,148,0.06)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full blur-3xl z-0"
        style={{ background: "rgba(54,122,212,0.07)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-3xl z-0"
        style={{ background: "rgba(95,213,236,0.06)" }}
      />

      {/* ── Dot grid ──────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl pt-16">

        {/* ── Section header ────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(254,55,148,0.12)",
              border: "1px solid rgba(254,55,148,0.30)",
              color: "#FE3794",
            }}
          >
            Community
          </span>

          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl max-w-xl leading-tight">
            Built by the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #FE3794, #5FD5EC)",
              }}
            >
              community
            </span>
          </h2>

          <p className="max-w-md text-base text-zinc-400 leading-7">
            See what creators around the world have built using Editor Collab.
          </p>
        </div>

        {/* ── Showcase rows ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-24">
          {SHOWCASES.map((item, i) => {
            const isEven = i % 2 === 0;

            const textBlock = (
              <div className="flex flex-col gap-5 justify-center">
                {/* Tag */}
                <span
                  className="self-start inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: `${item.tagColor}20`,
                    border: `1px solid ${item.tagColor}50`,
                    color: item.tagColor,
                  }}
                >
                  {item.tag}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white leading-snug lg:text-3xl">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-base text-zinc-400 leading-7">
                  {item.description}
                </p>

                {/* Optional CTA */}
                {item.cta && (
                  <Link
                    href={item.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: item.tagColor }}
                  >
                    {item.cta.label}
                    <Icon
                      icon="solar:arrow-right-linear"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            );

            const mediaBlock = (
              <ShowcaseMediaBlock media={item.media} tagColor={item.tagColor} />
            );

            return (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/*
                  Media is always first in DOM → appears on top on mobile.
                  On desktop: even = media RIGHT (order-2), odd = media LEFT (order-1).
                */}
                <div className={isEven ? "md:order-2" : "md:order-1"}>
                  {mediaBlock}
                </div>
                <div className={isEven ? "md:order-1" : "md:order-2"}>
                  {textBlock}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA block ─────────────────────────────────────────────── */}
        <div className="mt-28">
          <div
            className="relative rounded-2xl p-10 text-center overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: "1px solid transparent",
              backgroundClip: "padding-box",
              boxShadow:
                "0 0 0 1px rgba(254,55,148,0.25), 0 0 60px rgba(254,55,148,0.08)",
            }}
          >
            {/* Inner glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center top, rgba(254,55,148,0.08) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="text-2xl font-bold text-white lg:text-3xl max-w-lg leading-tight">
                {CTA.title}
              </h3>
              <p className="text-base text-zinc-400 max-w-md leading-7">
                {CTA.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {CTA.buttons.map((btn, i) => (
                  <Link
                    key={i}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200"
                    style={
                      btn.primary
                        ? {
                            background:
                              "linear-gradient(135deg, #FE3794cc, #FE379499)",
                            color: "#fff",
                            boxShadow: "0 4px 20px rgba(254,55,148,0.30)",
                          }
                        : {
                            background: "var(--card-bg-hover)",
                            border: "1px solid var(--card-border-hover)",
                            color: "var(--foreground)",
                          }
                    }
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
