import { Variants } from "framer-motion";

export const fadeIn = (direction: "up" | "down"): Variants => {
  return {
    initial: {
      y: direction == "up" ? 60 : -60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      x:-100,
      opacity:0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    }
  };
};
