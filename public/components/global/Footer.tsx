"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const LINKS = [
  { label: "Terms of Service", href: "/legal/tos" },
  { label: "Refund Policy",    href: "/legal/refund-policy" },
  { label: "Privacy Policy",   href: "/legal/privacy-policy" },
];

export default function Footer() {
  return (
    <footer
      className="bg-ink text-zinc-500 text-sm"
      style={{ borderTop: "1px solid var(--card-border)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Copyright */}
        <span className="text-center md:text-left">
          © 2026 Editor Collab Software Inc. All rights reserved.
        </span>

        {/* Policy links */}
        <nav className="flex items-center flex-wrap justify-center">
          {LINKS.map((link, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="mx-3 opacity-30">·</span>}
              <Link
                href={link.href}
                className="transition-colors duration-150 hover:text-[#5FD5EC]"
              >
                {link.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        {/* Credit */}
        <span className="flex items-center gap-1.5 text-center md:text-right">
          Created with
          <Icon
            icon="solar:heart-bold"
            className="size-3.5 shrink-0"
            style={{ color: "#FE3794" }}
          />
          by{" "}
          <span className="text-zinc-400 font-medium">@its.crysxts</span>
        </span>

      </div>
    </footer>
  );
}
