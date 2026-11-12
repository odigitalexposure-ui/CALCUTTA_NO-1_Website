import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

function MicCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointerHover, setIsPointerHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const cursorX = useSpring(rawX, { stiffness: 750, damping: 42, mass: 0.2 });
  const cursorY = useSpring(rawY, { stiffness: 750, damping: 42, mass: 0.2 });

  const haloX = useSpring(rawX, { stiffness: 260, damping: 28, mass: 0.45 });
  const haloY = useSpring(rawY, { stiffness: 260, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return undefined;

    const finePointerQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const syncDevice = () => setEnabled(finePointerQuery.matches);
    syncDevice();

    finePointerQuery.addEventListener('change', syncDevice);
    return () => finePointerQuery.removeEventListener('change', syncDevice);
  }, [prefersReduced]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-mic-cursor');
      return undefined;
    }

    document.documentElement.classList.add('has-mic-cursor');

    const interactiveSelector =
      'a, button, input, select, textarea, label, [role="button"], [role="tab"]';

    const handleMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);

      const target = e.target;
      if (target instanceof Element) {
        if (target.closest('iframe')) {
          setVisible(false);
          return;
        }
        setIsPointerHover(Boolean(target.closest(interactiveSelector)));
      }
    };

    const handleLeave = () => setVisible(false);
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      document.documentElement.classList.remove('has-mic-cursor');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Trailing Acoustic Halo Ring */}
      <motion.div
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? (isPointerHover ? 0.9 : 0.45) : 0,
          scale: isPressed ? 0.8 : isPointerHover ? 1.45 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 h-9 w-9 rounded-full border border-[#ecc56d]/55 bg-[#ecc56d]/[0.06] shadow-[0_0_20px_rgba(236,197,109,0.2)]"
      />

      {/* Custom Studio Microphone Pointer */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-6px',
          translateY: '-4px',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isPressed ? 0.86 : isPointerHover ? 1.15 : 1,
          rotate: isPointerHover ? -12 : 0,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        className="fixed top-0 left-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]"
      >
        <svg
          width="30"
          height="34"
          viewBox="0 0 30 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Acoustic sound arcs when hovering interactive targets */}
          <path
            d="M3 7.5C1.5 9.5 1.5 12.5 3 14.5"
            stroke="#fff6d6"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={isPointerHover ? 0.95 : 0.35}
          />
          <path
            d="M17.5 4.5C19.5 6 20.5 8.5 20 11"
            stroke="#fff6d6"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={isPointerHover ? 0.95 : 0.35}
          />

          {/* Angled Stage Handheld Microphone */}
          <g transform="rotate(-28 11 12)">
            {/* Mesh Mic Capsule Head */}
            <rect
              x="6"
              y="2"
              width="10"
              height="12"
              rx="5"
              fill="url(#micHeadGold)"
              stroke="#050507"
              strokeWidth="1"
            />
            {/* Grille Lines */}
            <line x1="7.5" y1="5.5" x2="14.5" y2="5.5" stroke="#050507" strokeWidth="0.9" opacity="0.7" />
            <line x1="7.2" y1="8" x2="14.8" y2="8" stroke="#050507" strokeWidth="0.9" opacity="0.7" />
            <line x1="7.5" y1="10.5" x2="14.5" y2="10.5" stroke="#050507" strokeWidth="0.9" opacity="0.7" />

            {/* Collar Ring */}
            <rect x="6.5" y="13.5" width="9" height="2" rx="0.8" fill="#fff6d6" />

            {/* Tapered Mic Body */}
            <path
              d="M7.5 15.5H14.5L13.3 28.5C13.2 29.6 12.2 30.5 11 30.5C9.8 30.5 8.8 29.6 8.7 28.5L7.5 15.5Z"
              fill="#0b0c10"
              stroke="#ecc56d"
              strokeWidth="1.2"
            />
            {/* Power LED Dot */}
            <circle cx="11" cy="20" r="1.1" fill={isPointerHover ? '#34d399' : '#ecc56d'} />
          </g>

          <defs>
            <linearGradient id="micHeadGold" x1="6" y1="2" x2="16" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff6d6" />
              <stop offset="0.5" stopColor="#ecc56d" />
              <stop offset="1" stopColor="#b97d22" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

export default MicCursor;

