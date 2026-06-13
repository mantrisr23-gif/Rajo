"use client";

import React from "react";
import { motion } from "framer-motion";

const MEMORIES = [
  // PART 1: WHEN THE SWING WAS ENOUGH
  {
    id: "p1-1",
    label: "WHEN THE SWING WAS ENOUGH",
    text: "We did not count the summers.",
    img: "/memories/joy/01.webp",
  },
  {
    id: "p1-2",
    label: "WHEN THE SWING WAS ENOUGH",
    text: "The swing knew our names.",
    img: "/memories/joy/02.webp",
  },
  {
    id: "p1-3",
    label: "WHEN THE SWING WAS ENOUGH",
    text: "Afternoons lasted forever.",
    img: "/memories/joy/03.webp",
  },
  {
    id: "p1-4",
    label: "WHEN THE SWING WAS ENOUGH",
    text: "The rain found us laughing.",
    img: "/memories/joy/04.webp",
  },

  // PART 2: THE YEARS BETWEEN
  {
    id: "p2-1",
    label: "THE YEARS BETWEEN",
    text: "Some seasons teach us to stay.",
    img: "/memories/between/01.webp",
  },
  {
    id: "p2-2",
    label: "THE YEARS BETWEEN",
    text: "Others teach us to return.",
    img: "/memories/between/02.webp",
  },
  {
    id: "p2-3",
    label: "THE YEARS BETWEEN",
    text: "The earth rested.",
    img: "/memories/between/03.webp",
  },
  {
    id: "p2-4",
    label: "THE YEARS BETWEEN",
    text: "We kept becoming.",
    img: "/memories/between/04.webp",
  },

  // PART 3: WHO THEY BECAME
  {
    id: "p3-1",
    label: "WHO THEY BECAME",
    text: "The girls grew into women.",
    img: "/memories/becoming/01.webp",
    large: true, // Flags for larger typography
  },
  {
    id: "p3-2",
    label: "WHO THEY BECAME",
    text: "The laughter remained.",
    img: "/memories/becoming/02.webp",
    large: true,
  },
  {
    id: "p3-3",
    label: "WHO THEY BECAME",
    text: "The bond endured.",
    img: "/memories/becoming/03.webp",
    large: true,
  },
  {
    id: "p3-4",
    label: "WHO THEY BECAME",
    text: "Each June, we gather again.",
    img: "/memories/becoming/04-wedding.webp", // The wedding anchor
    large: true,
  },
];

const MemoryCard = ({ item }: { item: typeof MEMORIES[0] }) => {
  return (
    // Standard block flow. Exactly 100dvh per image. No sticky traps.
    <section className="relative w-full h-[100dvh] overflow-hidden flex items-end">
      
      {/* 1. Fullscreen Image with subtle scale-down on entry */}
      <motion.img
        src={item.img}
        alt={item.text}
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. Deep Gradient Overlay (guarantees text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1715]/95 via-[#0E1715]/30 to-transparent z-10" />

      {/* 3. Poetic Text Overlay */}
      <div className="relative z-20 w-full px-6 pb-20 md:px-16 md:pb-24 max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="font-['DM_Sans'] text-[10px] md:text-[12px] tracking-[0.4em] text-[#D4A853] uppercase mb-4 md:mb-6 drop-shadow-md">
            {item.label}
          </p>
          
          <h2 
            className={`font-['Cormorant_Garamond'] italic font-light text-[#F2EAD8] drop-shadow-xl ${
              item.large ? 'text-[clamp(42px,8vw,90px)]' : 'text-[clamp(32px,6vw,64px)]'
            } leading-[1.1]`}
          >
            "{item.text}"
          </h2>
        </motion.div>
      </div>

    </section>
  );
};

export default function Chapter2Memories() {
  return (
    <div className="w-full bg-[#0E1715]">
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lora:ital,wght@1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      
      {/* Map straight through the memories */}
      {MEMORIES.map((item) => (
        <MemoryCard key={item.id} item={item} />
      ))}

      {/* Transition to Chapter III */}
      <section className="relative w-full h-[50vh] bg-[#0E1715] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="font-['DM_Sans'] text-[9px] tracking-[0.3em] text-[#F2EAD8]/40 uppercase mb-4">
            [ Soft rain & distant laughter ]
          </p>
          <div className="w-px h-16 bg-[#D4A853]/40 mx-auto mb-10" />
        </motion.div>
      </section>
    </div>
  );
}