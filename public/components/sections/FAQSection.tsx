import { Code, ChevronDown } from '@gravity-ui/icons';
import { Button } from "@heroui/react";
import Link from "next/link";

const items = [
  {
    content:
      "This is the answer for slot 1 :)",
    icon: <Code />,
    title: "FAQ Slot 1.",
  },
  {
    content:
      "This is the answer for slot 2! :)",
    icon: <Code />,
    title: "FAQ Slot 2.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative bg-ink text-white pb-5 pt-18 overflow-hidden">

      {/* ── Separator ─────────────────────────────────────────────────────── */}
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
              "radial-gradient(ellipse at center, rgba(95,213,236,0.10) 0%, rgba(54,122,212,0.05) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ── Ambient blobs ──────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "#367AD4" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-32 h-96 w-96 rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "#5FD5EC" }}
      />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-3 mb-12 px-6">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(54,122,212,0.12)",
            border: "1px solid rgba(95,213,236,0.28)",
            color: "#5FD5EC",
          }}
        >
          FAQ
        </span>

        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl max-w-xl leading-tight">
          Got{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #367AD4, #5FD5EC)" }}
          >
            questions?
          </span>
        </h2>

         <p className="max-w-md text-base text-zinc-400 leading-7">
            Check our extensive FAQ that includes various solutions to common problems.
          </p>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-3 mb-12 px-6">
        <Link href="/faq">
          <Button variant="outline">
            Go to the FAQ
          </Button>
        </Link>
      </div>

    </section>
  );
}
