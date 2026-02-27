import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { HeroHeader } from "@/components/global/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Editor Collab - Collaborations made easier.",
  description: "Real-time collaborative editing for Geometry Dash Levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <body className={`${nunito.className} antialiased`}>
        <ThemeProvider>
          <HeroHeader />
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
