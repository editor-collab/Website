"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

// ─── Configure your reviews here ───────────────────────────────────────────
const REVIEWS = [
  {
    rating: 5,
    name: "alk1m123",
    role: "Lead Developer · Geode",
    pfp: "/users/alk.png",
    message:
      "Message from alk goes here.",
  },
];
// ───────────────────────────────────────────────────────────────────────────

const AVATAR_ACCENTS = [
  "#FE3794",
  "#367AD4",
  "#5FD5EC",
  "#FFDFA4",
  "#FEA3B3",
  "#4ab5e0",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }, (_, i) => (
        <Icon
          key={i}
          icon={i < rating ? "solar:star-bold" : "solar:star-linear"}
          className="size-3.5"
          style={{ color: i < rating ? "#FFDFA4" : "var(--star-empty)" }}
        />
      ))}
      <span className="ml-2 text-xs font-semibold text-zinc-400">
        {rating}/10
      </span>
    </div>
  );
}

function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[0];
  index: number;
}) {
  const accent = AVATAR_ACCENTS[index % AVATAR_ACCENTS.length];
  const initials = getInitials(review.name);

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-6"
      style={{
        border: "1px solid var(--card-border)",
        background: "var(--card-bg)",
      }}
    >
      {/* Avatar + name + role */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold overflow-hidden"
          style={{
            background: `${accent}22`,
            border: `2px solid ${accent}50`,
            color: accent,
          }}
        >
          {review.pfp ? (
            <Image
              src={review.pfp}
              alt={review.name}
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white leading-tight truncate">
            {review.name}
          </span>
          <span className="text-xs text-zinc-500 leading-tight truncate">
            {review.role}
          </span>
        </div>
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Message */}
      <p className="text-sm text-zinc-400 leading-relaxed">{review.message}</p>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="relative bg-ink text-white py-20 overflow-hidden">

      {/* ── Separator ─────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex flex-col items-center z-10">
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #FE3794 25%, #FFDFA4 50%, #FEA3B3 75%, transparent 100%)",
          }}
        />
        <div
          className="w-3/4 h-12 -mt-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(254,55,148,0.10) 0%, rgba(255,223,164,0.05) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ── Ambient blobs ──────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: "#FE3794" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: "#FEA3B3" }}
      />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-3 mb-12 px-6">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(254,55,148,0.10)",
            border: "1px solid rgba(254,163,179,0.28)",
            color: "#FEA3B3",
          }}
        >
          Reviews
        </span>

        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl max-w-xl leading-tight">
          Dont trust?{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #FE3794, #FEA3B3)" }}
          >
            Check the GD Community's Opinion
          </span>
        </h2>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
}
