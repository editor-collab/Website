"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
      style={{
        background: copied ? "rgba(95,213,236,0.20)" : "rgba(95,213,236,0.10)",
        border: "1px solid rgba(95,213,236,0.20)",
        color: "#5FD5EC",
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
