"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Contact methods — edit these freely
───────────────────────────────────────────── */
const CONTACTS = [
  {
    icon: "solar:letter-bold",
    accent: "#367AD4",
    label: "Email",
    value: "alk.editorcollab@gmail.com",
    href: "mailto:alk.editorcollab@gmail.com",
  },
  {
    icon: "ic:baseline-discord",
    accent: "#5865F2",
    label: "Discord",
    value: "Join our community",
    href: "https://discord.com/invite/GFMnMMkpBq",
  },
];

/* ─────────────────────────────────────────────
   Social links — edit these freely
───────────────────────────────────────────── */
const SOCIALS = [
  {
    icon: "ic:baseline-discord",
    label: "Discord",
    accent: "#5865F2",
    href: "https://discord.gg/GFMnMMkpBq",
  },
  {
    icon: "fa6-brands:x-twitter",
    label: "X",
    accent: "#e7e9ea",
    href: "https://twitter.com/alk1m123",
  },
  {
    icon: "mdi:github",
    label: "GitHub",
    accent: "#a1a1aa",
    href: "https://github.com/altalk23",
  },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function ContactSection() {
  return (
    <section className="relative py-32 px-6 lg:px-8 overflow-hidden">

      {/* ── Separator ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex flex-col items-center z-10">
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #367AD4 25%, #5FD5EC 50%, #367AD4 75%, transparent 100%)",
          }}
        />
        <div
          className="w-3/4 h-12 -mt-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(54,122,212,0.12) 0%, rgba(95,213,236,0.06) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ── Ambient blobs ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-[0.07] z-0"
        style={{ background: "#5865F2" }}
      />
      <div
        className="pointer-events-none absolute bottom-12 left-4 h-64 w-64 rounded-full blur-3xl opacity-[0.06] z-0"
        style={{ background: "#367AD4" }}
      />

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-2xl">

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-6 group"
        >
          <Icon
            icon="solar:arrow-left-linear"
            className="size-4 transition-transform group-hover:-translate-x-0.5"
          />
          Back to Home
        </Link>

        {/* Title + subtitle */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl mb-3">
            Contact
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed max-w-md">
            We&apos;d love to hear from you. Whether you need support, have
            ideas, or want to share feedback — reach out any time.
          </p>
        </div>

        {/* Contact cards */}
        <div className="flex flex-col gap-4 mb-10">
          {CONTACTS.map((contact, i) => (
            <a
              key={i}
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-5 rounded-2xl p-5 backdrop-blur-sm transition-all duration-200"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--card-bg-hover)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  `${contact.accent}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--card-bg)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--card-border)";
              }}
            >
              {/* Icon */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: `${contact.accent}18`,
                  border: `1px solid ${contact.accent}40`,
                }}
              >
                <Icon
                  icon={contact.icon}
                  className="size-5"
                  style={{ color: contact.accent }}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  {contact.label}
                </span>
                <span className="text-base font-semibold text-white truncate">
                  {contact.value}
                </span>
              </div>

              {/* Arrow — appears on hover */}
              <Icon
                icon="solar:arrow-right-linear"
                className="ml-auto size-4 text-zinc-600 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shrink-0"
                style={{ color: contact.accent }}
              />
            </a>
          ))}
        </div>

        {/* Follow us */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
            Follow us
          </p>
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  color: "#a1a1aa",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "var(--card-bg-hover)";
                  el.style.borderColor = `${s.accent}40`;
                  el.style.color = s.accent;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "var(--card-bg)";
                  el.style.borderColor = "var(--card-border)";
                  el.style.color = "#a1a1aa";
                }}
              >
                <Icon icon={s.icon} className="size-4 shrink-0" />
                {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
