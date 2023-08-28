import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function MultiLayerParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "110%"]);

  return (
    <div ref={ref} className="w-full h-screen overflow-hidden relative grid place-items-center " >
      <motion.h1
        style={{ y: textY }}
        className="font-bold text-white text-7xl md:text-8xl relative z-10 pb-[400px]"
      >
        Explore our core Features
      </motion.h1>
      <div
        className="absolute inset-0 z-20 mt-[345px]"
        style={{
          width: "1440px",
          height: "440px",
          backgroundImage: `url(/5.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}