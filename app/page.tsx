"use client";

import { useEffect } from "react";
import Arrival from "@/sections/Arrival";
import RajoGeet from "@/sections/RajoGeet";
import FoodMemories from "@/sections/FoodMemories";
import FamilyMemories from "@/sections/FamilyMemories"; /* <-- FIXED THIS LINE */
import Ending from "@/sections/Ending";

export default function Home() {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#013E37]">
      <Arrival />
      <RajoGeet />
      <FamilyMemories />
      <FoodMemories />
      <Ending />
    </main>
  );
}