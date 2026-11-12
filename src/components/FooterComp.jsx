import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap, MOTION_EASE, SCROLL_REVEAL } from '../motion/motionConfig';

const quickLinks = [
  { num: '01', label: 'Home', to: '/' },
  { num: '02', label: 'About Us', to: '/about' },
  { num: '03', label: 'Services', to: '/services' },
  { num: '04', label: 'Gallery', to: '/gallery' },
  { num: '05', label: 'Contact & Map', to: '/contact' },
];

function FooterComp() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.ftr-col', { clearProps: 'all', opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.ftr-col', {
          y: SCROLL_REVEAL.yMobile,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            once: true,
          },
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10 bg-[#040406] text-[#b6bac3]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,197,109,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-16">
        {/* Left Side: Brand Name & Identity */}
        <div className="ftr-col min-w-0">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#ecc56d]/50 bg-[#0b0c10] font-display text-sm font-extrabold text-[#ecc56d] transition group-hover:border-[#ecc56d]">
              C1
            </div>
            <div>
              <h3 className="font-display text-lg font-extrabold tracking-wide text-[#f5f3ee] transition-colors group-hover:text-[#ecc56d]">
                CALCUTTA NO - 1
              </h3>
              <p className="font-tech text-[10px] tracking-[0.14em] text-[#ecc56d] uppercase">
                Digital Sound, Stage Light, Truss &amp; LED Screen
              </p>
            </div>
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-[#8e929b]">
            Proprietor: <span className="font-semibold text-[#f5f3ee]">Naren Rang</span>.
            Best quality sound, stage light, truss, LED screen, live stage show &amp;
            conference meeting instruments across Kolkata &amp; West Bengal.
          </p>
          <p className="font-tech mt-3 text-[10px] tracking-wider text-[#656973]">
            GSTIN: 19BNEPR3465A1Z0 // LICENCE: NOCL0PL56881408N
          </p>
        </div>

        {/* Middle Section: Navigation <li> list */}
        <div className="ftr-col md:mx-auto">
          <h4 className="font-tech text-[11px] font-bold tracking-[0.2em] text-[#ecc56d] uppercase">
            Navigation
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2.5 text-[#b6bac3] transition-all duration-200 hover:translate-x-1 hover:text-[#ecc56d]"
                >
                  <span className="font-tech text-[10px] text-[#ecc56d]/70">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Contact Details (Phone, Email, Address Location) */}
        <div className="ftr-col min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-tech text-[11px] font-bold tracking-[0.2em] text-[#ecc56d] uppercase">
              Contact Details
            </h4>
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              className="font-tech border border-white/15 bg-[#0b0c10] px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#ecc56d] uppercase transition hover:border-[#ecc56d] hover:bg-[#ecc56d] hover:text-[#050507]"
            >
              Top ↑
            </motion.button>
          </div>

          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
              <span className="font-tech shrink-0 text-xs font-semibold text-[#ecc56d]">
                Phone:
              </span>
              <div>
                <a
                  href="tel:+918910905150"
                  className="font-bold text-[#f5f3ee] transition hover:text-[#ecc56d]"
                >
                  +91 8910905150
                </a>
              </div>
            </li>

            <li className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
              <span className="font-tech shrink-0 text-xs font-semibold text-[#ecc56d]">
                Address:
              </span>
              <span className="break-words text-[#b6bac3]">
                1312 Garia Main Road, Charu Residency, Kolkata (Landmark - Kavi
                Nazrul Metro Station), South 24 Parganas, West Bengal, 700084
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="relative border-t border-white/10 bg-black/70 px-4 py-4 text-center text-xs text-[#8e929b] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} CALCUTTA NO - 1 Digital Sound, Stage
            Light, Truss &amp; LED Screen. All rights reserved.
          </p>
          <p>
            Designed &amp; Developed by
            <a
              href="https://www.teamdeoskolkata.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-red-700 transition-colors duration-300 ml-1"
            >
              Digital Exposure Online Services
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterComp;
