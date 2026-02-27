"use client";

import { ReactNode } from "react";
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

/* ─────────────────────────────────────────────
   Link parser
   Handles:  [label](__https://url__)  →  external <a>
             [label](/path)            →  internal <Link>
             [bare text]               →  plain string (cross-reference)
───────────────────────────────────────────── */
function parseLinks(text: string, accent: string): ReactNode[] {
  const LINK_RE =
    /\[([^\]]+)\]\(__([^)]+)__\)|\[([^\]]+)\]\((\/[^)]*)\)|\[([^\]]+)\]/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));

    if (m[1] && m[2]) {
      // [label](__url__)  →  external link
      nodes.push(
        <a
          key={m.index}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80 transition-opacity"
          style={{ color: accent }}
        >
          {m[1]}
        </a>
      );
    } else if (m[3] && m[4]) {
      // [label](/path)  →  internal link
      nodes.push(
        <Link
          key={m.index}
          href={m[4]}
          className="underline underline-offset-2 hover:opacity-80 transition-opacity"
          style={{ color: accent }}
        >
          {m[3]}
        </Link>
      );
    } else if (m[5]) {
      // [text]  →  plain cross-reference, no link
      nodes.push(m[5]);
    }

    last = LINK_RE.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* ─────────────────────────────────────────────
   FAQ data — edit freely
───────────────────────────────────────────── */
interface FAQItem {
  question: string;
  answer: string;
  /** Optional path to an MP4 file shown below the answer, e.g. "/assets/videos/install.mp4" */
  video?: string;
}
interface FAQCategory {
  label: string;
  accent: string;
  icon: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    label: "Payment",
    accent: "#FE3794",
    icon: "solar:card-bold",
    items: [
      {
        question: "Is this a one-time payment or a recurring subscription?",
        answer:
          "Editor Collab hosting is a one-time payment for a level slot you can share any level in. To share another level, just stop sharing your current level, and the slot will be freed.",
      },
      {
        question: "Which payment methods are accepted?",
        answer:
          "Currently, payments from [Stripe](__https://buy.stripe.com/aEUbLb38R2Cw91K9AA__) and [Ko-Fi](__https://ko-fi.com/alk1m123__) are accepted. If you decide to get it using Ko-Fi, please [reach out to us](/contact) so we can provide you with the key.",
      },
      {
        question: "What happens when I buy it?",
        answer:
          "Stripe will automatically provide you with a 16-letter key upon purchase. For Ko-Fi, please reach out so we can provide you with the key.",
      },
      {
        question: "How do I activate hosting after payment?",
        answer:
          "To use the key, open Geometry Dash, press the \"Creator\" button at the center right, and press the \"Create\" button at the top left. Press the \"Editor Collab\" button at the bottom left, and when the button turns colored it means that you are logged into Editor Collab servers. Press the \"Local Levels\" tab, press \"View\" on a local level, and press the \"Edit\" button at the center left. You will see a new button appear at the top right of the screen. Press the \"Share\" button at the top right that has appeared, and it will open a popup you can enter your key in. Enter your key into the box labelled with \"XXXX-XXXX-XXXX-XXXX\", and press the \"Activate\" button. Now you can host your own level!",
      },
      {
        question: "Can I gift a hosting key to someone else?",
        answer:
          "Yes, just give the activation key you have received to anyone you want to give it to.",
      },
      {
        question: "Is there a free trial for hosting?",
        answer:
          "Currently no, but if you join our [Discord Server](__https://discord.gg/GFMnMMkpBq__) and go to the [#share-level channel](__https://discord.com/channels/1210938938286669924/12109403296966942722__) people would be glad to invite you to their own levels for you to try out!",
      },
      {
        question: "Do hosting payments include updates or future versions of the mod?",
        answer:
          "The hosting payment includes every update and future versions of Editor Collab.",
      },
      {
        question: "Can I transfer my hosting access to another account?",
        answer:
          "If you want to transfer your hosting access please [reach out to us](/contact).",
      },
      {
        question: "Can I host on multiple devices?",
        answer:
          "Your hosting access is tied to your Geometry Dash account, so you can host your level anywhere you can as long as you log into your Geometry Dash account.",
      },
      {
        question: "What happens if my payment fails or is declined?",
        answer:
          "Our payment providers may decline some payments, in which case you should try a different payment system.",
      },
      {
        question: "Can I get a refund if I'm not satisfied?",
        answer:
          "We have a 14-day change-of-mind period, with a requirement for a valid reason for anything outside that period. For the full refund policy please see our [Refund Policy](/legal/refund-policy).",
      },
      {
        question: "Is my payment info stored safely?",
        answer:
          "We as Editor Collab only store your mail info safely to send you necessary information about Editor Collab, otherwise we do not store any info about your payment details in our servers, and your name and address are stored safely in our payment providers.",
      },
    ],
  },
  {
    label: "Installation",
    accent: "#5FD5EC",
    icon: "solar:download-bold",
    items: [
      {
        question: "What is Editor Collab?",
        answer:
          "Editor Collab is a live multiplayer editor collaboration tool designed for all kinds of people from casual creators to megacollab hosts. While being one of its kind, Editor Collab provides you with all the functionality you would expect from a multiplayer editor tool. Just press the \"Editor Collab\" button and ask your friend to invite you and collab!",
      },
      {
        question: "What do I need before installing?",
        answer:
          "You need the latest Geometry Dash version and Geode which can be installed [here](__https://geode-sdk.org/__). You also need a Geometry Dash account as Editor Collab uses your Geometry Dash account to synchronize data.",
      },
      {
        question: "Does it work on Windows/MacOS/Linux/Android/iOS?",
        answer:
          "Editor Collab is available on every platform Geode supports, meaning it supports Windows, MacOS, Linux, Android and iOS.",
      },
      {
        question: "Does everyone in the collab need the mod installed?",
        answer:
          "Yes, everyone you want to invite into your Editor Collab level needs to have the mod installed.",
      },
      {
        question: "How do I install Editor Collab using Geode?",
        answer:
          "After installing Geode, open Geometry Dash and press the \"Geode\" button to open the Geode menu. Open the \"Download\" tab and search for \"Editor Collab\", and download the mod named \"Editor Collab\". After confirming the download, you need to restart your game. After the restart, press the \"Creator\" button on the center right of the screen, and press the \"Create\" button at the top left. If you have the Editor Collab button on the bottom left, you have installed it successfully.",
      },
      {
        question: "How do I update the mod?",
        answer:
          "You can update the mod using the Geode menu. Press the \"Geode\" button on the main menu, press on the \"Update\" button with the two circular arrows pointing to each other. After it downloads, you can restart your game, and the mod will be updated.",
      },
      {
        question: "How do I uninstall it safely?",
        answer:
          "You can uninstall the mod using the Geode menu. Press the \"Geode\" button on the main menu, find the mod named \"Editor Collab\" in the installed tab, and press the \"View\" button. In the manage section at the bottom left, there should be an \"Uninstall\" button, which you can press to uninstall the mod.",
      },
    ],
  },
  {
    label: "Hosting & Joining",
    accent: "#367AD4",
    icon: "solar:users-group-rounded-bold",
    items: [
      {
        question: "How do I host a level?",
        answer:
          "If you haven't completed [How do I activate hosting after payment?] yet please do so. Afterwards, when you press the \"Share\" button, you will see a popup where you can share your level. You can press the \"Start Sharing\" button to start sharing your level in Editor Collab servers.",
      },
      {
        question: "How do others join my level?",
        answer:
          "To invite others to your level, first press the \"Share\" button in the editor, where you will see a popup. In there, there is a text box you can type usernames in. Add the Geometry Dash usernames of the people you want to invite and press the \"Add\" button to invite them to the list below. In the list below, you can select the role you want to assign to them (Viewer, Editor, Admin), or remove them from the list if you don't want to share with that account.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function FAQPageSection() {
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
              "radial-gradient(ellipse at center, rgba(95,213,236,0.10) 0%, rgba(54,122,212,0.05) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ── Dot grid ──────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Ambient blobs ─────────────────────────────────────────── */}
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

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Back link */}
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

        {/* Heading */}
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

        {/* Categories */}
        <div className="flex flex-col gap-12">
          {FAQ_DATA.map((category) => (
            <div key={category.label} className="flex flex-col gap-4">

              {/* Category header */}
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

              {/* Accordion */}
              <AccordionRoot hideSeparator className="flex flex-col gap-2 p-0">
                {category.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
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
                      <AccordionBody className="px-5 pb-5 pt-0 text-sm text-zinc-400 leading-relaxed flex flex-col gap-4">
                        <span>{parseLinks(item.answer, category.accent)}</span>
                        {item.video && (
                          <video
                            src={item.video}
                            controls
                            preload="none"
                            className="w-full rounded-xl overflow-hidden"
                            style={{ border: "1px solid var(--card-border)" }}
                          />
                        )}
                      </AccordionBody>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </AccordionRoot>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
