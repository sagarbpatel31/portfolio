// Reusable Framer Motion animation variants

const cubicEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay: number = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: cubicEase,
    },
  },
});

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn = (delay: number = 0) => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: cubicEase },
  },
});

export const slideIn = (direction: "up" | "down" | "left" | "right" = "left", delay: number = 0) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: cubicEase,
    },
  },
});
