"use client";

import { Icon } from "@iconify/react";
import { ReactNode, Fragment, useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
export interface InformativeSectionProps {
  /** Main page title, rendered above the card */
  title: string;
  /** Optional "Last updated" date string, e.g. "February 25, 2026" */
  updatedAt?: string;
  /** If provided, renders a back link above the title pointing to this href */
  backHref?: string;
  /** Label for the back button — defaults to "Back" */
  backLabel?: string;
  /**
   * Optional metadata chips shown between the date and the content card.
   * Each chip shows an Iconify icon + a value string.
   * Overridden by the active tab's stats when `tabs` is provided.
   */
  stats?: { icon: string; value: string }[];
  /**
   * When provided, renders toggle buttons between the title area and the content card.
   * Each tab has its own label, content, and optional stats. The first tab is active by default.
   */
  tabs?: { label: string; icon?: string; content: string; stats?: { icon: string; value: string }[] }[];
  /**
   * Content string with lightweight Markdown-like syntax:
   *
   * Block-level (whole line):
   *   # Heading      → <h2> large heading
   *   ## Heading     → <h3> medium sub-heading
   *   ### Heading    → <h4> small sub-heading
   *   ---            → horizontal rule
   *   -> text <-     → centered paragraph (also supports -> # heading <- etc.)
   *   - item         → unordered list item (leading spaces ok; 3+ spaces = nested)
   *   (empty line)   → paragraph break / extra spacing
   *   (any text)     → <p> paragraph
   *
   * Inline (within any text):
   *   **bold**       → bold
   *   *italic*       → italic
   *   `code`         → inline code chip
   */
  content: string;
}

/* ─────────────────────────────────────────────
   Inline parser
   Handles: **bold**, *italic*, `code`
───────────────────────────────────────────── */
function parseInline(text: string): ReactNode[] {
  // Token regex: bold > italic > code (order matters)
  const TOKEN = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN.exec(text)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      // **bold** — recurse so inner tokens (e.g. `code`) also render
      nodes.push(
        <strong key={match.index} className="font-semibold text-white">
          {parseInline(match[2])}
        </strong>
      );
    } else if (match[3] !== undefined) {
      // *italic* — recurse so inner tokens (e.g. `code`) also render
      nodes.push(
        <em key={match.index} className="italic text-zinc-300">
          {parseInline(match[3])}
        </em>
      );
    } else if (match[4] !== undefined) {
      // `code`
      nodes.push(
        <code
          key={match.index}
          className="rounded px-1.5 py-0.5 font-mono"
          style={{
            background: "rgba(161,161,170,0.10)",
            color: "#a1a1aa",
            border: "1px solid rgba(161,161,170,0.18)",
          }}
        >
          {match[4]}
        </code>
      );
    }

    lastIndex = TOKEN.lastIndex;
  }

  // Remaining text after last match
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/* ─────────────────────────────────────────────
   Block renderer
───────────────────────────────────────────── */
function renderBlocks(content: string): ReactNode[] {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];

  // We collect consecutive "plain" lines into a paragraph
  let paragraphBuffer: string[] = [];
  // We collect consecutive list lines into a list buffer: { indent: number; text: string }
  let listBuffer: { indent: number; text: string }[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const paragraphText = paragraphBuffer.join(" ").trim();
    if (paragraphText) {
      blocks.push(
        <p key={key++} className="text-sm text-zinc-400 leading-7">
          {parseInline(paragraphText)}
        </p>
      );
    }
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (listBuffer.length === 0) return;

    // Build nested structure: top-level items (indent < 3) may own sub-items
    type ListItem = { text: string; children: string[] };
    const items: ListItem[] = [];

    for (const { indent, text } of listBuffer) {
      if (indent < 3) {
        items.push({ text, children: [] });
      } else if (items.length > 0) {
        items[items.length - 1].children.push(text);
      }
    }

    blocks.push(
      <ul key={key++} className="my-3 flex flex-col gap-1.5 pl-4 text-sm text-zinc-400 leading-7">
        {items.map((item, i) => (
          <li key={i} className="list-disc list-outside ml-2">
            {parseInline(item.text)}
            {item.children.length > 0 && (
              <ul className="mt-1 flex flex-col gap-1 pl-4">
                {item.children.map((child, j) => (
                  <li key={j} className="list-[circle] list-outside ml-2">
                    {parseInline(child)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // ── h1-level heading
    if (/^# /.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(
        <h2
          key={key++}
          className="text-xl font-bold text-white mt-8 mb-3 first:mt-0"
        >
          {parseInline(line.slice(2))}
        </h2>
      );
      continue;
    }

    // ── h2-level heading
    if (/^## /.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3
          key={key++}
          className="text-lg font-semibold text-white mt-6 mb-2"
        >
          {parseInline(line.slice(3))}
        </h3>
      );
      continue;
    }

    // ── h3-level heading
    if (/^### /.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(
        <h4
          key={key++}
          className="text-base font-semibold text-neutral-300 mt-4 mb-1"
        >
          {parseInline(line.slice(4))}
        </h4>
      );
      continue;
    }

    // ── centered block  ->  [# / ## / ### /] text  <-
    if (/^->\s?.+\s?<-$/.test(line)) {
      flushParagraph();
      flushList();
      const inner = line.replace(/^->\s?/, "").replace(/\s?<-$/, "");
      if (/^### /.test(inner)) {
        blocks.push(
          <h4 key={key++} className="text-base font-semibold text-neutral-300 mt-4 mb-1 text-center">
            {parseInline(inner.slice(4))}
          </h4>
        );
      } else if (/^## /.test(inner)) {
        blocks.push(
          <h3 key={key++} className="text-lg font-semibold text-white mt-6 mb-2 text-center">
            {parseInline(inner.slice(3))}
          </h3>
        );
      } else if (/^# /.test(inner)) {
        blocks.push(
          <h2 key={key++} className="text-xl font-bold text-white mt-8 mb-3 first:mt-0 text-center">
            {parseInline(inner.slice(2))}
          </h2>
        );
      } else {
        blocks.push(
          <p key={key++} className="text-sm text-zinc-400 leading-7 text-center">
            {parseInline(inner)}
          </p>
        );
      }
      continue;
    }

    // ── horizontal rule
    if (line === "---") {
      flushParagraph();
      flushList();
      blocks.push(
        <hr
          key={key++}
          className="my-6 border-t"
          style={{ borderColor: "var(--card-border)" }}
        />
      );
      continue;
    }

    // ── list item (leading spaces optional, then "- ")
    const listMatch = line.match(/^(\s*)-\s(.*)$/);
    if (listMatch) {
      flushParagraph();
      listBuffer.push({ indent: listMatch[1].length, text: listMatch[2] });
      continue;
    }

    // ── empty line → flush current paragraph and list
    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    // ── plain text → accumulate into paragraph
    paragraphBuffer.push(line);
  }

  // Flush any remaining paragraph or list
  flushParagraph();
  flushList();

  return blocks;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function InformativeSection({
  title,
  updatedAt,
  content,
  backHref,
  backLabel = "Back",
  stats,
  tabs,
}: InformativeSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  // When tabs are provided, override content and stats with the active tab's values
  const activeContent = tabs ? tabs[activeTab]?.content ?? content : content;
  const activeStats   = tabs ? tabs[activeTab]?.stats  ?? stats  : stats;

  return (
    <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* ── Separator at the top ── */}
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

      {/* ── Ambient blobs ── */}
      <div
        className="pointer-events-none absolute top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-[0.07] z-0"
        style={{ background: "#367AD4" }}
      />
      <div
        className="pointer-events-none absolute bottom-12 left-4 h-64 w-64 rounded-full blur-3xl opacity-[0.06] z-0"
        style={{ background: "#FE3794" }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Back button */}
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-6 group"
          >
            <Icon
              icon="solar:arrow-left-linear"
              className="size-4 transition-transform group-hover:-translate-x-0.5"
            />
            {backLabel}
          </Link>
        )}

        {/* Page title + date + stats */}
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
            {title}
          </h1>
          {(updatedAt || activeStats) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {updatedAt && (
                <p className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Icon icon="solar:calendar-minimalistic-linear" className="size-4 shrink-0" />
                  Last updated: {updatedAt}
                </p>
              )}
              {activeStats && activeStats.map((s, i) => (
                <p key={i} className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Icon icon={s.icon} className="size-4 shrink-0" />
                  {s.value}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Tab switcher */}
        {tabs && tabs.length > 1 && (
          <div className="flex gap-2 mb-6">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors duration-200 cursor-pointer ${
                  i === activeTab
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-transparent border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/15"
                }`}
              >
                {tab.icon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tab.icon}
                    alt=""
                    className="size-5 object-contain"
                    style={{ opacity: i === activeTab ? 1 : 0.5 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Document card */}
        <div
          className="rounded-2xl p-8 backdrop-blur-sm"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          {renderBlocks(activeContent)}
        </div>
      </div>
    </section>
  );
}
