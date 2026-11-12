import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import {
  MOTION_EASE,
  mobileDrawerVariants,
  mobileNavItemVariants,
} from '../motion/motionConfig';
import MagneticWrap from './MagneticWrap';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

function NavbarComp() {
  const [openMenuPath, setOpenMenuPath] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hiddenRef = useRef(false);
  const scrolledRef = useRef(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const menuOpen = openMenuPath === pathname;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const nextScrolled = latest > 24;
    if (nextScrolled !== scrolledRef.current) {
      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
    }

    let nextHidden = hiddenRef.current;
    if (menuOpen || latest <= 60) {
      nextHidden = false;
    } else if (latest > previous && latest > 90) {
      nextHidden = true;
    } else if (latest < previous - 3) {
      nextHidden = false;
    }

    if (nextHidden !== hiddenRef.current) {
      hiddenRef.current = nextHidden;
      setHidden(nextHidden);
    }
  });

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.28, ease: MOTION_EASE.cinematic }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <div className="pointer-events-auto mx-auto max-w-6xl">
        {/* Floating Frosted-Glass Pill Bar */}
        <div
          className={`relative flex items-center justify-between gap-3 rounded-full border px-2.5 py-2 transition-all duration-300 sm:px-3.5 sm:py-2 ${
            scrolled
              ? 'border-white/20 bg-[#0d0e13]/88 shadow-[0_16px_48px_rgba(0,0,0,0.75)] backdrop-blur-2xl'
              : 'border-white/15 bg-[#121319]/75 shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-2xl'
          }`}
        >
          {/* Warm Sunset/Amber Ambient Wash Inside Pill (matching reference) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          >
            <div className="absolute top-1/2 left-[42%] h-24 w-72 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#e58c3a]/16 via-[#d96d27]/12 to-transparent blur-2xl" />
          </div>

          {/* Left: Gradient Squircle Icon + Brand Name */}
          <Link
            to="/"
            onClick={() => {
              setOpenMenuPath(null);
              setHidden(false);
            }}
            className="group relative z-10 flex min-w-0 items-center gap-2.5 pl-1 sm:gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.07, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#ff7b8a] via-[#f59e42] to-[#ffd26f] shadow-[0_0_20px_rgba(245,158,66,0.4)] ring-1 ring-white/30 sm:h-10 sm:w-10"
            >
              <div className="flex items-end gap-[2.5px]">
                <span className="eq-bar h-2.5 w-[2.5px] rounded-full bg-[#09090c]" style={{ animationDelay: '0ms' }} />
                <span className="eq-bar h-4 w-[2.5px] rounded-full bg-[#09090c]" style={{ animationDelay: '220ms' }} />
                <span className="eq-bar h-3 w-[2.5px] rounded-full bg-[#09090c]" style={{ animationDelay: '420ms' }} />
              </div>
            </motion.div>

            <div className="min-w-0">
              <span className="font-display block truncate text-xs font-extrabold tracking-[0.05em] text-white transition-colors group-hover:text-[#fde68a] sm:text-sm lg:text-base">
                CALCUTTA NO - 1
              </span>
              <span className="font-tech block text-[7.5px] leading-tight tracking-[0.04em] text-white/65 uppercase sm:text-[8.5px] sm:tracking-[0.07em]">
                DIGITAL SOUND STAGE LIGHT TRUSS &amp; LED SCREEN
              </span>
            </div>
          </Link>

          {/* Right Group: Minimal Nav Links + Pill CTA (Desktop) */}
          <div className="relative z-10 hidden items-center gap-1 lg:gap-2 md:flex">
            <nav className="flex items-center gap-0.5 lg:gap-1" aria-label="Primary">
              {navLinks.map((link) => {
                const isActive =
                  link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white/95'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/15"
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <MagneticWrap strength={0.16} className="ml-1.5">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-gradient-to-r from-[#ea9a3d] via-[#d36726] to-[#a93b1a] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_0_24px_rgba(218,108,38,0.45)] transition hover:brightness-110"
              >
                Get Started
              </Link>
            </MagneticWrap>
          </div>

          {/* Mobile Menu Pill Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpenMenuPath((prev) => (prev === pathname ? null : pathname))}
            className="relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 text-[11px] font-bold tracking-wider text-white uppercase transition hover:border-[#ecc56d]/60 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span className="flex flex-col gap-1">
              <span
                className={`h-[1.5px] w-3.5 bg-[#f59e42] transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-3.5 bg-[#f59e42] transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[0.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </motion.button>
        </div>

        {/* Floating Rounded Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-drawer"
              variants={mobileDrawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="mt-2.5 overflow-hidden rounded-3xl border border-white/15 bg-[#0c0d13]/95 px-4 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="pt-3 pb-5">
                <nav className="divide-y divide-white/[0.07]" aria-label="Mobile">
                  {navLinks.map((link) => {
                    const isActive =
                      link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
                    return (
                      <motion.div key={link.to} variants={mobileNavItemVariants}>
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          onClick={() => setOpenMenuPath(null)}
                          className={`flex items-center justify-between py-3.5 transition ${
                            isActive ? 'text-[#f59e42]' : 'text-white/90'
                          }`}
                        >
                          <span className="font-display text-lg font-bold tracking-tight">
                            {link.label}
                          </span>
                          <span className="font-tech text-xs text-white/50">
                            {isActive ? 'ACTIVE' : '↗'}
                          </span>
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  variants={mobileNavItemVariants}
                  className="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-4"
                >
                  <a
                    href="tel:+918910905150"
                    className="flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] py-3 text-xs font-bold tracking-wider text-white uppercase active:scale-[0.98]"
                  >
                    Call 8910905150
                  </a>
                  <Link
                    to="/contact"
                    onClick={() => setOpenMenuPath(null)}
                    className="flex items-center justify-center rounded-full border border-white/25 bg-gradient-to-r from-[#ea9a3d] via-[#d36726] to-[#a93b1a] py-3 text-xs font-bold tracking-wider text-white uppercase shadow-[0_0_18px_rgba(218,108,38,0.4)] active:scale-[0.98]"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default NavbarComp;
