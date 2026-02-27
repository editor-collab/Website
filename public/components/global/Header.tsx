"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image'
import { Icon } from "@iconify/react"
import { useTheme } from "@/components/providers/ThemeProvider"
import { usePathname } from "next/navigation"

export function HeroHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") { setScrolled(false); return }
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const mainItems = [
    <Link key="f" href="/">Home</Link>,
    <Link key="pr" href="/pricing">Pricing</Link>,
    <Link key="p" href="/changelog">Changelogs</Link>,
    <Link key="c" href="/community">Community</Link>,
    <Link key="d" href="/contact">Contact</Link>,
    <Link key="t" href="/faq">FAQ</Link>
  ]

  const otherItems = [
    <button
      key="theme"
      onClick={toggle}
      aria-label="Toggle theme"
      className="header-icon-btn flex items-center justify-center size-9 rounded-xl transition-colors"
    >
      <Icon
        className="size-4.5"
        icon={theme === "dark" ? "solar:sun-bold" : "solar:moon-bold"}
        style={{ color: theme === "dark" ? "#FFDFA4" : "#367AD4" }}
      />
    </button>,
    <button key="d" className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] transition-colors rounded-2xl px-4 py-2 text-white text-sm font-medium">
      <Icon className="size-5" icon="fa7-brands:discord" />
      Support
    </button>,
  ]

  return (
    <header className="fixed z-50 flex justify-center m-6 left-0 right-0">
      <div className={`header-pill backdrop-blur-xl border w-full md:w-300 mx-auto rounded-3xl transition-colors duration-300${scrolled ? " scrolled" : ""}`}>


        <div className="flex items-center justify-between h-16 pl-4 pr-4 gap-8">

          <div className="flex items-center gap-3">
            <Image
              src="/assets/Logo2.png"
              alt="glflds"
              className="object-contain size-10 header-logo"
              width={36}
              height={36}
            />
            <span className="text-white text-lg font-medium">Editor Collab</span>
          </div>

          <nav className="hidden md:flex gap-8 text-neutral-300 text-sm">
            {mainItems.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </nav>

          <nav className="hidden md:flex gap-5 text-neutral-300 text-sm">
            {otherItems.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </nav>

          {/* Fixed hamburger alignment + rounded lines */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden relative size-7 flex items-center justify-center m-4"
          >
            <span
              className={`hamburger-line absolute w-full h-[2.5px] rounded-full transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-2"
                }`}
            />
            <span
              className={`hamburger-line absolute w-full h-[2.5px] rounded-full transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`hamburger-line absolute w-full h-[2.5px] rounded-full transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-2"
                }`}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${open ? "max-h-96" : "max-h-0"
            }`}
        >
          <div className="px-6 pt-6 pb-8 flex flex-col gap-6">

            {/* Main links only (brand removed) */}
            <nav className="flex flex-col gap-4 text-neutral-300 text-base">
              {mainItems.map((item, i) => (
                <div key={i} onClick={() => setOpen(false)}>
                  {item}
                </div>
              ))}
            </nav>

            {/* Other */}
            <nav className="flex flex-wrap gap-4 text-neutral-300 text-sm">
              {otherItems.map((item, i) => (
                <div key={i} onClick={() => setOpen(false)}>
                  {item}
                </div>
              ))}
            </nav>

          </div>
        </div>
      </div>
    </header>
  )
}
