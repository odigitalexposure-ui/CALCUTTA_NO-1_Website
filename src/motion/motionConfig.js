import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };

export const MOTION_EASE = {
  cinematic: [0.22, 1, 0.36, 1],
  sharp: [0.16, 1, 0.3, 1],
  gsapPrimary: 'power3.out',
  gsapDeep: 'power3.out',
};

export const MOTION_DURATION = {
  fast: 0.28,
  base: 0.5,
  slow: 0.75,
  mobileFactor: 0.75,
};

export const SCROLL_REVEAL = {
  yDesktop: 20,
  yMobile: 14,
  durationDesktop: 0.55,
  durationMobile: 0.42,
  staggerDesktop: 0.06,
  staggerMobile: 0.04,
  startDesktop: 'top 93%',
  startMobile: 'top 95%',
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.12,
};

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: MOTION_EASE.cinematic },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.14, ease: MOTION_EASE.sharp },
  },
};

export const mobileDrawerVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: MOTION_EASE.sharp },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: MOTION_EASE.cinematic,
      staggerChildren: 0.04,
      delayChildren: 0.03,
    },
  },
};

export const mobileNavItemVariants = {
  closed: { opacity: 0, x: -10 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: MOTION_EASE.cinematic },
  },
};

export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};

export const modalPanelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: MOTION_EASE.cinematic },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.18, ease: MOTION_EASE.sharp },
  },
};
