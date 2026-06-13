import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "ରଜ ସ୍ମୃତି | RAJO SMRUTI",
  description: "An Interactive Cinematic Memory Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="or" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-[#013E37] text-[#EFE6DD] antialiased overflow-x-hidden selection:bg-[#9A0002] selection:text-[#FFEFB3]">
        {children}
      </body>
    </html>
  );
}