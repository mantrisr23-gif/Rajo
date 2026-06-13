"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 1. Parallax Depth Stack
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);
  const headlineY = useTransform(scrollY, [0, 1000], ["0%", "5%"]);
  const cardY = useTransform(scrollY, [0, 1000], ["0%", "-15%"]);

  // 2. Memory Flash (Click Interaction)
  const [isFlashing, setIsFlashing] = useState(false);
  const triggerFlash = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 600);
  };

  // 3. Magnetic Cursor (Memory Card)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // 15% gravitational pull
    mouseX.set((e.clientX - centerX) * 0.15);
    mouseY.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 4. Text Scramble Logic
  const originalQuote = "The rain remembered her before I did.";
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
      iteration += 1 / 2; // Speed of resolution
    }, 30);
  };

  return (
    <motion.section 
      ref={containerRef}
      onClick={triggerFlash}
      animate={{ filter: isFlashing ? "grayscale(100%) brightness(1.5)" : "grayscale(0%) brightness(1)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-screen bg-[#0E1715] text-[#EFE6DD] overflow-hidden flex flex-col justify-center cursor-crosshair"
    >
      {/* --- BACKGROUND STACK --- */}
      {/* Base blurred image */}
      <motion.div 
        style={{ y: bgY, backgroundImage: 'url("/rajo-geet/layer0-bg.webp")' }} 
        className="absolute inset-[-10%] bg-cover bg-center opacity-50 blur-[4px] z-0"
      />
      {/* Teal Wash Overlay */}
      <div className="absolute inset-0 bg-[#013E37] mix-blend-overlay opacity-80 z-0" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0" />
      
      {/* CSS Rain Overlay */}
      <div className="rain-overlay absolute inset-0 z-0 pointer-events-none opacity-40" />

      {/* --- CONTENT STACK --- */}
      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-start mt-20">
        
        {/* Split Header (Tagline & Metadata) */}
        <div className="w-full flex justify-between items-end mb-8 pl-[5vw] pr-[5vw] md:pr-[10vw]">
          <p className="font-sans text-[clamp(16px,2.5vw,24px)] font-light tracking-[0.08em] uppercase max-w-sm">
            She arrives with rain.<br/>She leaves with memories.
          </p>
          <div className="hidden md:flex flex-col text-right font-sans text-xs tracking-[0.2em] opacity-60">
            <span>Odisha • June</span>
            <span>Memory I</span>
          </div>
        </div>

        {/* RAJO Staggered Headline */}
        <motion.h1 
          style={{ y: headlineY }}
          className="font-serif font-bold leading-none tracking-[0.15em] ml-[5vw] flex text-[#EFE6DD]"
        >
          {["R", "A", "J", "O"].map((letter, i) => (
            <motion.span
              key={i}
              initial={{ clipPath: "inset(0 100% 0 0)", skewX: 8, opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", skewX: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="relative group text-[clamp(120px,20vw,250px)]"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-transparent">
                {letter}
              </span>
              {/* Gold wipe on hover */}
              <span className="absolute left-0 bottom-0 w-full h-full text-[#D4A853] z-0 overflow-hidden h-0 group-hover:h-full transition-all duration-500 ease-out flex items-end">
                {letter}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Magnetic Memory Card */}
        <div className="w-full flex justify-end pr-[5vw] md:pr-[10vw] mt-[-5vh] md:mt-[-10vh] z-20">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleScramble}
            style={{ x: springX, y: springY, translateY: cardY }}
            className="w-[90vw] md:w-[450px] bg-[#0E1715]/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4A853] uppercase mb-4 block">
              Rajo 2025
            </span>
            <p className="font-serif italic text-2xl md:text-3xl text-[#FFEFB3] leading-snug">
              "{scrambledQuote}"
            </p>
          </motion.div>
        </div>

      </div>

      {/* Breathing Scroll Indicator */}
      <div className="absolute bottom-10 left-[5vw] flex items-center gap-4 z-20 pointer-events-none">
        <motion.div 
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-[#D4A853] origin-top"
        />
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#EFE6DD]/50" style={{ writingMode: 'vertical-rl' }}>
          Scroll into memory
        </span>
      </div>

      {/* Inline Styles for the Rain Physics */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rain-fall {
          0% { background-position: 0% 0%; }
          100% { background-position: 20% 100%; }
        }
        .rain-overlay {
          background-image: repeating-linear-gradient(75deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 100%);
          background-size: 200% 200%;
          animation: rain-fall 0.8s linear infinite;
        }
      `}} />
    </motion.section>
  );
}