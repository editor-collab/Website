"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Plans — edit these freely
───────────────────────────────────────────── */
const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "Free",
    priceSub: "No credit card needed",
    description: "Join any hosted level as a viewer or editor.",
    accent: "#5FD5EC",
    featured: false,
    badge: null as string | null,
    cta: {
      label: "Get Started",
      href: "https://geode-sdk.org/mods/alk.editor-collab",
    },
    highlights: [
      "Join hosted levels",
      "Real-time sync across all editors",
      "Works on Windows, MacOS, Android & iOS",
    ],
  },
  {
    id: "host",
    name: "Host",
    price: "$10",
    priceSub: "One-time purchase",
    description:
      "Unlock the ability to host and share your levels with anyone.",
    accent: "#FE3794",
    featured: true,
    badge: "Most Popular" as string | null,
    cta: {
      label: "Purchase",
      href: "https://buy.stripe.com/aEUbLb38R2Cw91K9AA",
    },
    highlights: [
      "Everything in Free",
      "Host unlimited levels (One level at a time per key)",
      "Add people to your collaborations.",
      "Edit user's permissions.",
    ],
  },
];

/* ─────────────────────────────────────────────
   Comparison rows — edit these freely
   true  = green check
   false = muted dash
   string = custom label (displayed as-is)
───────────────────────────────────────────── */
type CmpValue = boolean | string;
type CmpRow =
  | { category: string }
  | { feature: string; free: CmpValue; host: CmpValue };

const COMPARISON: CmpRow[] = [
  { category: "General" },
  { feature: "Download & install the mod",  free: true,  host: true  },
  { feature: "Join hosted levels",          free: true,  host: true  },
  { feature: "Real-time collaboration",     free: true,  host: true  },
  { feature: "All platforms supported",     free: true,  host: true  },
  { category: "Hosting" },
  { feature: "Host levels",                 free: false, host: true  },
  { feature: "Unlimited hosted levels (One level at a time per key)",     free: false, host: true  },
  { feature: "Let others collaborate with you.",                 free: false, host: true  },
  { feature: "Limit permissions to each one of the collaborators.",                 free: false, host: true  },
];

/* ─────────────────────────────────────────────
   Helper — renders a single comparison cell
───────────────────────────────────────────── */
function CmpCell({ value }: { value: CmpValue }) {
  if (typeof value === "string") {
    return <span className="text-sm text-zinc-400">{value}</span>;
  }
  if (value) {
    return (
      <Icon
        icon="solar:check-circle-bold"
        className="size-5 mx-auto"
        style={{ color: "#4ade80" }}
      />
    );
  }
  return <span className="text-zinc-600 text-base leading-none mx-auto block text-center">—</span>;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function PricingSection() {
  return (
    <section className="relative bg-ink text-white pb-32 pt-42 px-6 lg:px-8 overflow-hidden">

      {/* ── Separator ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex flex-col items-center z-10">
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #FE3794 25%, #5FD5EC 50%, #FE3794 75%, transparent 100%)",
          }}
        />
        <div
          className="w-3/4 h-12 -mt-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(254,55,148,0.10) 0%, rgba(95,213,236,0.05) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ── Ambient blobs ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl z-0"
        style={{ background: "rgba(254,55,148,0.07)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-32 h-96 w-96 rounded-full blur-3xl z-0"
        style={{ background: "rgba(54,122,212,0.07)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 right-1/4 h-72 w-72 rounded-full blur-3xl z-0"
        style={{ background: "rgba(95,213,236,0.05)" }}
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

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(254,55,148,0.12)",
              border: "1px solid rgba(254,55,148,0.30)",
              color: "#FE3794",
            }}
          >
            Pricing
          </span>

          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl max-w-xl leading-tight">
            Simple,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #FE3794, #5FD5EC)",
              }}
            >
              transparent
            </span>{" "}
            pricing
          </h2>

          <p className="max-w-md text-base text-zinc-400 leading-7">
            Free to join. Pay once to host. No subscriptions, no hidden fees.
          </p>
        </div>

        {/* ── Plan cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col gap-6 rounded-2xl p-7 backdrop-blur-sm"
              style={{
                background: "var(--card-bg)",
                border: plan.featured
                  ? `1px solid ${plan.accent}50`
                  : "1px solid var(--card-border)",
                boxShadow: plan.featured
                  ? `0 0 48px ${plan.accent}18`
                  : undefined,
              }}
            >
              {/* Featured glow overlay */}
              {plan.featured && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at top right, ${plan.accent}0e 0%, transparent 60%)`,
                  }}
                />
              )}

              {/* Badge */}
              {plan.badge && (
                <span
                  className="self-start inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: `${plan.accent}20`,
                    border: `1px solid ${plan.accent}50`,
                    color: plan.accent,
                  }}
                >
                  <Icon icon="solar:star-bold" className="size-3" />
                  {plan.badge}
                </span>
              )}

              {/* Plan name + price */}
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl font-extrabold tracking-tight"
                    style={{ color: plan.accent }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-zinc-500">{plan.priceSub}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed -mt-2">
                {plan.description}
              </p>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: "var(--card-border)" }}
              />

              {/* Highlights */}
              <ul className="flex flex-col gap-2.5">
                {plan.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="size-4.5 shrink-0 mt-0.5"
                      style={{ color: plan.accent }}
                    />
                    {h}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200"
                style={
                  plan.featured
                    ? {
                        background: `linear-gradient(135deg, ${plan.accent}cc, ${plan.accent}99)`,
                        color: "#fff",
                        boxShadow: `0 4px 20px ${plan.accent}30`,
                      }
                    : {
                        background: "var(--card-bg-hover)",
                        border: "1px solid var(--card-border-hover)",
                        color: "var(--foreground)",
                      }
                }
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>

        {/* ── Comparison table ──────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden backdrop-blur-sm"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          {/* Table header */}
          <div
            className="grid items-center px-6 py-4"
            style={{
              gridTemplateColumns: "1fr repeat(2, 9rem)",
              borderBottom: "1px solid var(--card-border)",
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Features
            </span>
            {PLANS.map((plan) => (
              <span
                key={plan.id}
                className="text-center text-sm font-bold"
                style={{ color: plan.accent }}
              >
                {plan.name}
              </span>
            ))}
          </div>

          {/* Rows */}
          {COMPARISON.map((row, i) => {
            if ("category" in row) {
              return (
                <div
                  key={i}
                  className="px-6 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderBottom: "1px solid var(--card-border)",
                  }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    {row.category}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={i}
                className="grid items-center px-6 py-3.5 transition-colors hover:bg-[var(--card-bg-hover)]"
                style={{
                  gridTemplateColumns: "1fr repeat(2, 9rem)",
                  borderBottom:
                    i < COMPARISON.length - 1
                      ? "1px solid var(--card-border)"
                      : undefined,
                }}
              >
                <span className="text-sm text-zinc-400">{row.feature}</span>
                <CmpCell value={row.free} />
                <CmpCell value={row.host} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
