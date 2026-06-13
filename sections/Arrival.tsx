"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Arrival() {
  // --- RESTORED TEXT SCRAMBLE LOGIC ---
  const originalQuote = "The rain remembered her before we did.";
  const [scrambledQuote, setScrambledQuote] = useState(originalQuote);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const handleScramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledQuote((prev) =>
        originalQuote
          .split("")
          .map((letter, index) => {
            if (index < iteration) return originalQuote[index];
            if (letter === " " || letter === ".") return letter;
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      if (iteration >= originalQuote.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <section className="relative w-full h-[100dvh] bg-[#0E1715] text-[#F2EAD8] overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10 cursor-crosshair">

      {/* --- THE "AURELA" IMAGE EXPANSION --- */}
      <motion.div
        initial={{ clipPath: "inset(45% 48% 45% 48%)", filter: "brightness(1) saturate(1) blur(0px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", filter: "brightness(0.75) saturate(0.85) blur(1px)" }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute inset-[-5%] bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/rajo-geet/layer0-bg.webp")' }} 
      />

      {/* Atmospheric Overlays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute inset-0 bg-[#0A1E14] z-0 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute inset-0 bg-[#013E37] mix-blend-overlay z-0 pointer-events-none"
      />

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">

        {/* Top Tagline */}
        <div className="w-full flex justify-end mt-8 md:mt-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            whileHover={{ x: -10, color: "#D4A853" }}
            className="font-serif italic font-light text-[clamp(14px,3.5vw,20px)] tracking-[0.12em] text-[#F2EAD8]/80 text-right cursor-default transition-colors duration-300"
          >
            She arrives with rain.<br/>She leaves with memories.
          </motion.p>
        </div>

        {/* RAJO Headline with Aurela Split + Gold Hovers */}
        <div className="w-full flex justify-start my-auto">
          <h1 className="font-serif italic font-bold leading-none tracking-[0.05em] flex drop-shadow-2xl">
            {["R", "A", "J", "O"].map((letter, i) => {
              const initialX = i < 2 ? 80 - (i * 20) : -80 + ((i - 2) * 20);

              return (
                <motion.span
                  key={i}
                  initial={{ x: initialX, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                  whileHover={{
                    y: -15,
                    scale: 1.02,
                    color: "#D4A853",
                    textShadow: "0px 10px 40px rgba(212, 168, 83, 0.6)"
                  }}
                  className="relative text-[clamp(100px,20vw,250px)] text-[#F2EAD8] cursor-pointer"
                >
                  {letter}
                </motion.span>
              );
            })}
          </h1>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="w-full flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-8 md:gap-0 pb-4"
        >
          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-3 self-start md:self-end pl-2">
            <span className="font-sans text-[8px] tracking-[0.25em] text-[#F2EAD8]/40 uppercase transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Scroll into memory
            </span>
            <motion.div
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] h-10 md:h-14 bg-[#D4A853] origin-top opacity-60"
            />
          </div>

          {/* Editorial Memory Card with Scramble Trigger */}
          <div 
            onMouseEnter={handleScramble}
            className="w-full md:w-[450px] bg-black/10 backdrop-blur-[8px] border-0 border-l-[3px] border-[#D4A853]/50 p-6 md:p-8 relative shadow-2xl cursor-pointer" 
            style={{ clipPath: 'polygon(0 0, 10% 2%, 20% 0, 30% 2%, 40% 0, 50% 2%, 60% 0, 70% 2%, 80% 0, 90% 2%, 100% 0, 100% 100%, 0 100%)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4A853] uppercase opacity-90">
                Rajo 2025
              </span>
              <span className="font-sans text-[8px] tracking-[0.2em] text-[#F2EAD8]/50 uppercase text-right">
                Odisha • Memory I
              </span>
            </div>
            
            <motion.p
              whileHover={{ color: "#D4A853" }}
              className="font-serif italic text-[16px] md:text-[18px] text-[#F2EAD8] leading-relaxed transition-colors duration-300"
            >
              "{scrambledQuote}"
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}