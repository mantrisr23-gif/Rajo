"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/rajo-geet/layer1-courtyard.webp",
    label: "ODISHA · JUNE · MEMORY I",
    title: "The Courtyard",
    para: "I returned to the courtyard first. I fell softly on the stones that once held the echoes of sisters playing, washing away the dust of time to make them shine again.",
  },
  {
    id: 2,
    image: "/rajo-geet/layer2-swing.webp",
    label: "ODISHA · JUNE · MEMORY II",
    title: "The Swing",
    para: "I found the swing hanging in the mist. I remember the weight of those girls; I remember how I pushed them higher, until they were almost touching the monsoon clouds.",
  }
];

const SNAP_EASE = [0.76, 0, 0.24, 1];

interface SlideCardProps {
  slide: any;
  isActive: boolean;
  index: number;
  activeIndex: number;
  onClick: (index: number) => void;
  cardWidth: number;
}

function SlideCard({ 
  slide, 
  isActive, 
  index, 
  activeIndex, 
  onClick, 
  cardWidth 
}: SlideCardProps) {
  const distance = index - activeIndex;
  const absDistance = Math.abs(distance);

  const scale = isActive ? 1 : absDistance === 1 ? 0.88 : 0.78;
  const opacity = isActive ? 1 : absDistance === 1 ? 0.55 : 0.3;
  const zIndex = isActive ? 10 : absDistance === 1 ? 5 : 1;
  const rotateY = isActive ? 0 : distance > 0 ? -8 : 8;

  return (
    <motion.div
      onClick={() => !isActive && onClick(index)}
      animate={{ scale, opacity, rotateY, zIndex }}
      transition={{ duration: 0.65, ease: SNAP_EASE }}
      style={{
        width: cardWidth,
        height: "100%", // Takes full height of the slider container
        flexShrink: 0,
        cursor: isActive ? "default" : "pointer",
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative rounded-2xl overflow-hidden"
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {/* The zooming image */}
        <motion.div
          animate={{ scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </motion.div>

        {/* Heavy gradient overlay to ensure background is dark enough */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(14, 23, 21, 0.9) 0%, rgba(14, 23, 21, 0.2) 60%, transparent 100%)",
          }}
        />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
            opacity: 0.6,
          }}
        />

        {/* Text content wrapped in a Glassmorphism Box for 100% legibility */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-6 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl"
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 0.7, letterSpacing: "0.25em" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  color: "#D4A853",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                {slide.label}
              </motion.p>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(28px, 6vw, 36px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#F2EAD8",
                  lineHeight: 1.1,
                  marginBottom: 12,
                }}
              >
                {slide.title}
              </motion.h2>

              {/* Paragraph */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "clamp(14px, 3vw, 16px)",
                  fontStyle: "italic",
                  color: "#E5D8BC",
                  lineHeight: 1.6,
                }}
              >
                {slide.para}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active indicator border */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none rounded-2xl border border-[#D4A853]/30"
        />
      </div>
    </motion.div>
  );
}

export default function RajoGeet() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  
  // Card width dynamically set but defaults to a solid mobile size
  const CARD_W = 340; 
  const GAP = 24;
  const STEP = CARD_W + GAP;

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setActiveIndex(clamped);
    animate(dragX, -clamped * STEP, {
      type: "spring",
      stiffness: 260,
      damping: 32,
      mass: 1,
    });
  }, [dragX, STEP]);

  const handleDragEnd = useCallback((_: any, info: any) => {
    setIsDragging(false);
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let next = activeIndex;
    if (velocity < -300 || offset < -STEP / 3) next = activeIndex + 1;
    else if (velocity > 300 || offset > STEP / 3) next = activeIndex - 1;

    goTo(next);
  }, [activeIndex, goTo, STEP]);

  const progress = activeIndex / Math.max(1, slides.length - 1);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lora:ital,wght@1,400&family=DM+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Lock to exactly 100dvh to prevent unwanted vertical scrolling */}
      <section className="flex flex-col items-center justify-between overflow-hidden bg-[#0E1715] h-[100dvh] py-6 w-full select-none">
        
        {/* Compact Header */}
        <div className="text-center shrink-0 mb-4 mt-2">
          <p className="font-['DM_Sans'] text-[10px] tracking-[0.3em] text-[#D4A853] uppercase opacity-80 mb-2">
            Chapter I · Rajo Geet
          </p>
          <div className="relative inline-block">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] font-serif text-[clamp(60px,12vw,100px)] font-light text-[#F2EAD8]/5 whitespace-nowrap pointer-events-none">
              01
            </span>
            <h1 className="relative z-10 font-serif text-[clamp(24px,5vw,36px)] font-light italic text-[#F2EAD8] tracking-wide">
              Memories of Rain
            </h1>
          </div>
        </div>

        {/* Slider viewport — Expands to fill available vertical space */}
        <div className="w-full flex-1 min-h-0 overflow-hidden relative" style={{ cursor: isDragging ? "grabbing" : "grab", perspective: 1200 }}>
          <motion.div
            drag="x"
            dragConstraints={{ left: -(slides.length - 1) * STEP, right: 0 }}
            dragElastic={0.08}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{
              x: dragX,
              display: "flex",
              gap: GAP,
              height: "100%", // Fill wrapper height
              paddingLeft: `calc(50vw - ${CARD_W / 2}px)`,
              paddingRight: `calc(50vw - ${CARD_W / 2}px)`,
              willChange: "transform",
            }}
            className="items-center" // Center cards vertically if they don't fill
          >
            {slides.map((slide, i) => (
              <SlideCard
                key={slide.id}
                slide={slide}
                index={i}
                activeIndex={activeIndex}
                isActive={i === activeIndex}
                onClick={goTo}
                cardWidth={CARD_W}
              />
            ))}
          </motion.div>
        </div>

        {/* Compact Bottom Controls */}
        <div className="shrink-0 flex flex-col items-center mt-6 mb-2">
          {/* Progress bar */}
          <div className="w-[160px] h-[2px] bg-[#F2EAD8]/10 rounded-full overflow-hidden mb-4">
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5, ease: SNAP_EASE }}
              className="h-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/40"
            />
          </div>

          <div className="flex items-center gap-8">
            <motion.button
              onClick={() => goTo(activeIndex - 1)}
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.94 }}
              className="w-10 h-10 rounded-full border border-[#D4A853]/30 text-[#D4A853] flex items-center justify-center opacity-70 hover:bg-white/5 transition-colors disabled:opacity-20"
              disabled={activeIndex === 0}
            >
              ←
            </motion.button>
            
            <p className="font-['DM_Sans'] text-[11px] tracking-widest text-[#F2EAD8]/40">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>

            <motion.button
              onClick={() => goTo(activeIndex + 1)}
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.94 }}
              className="w-10 h-10 rounded-full border border-[#D4A853]/30 text-[#D4A853] flex items-center justify-center opacity-70 hover:bg-white/5 transition-colors disabled:opacity-20"
              disabled={activeIndex === slides.length - 1}
            >
              →
            </motion.button>
          </div>
        </div>

      </section>
    </>
  );
}