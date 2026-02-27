"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

function parseInline(text: string): ReactNode[] {
  const TOKEN = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]*)\))/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    if (match[2] !== undefined) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-white">
          {parseInline(match[2])}
        </strong>
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <em key={match.index} className="italic text-zinc-300">
          {parseInline(match[3])}
        </em>
      );
    } else if (match[4] !== undefined) {
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
    } else if (match[5] !== undefined && match[6] !== undefined) {
      const label = match[5];
      const url = match[6];
      const isExternal = /^https?:\/\//.test(url);
      const isInternal = url.startsWith("/");

      if (isExternal) {
        nodes.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-zinc-300 hover:text-white transition-colors"
          >
            {label}
          </a>
        );
      } else if (isInternal) {
        nodes.push(
          <Link
            key={match.index}
            href={url}
            className="underline underline-offset-2 text-zinc-300 hover:text-white transition-colors"
          >
            {label}
          </Link>
        );
      } else {
        // FAQ cross-reference: scroll to matching question and open its accordion if collapsed
        const targetId = slugify(url);
        nodes.push(
          <button
            key={match.index}
            onClick={() => {
              const el = document.getElementById(targetId);
              if (!el) return;
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              setTimeout(() => {
                const trigger = el.querySelector(
                  "button[aria-expanded=\"false\"]"
                ) as HTMLElement | null;
                trigger?.click();
              }, 400);
            }}
            className="underline underline-offset-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {label}
          </button>
        );
      }
    }
    lastIndex = TOKEN.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderBlocks(content: string): ReactNode[] {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: { indent: number; text: string }[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(" ").trim();
    if (text) blocks.push(
      <p key={key++} className="text-sm text-zinc-400 leading-7">
        {parseInline(text)}
      </p>
    );
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    type ListItem = { text: string; children: string[] };
    const items: ListItem[] = [];
    for (const { indent, text } of listBuffer) {
      if (indent < 3) items.push({ text, children: [] });
      else if (items.length) items[items.length - 1].children.push(text);
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

    if (/^# /.test(line)) {
      flushParagraph(); flushList();
      blocks.push(<h2 key={key++} className="text-xl font-bold text-white mt-8 mb-3 first:mt-0">{parseInline(line.slice(2))}</h2>);
      continue;
    }
    if (/^## /.test(line)) {
      flushParagraph(); flushList();
      blocks.push(<h3 key={key++} className="text-lg font-semibold text-white mt-6 mb-2">{parseInline(line.slice(3))}</h3>);
      continue;
    }
    if (/^### /.test(line)) {
      flushParagraph(); flushList();
      blocks.push(<h4 key={key++} className="text-base font-semibold text-neutral-300 mt-4 mb-1">{parseInline(line.slice(4))}</h4>);
      continue;
    }

    if (/^->\s?.+\s?<-$/.test(line)) {
      flushParagraph(); flushList();
      const inner = line.replace(/^->\s?/, "").replace(/\s?<-$/, "");
      if (/^### /.test(inner))      blocks.push(<h4 key={key++} className="text-base font-semibold text-neutral-300 mt-4 mb-1 text-center">{parseInline(inner.slice(4))}</h4>);
      else if (/^## /.test(inner)) blocks.push(<h3 key={key++} className="text-lg font-semibold text-white mt-6 mb-2 text-center">{parseInline(inner.slice(3))}</h3>);
      else if (/^# /.test(inner))  blocks.push(<h2 key={key++} className="text-xl font-bold text-white mt-8 mb-3 first:mt-0 text-center">{parseInline(inner.slice(2))}</h2>);
      else                          blocks.push(<p key={key++} className="text-sm text-zinc-400 leading-7 text-center">{parseInline(inner)}</p>);
      continue;
    }

    if (line === "---") {
      flushParagraph(); flushList();
      blocks.push(<hr key={key++} className="my-6 border-t" style={{ borderColor: "var(--card-border)" }} />);
      continue;
    }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushParagraph(); flushList();
      // eslint-disable-next-line @next/next/no-img-element
      blocks.push(
        <img
          key={key++}
          src={imgMatch[2]}
          alt={imgMatch[1]}
          className="rounded-lg w-full object-cover my-3"
        />
      );
      continue;
    }

    const listMatch = line.match(/^(\s*)-\s(.*)$/);
    if (listMatch) {
      flushParagraph();
      listBuffer.push({ indent: listMatch[1].length, text: listMatch[2] });
      continue;
    }

    if (line.trim() === "") {
      flushParagraph(); flushList();
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export interface RichTextProps {
  content: string;
  className?: string;
}

export default function RichText({ content, className }: RichTextProps) {
  return (
    <div className={className}>
      {renderBlocks(content)}
    </div>
  );
}
