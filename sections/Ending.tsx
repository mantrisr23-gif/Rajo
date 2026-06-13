"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Chapter4Farewell() {
  // Smooth scroll back to the hero section
  const handleReturnToStart = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Staggered animation variants for the text sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8, // Delays each line's appearance
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
    },
  };

  return (
    <section className="relative w-full h-[100dvh] bg-[#0E1715] overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* 1. BACKGROUND IMAGE 
        Slightly scaled up to 1.05 to prevent edge-clipping during the rotation.
        The entire image container slowly sways to simulate the empty swing's motion.
      */}
      <motion.div
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full scale-105 origin-top"
      >
        <img
          src="/chapter4-farewell.webp" // Generate this using your provided prompt
          alt="An empty Rajo swing after the monsoon rain"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* 2. DARK GRADIENT OVERLAY
        Matches your exact linear-gradient specifications to ensure text reads perfectly.
      */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(2,15,14,0.85) 100%)"
        }}
      />

      {/* 3. FADING RAIN/MIST OVERLAY
        Starts visible, then slowly fades to 0 over 4 seconds as the user rests on the page.
      */}
      <motion.div
        initial={{ opacity: 0.25 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 4, delay: 1, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. TEXT & INTERACTION CONTAINER 
      */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center max-w-[600px] px-6 mt-12"
      >
        {/* Label */}
        <motion.p 
          variants={itemVariants}
          className="font-['DM_Sans'] text-[12px] tracking-[0.4em] text-[#D4A853] uppercase mb-6 drop-shadow-md"
        >
          CHAPTER IV • FAREWELL
        </motion.p>

        {/* Heading */}
        <motion.h2 
          variants={itemVariants}
          className="font-['Cormorant_Garamond'] text-[clamp(40px,6vw,64px)] text-[#F2EAD8] font-semibold leading-tight mb-10 drop-shadow-lg"
        >
          Until the next monsoon.
        </motion.h2>

        {/* Final Letter (Broken into cinematic stanzas) */}
        <div className="flex flex-col gap-6 mb-16">
          <motion.p variants={itemVariants} className="font-['Lora'] italic text-[18px] text-[#C8B99A] leading-relaxed drop-shadow-md">
            For three days,<br />
            I filled your courtyards with rain,<br />
            your hands with sweetness,<br />
            and your hearts with laughter.
          </motion.p>
          
          <motion.p variants={itemVariants} className="font-['Lora'] italic text-[18px] text-[#C8B99A] leading-relaxed drop-shadow-md">
            Now I return to the waiting clouds.
          </motion.p>
          
          <motion.p variants={itemVariants} className="font-['Lora'] italic text-[18px] text-[#C8B99A] leading-relaxed drop-shadow-md">
            Until the earth rests again,<br />
            remember me.
          </motion.p>

          <motion.p variants={itemVariants} className="font-['Lora'] italic text-[18px] text-[#C8B99A] leading-relaxed drop-shadow-md">
            I will come back.
          </motion.p>
        </div>

        {/* Return Button */}
        <motion.button
          variants={itemVariants}
          onClick={handleReturnToStart}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(212, 168, 83, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-[#F2EAD8] border border-[#D4A853] rounded-full font-['DM_Sans'] text-[11px] tracking-[0.2em] text-[#0E1715] uppercase font-semibold transition-all duration-300"
        >
          RETURN TO THE FIRST RAIN
        </motion.button>

        {/* The Final Secret Interaction (Fades in very late) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 6 }} // 6 seconds after the section enters view
          className="font-['Cormorant_Garamond'] italic text-[14px] text-[#C8B99A]/40 mt-8"
        >
          Rajo returns every June.
        </motion.p>

      </motion.div>
    </section>
  );
}