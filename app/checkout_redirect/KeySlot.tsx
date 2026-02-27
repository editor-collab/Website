"use client";

import { useState } from "react";

function mask(value: string) {
  return value.replace(/[^-]/g, "●");
}

function EyeOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function EyeOpen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

export default function KeySlot({ value }: { value: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => !revealed && setRevealed(true)}
      className="flex items-center justify-between gap-3 rounded-xl transition-all duration-300 select-none"
      style={{
        padding: revealed ? "14px 16px" : "10px 16px",
        background: revealed ? "rgba(95,213,236,0.06)" : "rgba(95,213,236,0.03)",
        border: `1px solid ${revealed ? "rgba(95,213,236,0.18)" : "rgba(95,213,236,0.08)"}`,
        cursor: revealed ? "default" : "pointer",
      }}
    >
      <div className="relative font-mono text-sm tracking-widest overflow-hidden">
        <span
          className="text-white transition-opacity duration-500"
          style={{ opacity: revealed ? 1 : 0 }}
        >
          {value}
        </span>
        <span
          className="absolute inset-0 text-zinc-600 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: revealed ? 0 : 1 }}
          aria-hidden="true"
        >
          {mask(value)}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {revealed ? (
          <>
            <button
              onClick={handleCopy}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: copied ? "rgba(95,213,236,0.20)" : "rgba(95,213,236,0.10)",
                border: "1px solid rgba(95,213,236,0.20)",
                color: "#5FD5EC",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <span className="text-zinc-400"><EyeOpen /></span>
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span className="text-xs">Click to reveal</span>
            <EyeOff />
          </div>
        )}
      </div>
    </div>
  );
}
