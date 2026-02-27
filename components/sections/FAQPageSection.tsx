"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionIndicator,
  AccordionPanel,
  AccordionBody,
} from "@heroui/react";
import RichText from "@/components/sections/RichText";
import { slugify } from "@/lib/slugify";

import FAQ_DATA_RAW from "@/data/faq.json";

interface FAQItem {
  question: string;
  answer: string;
  file?: string;
  fileType?: "image" | "video" | "ytLink";
}
interface FAQCategory {
  label: string;
  accent: string;
  icon: string;
  items: FAQItem[];
}

const FAQ_DATA = FAQ_DATA_RAW.categories as FAQCategory[];

export default function FAQPageSection() {
  return (
    <section className="relative py-32 px-6 lg:px-8 overflow-hidden">

      {/* Separator */}
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

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute top-24 -right-32 h-96 w-96 rounded-full blur-3xl opacity-[0.07] z-0"
        style={{ background: "#367AD4" }}
      />
      <div
        className="pointer-events-none absolute bottom-24 -left-32 h-96 w-96 rounded-full blur-3xl opacity-[0.07] z-0"
        style={{ background: "#5FD5EC" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 h-80 w-80 rounded-full blur-3xl opacity-[0.05] z-0"
        style={{ background: "#FE3794" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <Icon
            icon="solar:arrow-left-linear"
            className="size-4 transition-transform group-hover:-translate-x-0.5"
          />
          Back to Home
        </Link>

        <div className="mb-12 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Frequently Asked{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #5FD5EC, #367AD4)",
              }}
            >
              Questions
            </span>
          </h1>
          <p className="text-base text-zinc-400 leading-7 max-w-xl">
            Find answers to the most common questions about Editor Collab.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {FAQ_DATA.map((category) => (
            <div key={category.label} className="flex flex-col gap-4">

              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${category.accent}18`,
                    border: `1px solid ${category.accent}40`,
                  }}
                >
                  <Icon
                    icon={category.icon}
                    className="size-4"
                    style={{ color: category.accent }}
                  />
                </div>
                <h2 className="text-base font-semibold" style={{ color: category.accent }}>
                  {category.label}
                </h2>
              </div>

              <AccordionRoot hideSeparator className="flex flex-col gap-2 p-0">
                {category.items.map((item) => (
                  // Wrapper div carries the id because HeroUI doesn't forward the id prop to the DOM node
                  <div key={item.question} id={slugify(item.question)} className="scroll-mt-24">
                  <AccordionItem
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                    }}
                  >
                    <AccordionHeading>
                      <AccordionTrigger className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-white cursor-pointer">
                        {item.question}
                        <AccordionIndicator className="shrink-0 text-zinc-500" />
                      </AccordionTrigger>
                    </AccordionHeading>
                    <AccordionPanel>
                      <AccordionBody className="px-5 pb-5 pt-0 flex flex-col gap-4">
                        <RichText content={item.answer} />
                        {item.file && item.fileType === "image" && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.file}
                            alt=""
                            className="w-full rounded-xl object-cover"
                            style={{ border: "1px solid var(--card-border)" }}
                          />
                        )}
                        {item.file && item.fileType === "video" && (
                          <video
                            src={item.file}
                            controls
                            preload="none"
                            className="w-full rounded-xl overflow-hidden"
                            style={{ border: "1px solid var(--card-border)" }}
                          />
                        )}
                        {item.file && item.fileType === "ytLink" && (
                          <div className="aspect-video w-full rounded-xl overflow-hidden" style={{ border: "1px solid var(--card-border)" }}>
                            <iframe
                              src={`https://www.youtube-nocookie.com/embed/${new URL(item.file).searchParams.get("v") ?? item.file.split("/").pop()}`}
                              title="FAQ video"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </AccordionBody>
                    </AccordionPanel>
                  </AccordionItem>
                  </div>
                ))}
              </AccordionRoot>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
