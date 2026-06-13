"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function FloatingMemoryCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-6px", "6px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[90vw] md:w-[600px] h-[320px] md:h-[380px] rounded-[32px] border border-white/10 overflow-hidden z-20"
    >
      <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-[20px] z-0" />

      <div className="relative z-10 flex flex-col md:flex-row h-full w-full p-4 gap-4">
        <div className="relative w-full md:w-[70%] h-[55%] md:h-full rounded-[24px] overflow-hidden bg-[#012622]">
          <motion.div 
            style={{ x: imageX, y: imageY, scale: 1.05 }}
            className="absolute inset-0 bg-[url('/rajo-geet/layer0-bg.webp')] bg-cover bg-center"
          />
        </div>

        <div className="w-full md:w-[30%] flex flex-col justify-between py-2 px-1">
          <div className="font-sans text-[10px] tracking-[0.2em] text-[#EFE6DD]/50 uppercase">
            Rajo 2025
          </div>
          <div className="font-serif text-base md:text-lg text-[#FFEFB3] leading-snug">
            "The rain remembered her before I did."
          </div>
          <div className="font-sans text-[8px] tracking-[0.15em] text-[#EFE6DD]/40 uppercase">
            Odisha • June • Memory I
          </div>
        </div>
      </div>
    </motion.div>
  );
}