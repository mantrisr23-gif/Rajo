"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideData {
  id: number;
  image: string;
  label: string;
  title: string;
  para: string;
}

const slides: SlideData[] = [
  {
    id: 0,
    image: "/food/layer1-poda.webp", // Ensure this matches your public folder path
    label: "CHAPTER III • THE FEAST",
    title: "Poda Pitha",
    para: "A timeless Assamese delicacy made with rice, jaggery, and a touch of cardamom — slow-cooked to perfection.",
  },
  {
    id: 1,
    image: "/food/layer2-arisa.webp",
    label: "CHAPTER III • THE FEAST",
    title: "Arisa Pitha",
    para: "A timeless Assamese delicacy made with rice, jaggery, and a touch of fennel — golden, fragrant, sacred.",
  },
  {
    id: 2,
    image: "/food/layer3-celebration.webp",
    label: "CHAPTER III • THE FEAST",
    title: "The Rajo Mahostav",
    para: "Swings, laughter, songs, and the women who carried the tradition — woven through every Rajo since memory began.",
  },
];

// Cinematic easing curve
const EASE = [0.76, 0, 0.24, 1];

export default function Chapter3Food() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Click handler to advance to the next slide (loops back to 0)
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[activeIndex];

  return (
    <section 
      className="relative w-full h-[100dvh] bg-[#0E1715] overflow-hidden cursor-pointer select-none"
      onClick={handleNext}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lora:ital,wght@1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: EASE }}
          className="absolute inset-0 w-full h-full"
        >
          {/* 1. FULL SCREEN IMAGE */}
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* 2. CINEMATIC GRADIENT (Darkens the bottom so text is perfectly readable) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1715]/95 via-[#0E1715]/40 to-transparent pointer-events-none" />

          {/* 3. TEXT OVERLAY (Anchored to bottom left) */}
          <div className="absolute bottom-[8vh] md:bottom-[12vh] left-[6vw] right-[6vw] md:right-auto md:w-[600px] z-10">
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="font-['DM_Sans'] text-[10px] md:text-[12px] tracking-[0.4em] text-[#D4A853] uppercase mb-4 drop-shadow-md"
            >
              {activeSlide.label}
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="font-['Cormorant_Garamond'] italic font-light text-[#F2EAD8] text-[clamp(48px,8vw,90px)] leading-[1] mb-6 drop-shadow-lg"
            >
              {activeSlide.title}
            </motion.h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="w-16 h-px bg-[#D4A853]/50 mb-6 origin-left" 
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="font-['Lora'] italic text-[#C8B99A] text-[16px] md:text-[19px] leading-[1.6] md:leading-[1.8] drop-shadow-md"
            >
              {activeSlide.para}
            </motion.p>

            {/* Interaction Hint */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="font-['DM_Sans'] text-[10px] tracking-widest text-[#F2EAD8]/30 mt-12 uppercase flex items-center gap-3"
            >
              <span className="w-6 h-px bg-[#F2EAD8]/20" />
              Tap anywhere to continue
            </motion.p>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4. SLIDE INDICATOR DOTS (Top Right) */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-700 ease-in-out ${
              i === activeIndex ? "w-8 bg-[#D4A853]" : "w-2 bg-[#F2EAD8]/20"
            }`}
          />
        ))}
      </div>

    </section>
  );
}