import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-smono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afrianluthfan.github.io"),
  title: "Afrian Luthfan | Software Engineer",
  description:
    "Portfolio and resume of Afrian Luthfan, a software engineer in Bogor, Indonesia building backend services and AI tools at Bank Raya Indonesia.",
  openGraph: {
    title: "Afrian Luthfan | Software Engineer",
    description:
      "Backend services, internal APIs, and AI tools used by 1,000+ employees.",
    type: "website",
    images: ["/muka.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${grotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-[3px] focus:border-ink focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:font-bold focus:uppercase"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
