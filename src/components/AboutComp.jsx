import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { gsap, MOTION_EASE, SCROLL_REVEAL } from '../motion/motionConfig';
import MagneticWrap from './MagneticWrap';
import liveConcertImg from '../assets/images/live-concert-stage-opt.jpg';
import storefrontImg from '../assets/images/img3.jpeg';

const aboutSlides = [
  {
    src: storefrontImg,
    alt: 'Calcutta No-1 storefront signboard at 1312 Garia Main Road',
    leftLabel: 'OFFICE HUB',
    rightLabel: 'CHARU RESIDENCY',
  },
  {
    src: liveConcertImg,
    alt: 'Live concert stage with aluminum box truss, line array speakers, and LED video wall',
    leftLabel: 'LIVE PRODUCTION',
    rightLabel: 'CONCERT STAGE',
  },
];

const credentials = [
  { label: 'PROPRIETOR', value: 'Naren Rang' },
  { label: 'GSTIN', value: '19BNEPR3465A1Z0' },
  { label: 'LICENCE NO.', value: 'NOCL0PL56881408N' },
  { label: 'BASE', value: '1312 Garia Main Road, Kolkata - 700084' },
];

const pillars = [
  {
    num: '01',
    title: 'Crystal-Clear Digital Audio',
    desc: 'Soundcraft digital consoles, line arrays, and UHF wireless microphones calibrated for zero feedback and full coverage.',
  },
  {
    num: '02',
    title: 'Certified Truss Rigging',
    desc: 'Heavy-duty aluminum box trusses assembled by trained riggers with strict load balance and outdoor wind safety.',
  },
  {
    num: '03',
    title: 'On-Site Crew & Engineers',
    desc: 'Dedicated audio technicians and DMX lighting operators stay on the console from setup to curtain close.',
  },
  {
    num: '04',
    title: 'End-to-End Reliability',
    desc: 'Trusted across Kolkata and South 24 Parganas for corporate seminars, weddings, puja festivals, and live concerts.',
  },
];

const equipmentPhilosophy = [
  {
    code: 'AUDIO & FOH',
    title: 'Acoustic Precision & Console Discipline',
    points: [
      'Soundcraft Si Impact digital mixing workflow for multi-band & keynote routing',
      'Clean stage monitor mixes tailored for vocalists, anchors, and classical performers',
      'Protected UPS power backup at the FOH desk to prevent mid-show dropouts',
      'Dedicated frequency coordination for handheld, podium, and lapel microphones',
    ],
  },
  {
    code: 'STAGE & RIGGING',
    title: 'Structural Safety & Visual Rigging',
    points: [
      'Heavy-duty aluminum box trusses and goal-post spans engineered for safe overhead loads',
      'DMX-controlled moving heads, LED par washes, and theatrical front-fill lighting',
      'High-brightness indoor and outdoor LED video walls for clear audience sightlines',
      'Organized stage cabling and weather-conscious outdoor rigging practices',
    ],
  },
];

const serviceZones = [
  {
    zone: 'South Kolkata & Garia Belt',
    areas: 'Garia, Narendrapur, Kamalgazi, Jadavpur, Tollygunge, Ballygunge, Behala, EM Bypass',
  },
  {
    zone: 'Central, North & IT Hubs',
    areas: 'Park Street, Esplanade, Salt Lake Sector V, New Town, Dum Dum, Howrah',
  },
  {
    zone: 'South 24 Parganas & Beyond',
    areas: 'Sonarpur, Baruipur, Rajpur, Diamond Harbour & Institutional Venues across West Bengal',
  },
];

function AboutComp() {
  const [mobileSlide, setMobileSlide] = useState(0);
  const prefersReduced = useReducedMotion();
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return undefined;

    const mobileQuery = window.matchMedia('(max-width: 639px)');
    let timerId = null;

    const startTimer = () => {
      if (timerId) window.clearInterval(timerId);
      if (mobileQuery.matches) {
        timerId = window.setInterval(() => {
          setMobileSlide((prev) => (prev + 1) % aboutSlides.length);
        }, 3000);
      }
    };

    startTimer();
    mobileQuery.addEventListener('change', startTimer);

    return () => {
      if (timerId) window.clearInterval(timerId);
      mobileQuery.removeEventListener('change', startTimer);
    };
  }, [prefersReduced]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.about-header',
            '.about-img-mask',
            '.about-copy-item',
            '.about-cred-item',
            '.about-pillar-item',
            '.about-phil-card',
            '.about-zone-card',
          ],
          { clearProps: 'all', opacity: 1, y: 0 }
        );
      });

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        gsap.from('.about-header', {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: MOTION_EASE.gsapDeep,
        });

        gsap.fromTo(
          '.about-img-mask',
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            stagger: 0.16,
            immediateRender: false,
            ease: MOTION_EASE.gsapDeep,
            scrollTrigger: {
              trigger: '.about-visuals',
              start: SCROLL_REVEAL.startDesktop,
              once: true,
            },
          }
        );

        gsap.to('.about-img-offset', {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-visuals',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.from('.about-copy-item', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: 0.1,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.about-copy-col',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.about-cred-item', {
          y: 22,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.about-cred-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.about-pillar-item', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.about-pillars-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.about-phil-card', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.about-phil-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.about-zone-card', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.about-zones-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
        gsap.from('.about-header', {
          y: 18,
          opacity: 0,
          duration: 0.7,
          ease: MOTION_EASE.gsapPrimary,
        });

        ['.about-img-mask', '.about-copy-item', '.about-pillar-item', '.about-phil-card', '.about-zone-card'].forEach(
          (sel) => {
            gsap.from(sel, {
              y: SCROLL_REVEAL.yMobile,
              opacity: 0,
              duration: SCROLL_REVEAL.durationMobile,
              stagger: SCROLL_REVEAL.staggerMobile,
              immediateRender: false,
              ease: MOTION_EASE.gsapPrimary,
              scrollTrigger: {
                trigger: sel,
                start: SCROLL_REVEAL.startMobile,
                once: true,
              },
            });
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="atelier-grid bg-[#050507] py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="about-header border-b border-white/10 pb-8">
          <div className="font-tech flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#8e929b] uppercase">
            <Link to="/" className="hover:text-[#ecc56d]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#ecc56d]">About</span>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 className="font-display text-3xl leading-[1.02] font-extrabold tracking-tight text-[#f5f3ee] sm:text-5xl lg:col-span-8 lg:text-6xl">
              Crafted Sound &amp; Stage Presence{' '}
              <span className="font-editorial font-normal italic text-[#ecc56d]">
                Without Compromise.
              </span>
            </h1>
            <p className="text-sm leading-relaxed text-[#b6bac3] lg:col-span-4">
              Led by <span className="font-bold text-white">Naren Rang</span>,
              Calcutta No - 1 delivers certified production architecture from Garia
              Main Road to stages across West Bengal.
            </p>
          </div>
        </div>

        {/* Visual Editorial Grid */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Mobile-Only Auto-Sliding Carousel (3s interval) */}
          <div className="sm:hidden">
            <div className="overflow-hidden border border-white/10 bg-[#0b0c10] p-2.5">
              <div className="relative h-64 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={aboutSlides[mobileSlide].leftLabel}
                    src={aboutSlides[mobileSlide].src}
                    alt={aboutSlides[mobileSlide].alt}
                    width={1280}
                    height={960}
                    decoding="async"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.45, ease: MOTION_EASE.cinematic }}
                    className="h-64 w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2.5 font-tech text-[10px] tracking-wider text-[#8e929b] uppercase">
                <span>{aboutSlides[mobileSlide].leftLabel}</span>
                <span className="text-[#ecc56d]">
                  {aboutSlides[mobileSlide].rightLabel}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              {aboutSlides.map((slide, idx) => (
                <button
                  key={slide.leftLabel}
                  type="button"
                  onClick={() => setMobileSlide(idx)}
                  aria-label={`Show ${slide.leftLabel}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileSlide === idx
                      ? 'w-7 bg-[#ecc56d]'
                      : 'w-2.5 bg-white/25 hover:bg-white/45'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tablet & Desktop 2-Column Editorial Grid (Unchanged) */}
          <div className="about-visuals hidden gap-5 sm:grid sm:grid-cols-2 lg:col-span-6">
            <figure className="about-img-mask border border-white/10 bg-[#0b0c10] p-2.5">
              <div className="overflow-hidden">
                <img
                  src={storefrontImg}
                  alt="Calcutta No-1 storefront signboard at 1312 Garia Main Road"
                  width={1280}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover transition duration-700 hover:scale-105 sm:h-72"
                />
              </div>
              <figcaption className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2.5 font-tech text-[10px] tracking-wider text-[#8e929b] uppercase">
                <span>OFFICE HUB</span>
                <span className="text-[#ecc56d]">CHARU RESIDENCY</span>
              </figcaption>
            </figure>

            <figure className="about-img-mask about-img-offset border border-white/10 bg-[#0b0c10] p-2.5 sm:mt-10">
              <div className="overflow-hidden">
                <img
                  src={liveConcertImg}
                  alt="Live concert stage with aluminum box truss, line array speakers, and LED video wall"
                  width={1376}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover transition duration-700 hover:scale-105 sm:h-72"
                />
              </div>
              <figcaption className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2.5 font-tech text-[10px] tracking-wider text-[#8e929b] uppercase">
                <span>LIVE PRODUCTION</span>
                <span className="text-[#ecc56d]">CONCERT STAGE</span>
              </figcaption>
            </figure>
          </div>

          <div className="about-copy-col lg:col-span-6">
            <span className="about-copy-item font-tech block text-[11px] tracking-[0.22em] text-[#ecc56d] uppercase">
              01 // WHO WE ARE
            </span>
            <h2 className="about-copy-item font-display mt-3 text-2xl font-extrabold text-[#f5f3ee] sm:text-3xl">
              Complete Audio, Stage Lighting, Truss &amp; LED Screen Production
            </h2>
            <p className="about-copy-item mt-4 text-sm leading-relaxed text-[#b6bac3] sm:text-base">
              <span className="font-bold text-white">
                CALCUTTA NO - 1 DIGITAL SOUND, STAGE LIGHT, TRUSS &amp; LED SCREEN
              </span>{' '}
              is a full-service event technology partner based at{' '}
              <span className="text-white">
                1312 Garia Main Road, Charu Residency (Landmark: Kavi Nazrul Metro
                Station), South 24 Parganas, Kolkata - 700084
              </span>
              .
            </p>
            <p className="about-copy-item mt-3 text-sm leading-relaxed text-[#b6bac3] sm:text-base">
              Whether you are hosting an intimate executive conference, a grand
              wedding reception, a Durga Puja cultural showcase, or an open-air live
              concert, our team handles transport, rigging, soundcheck, and live
              operation seamlessly—giving committees, planners, and corporate teams
              single-vendor accountability.
            </p>

            {/* Credentials Ledger */}
            <dl className="about-cred-grid mt-8 grid grid-cols-1 border border-white/10 bg-[#090a0f] sm:grid-cols-2">
              {credentials.map((item, idx) => (
                <div
                  key={item.label}
                  className={`about-cred-item p-4 ${
                    idx >= 2 ? 'border-t border-white/10' : ''
                  } ${idx % 2 === 1 ? 'border-t border-white/10 sm:border-t-0 sm:border-l' : ''}`}
                >
                  <dt className="font-tech text-[10px] tracking-[0.2em] text-[#ecc56d] uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 break-words text-sm font-bold text-[#f5f3ee]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="about-copy-item mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticWrap className="w-full sm:w-auto">
                <Link
                  to="/services"
                  className="inline-flex w-full items-center justify-center bg-gradient-to-r from-[#fff6d6] via-[#ecc56d] to-[#b97d22] px-6 py-3.5 text-xs font-extrabold tracking-[0.18em] text-[#050507] uppercase transition hover:brightness-110 sm:w-auto"
                >
                  Explore Services →
                </Link>
              </MagneticWrap>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center border border-white/20 px-6 py-3.5 text-xs font-bold tracking-[0.18em] text-[#f5f3ee] uppercase transition hover:border-[#ecc56d] sm:w-auto"
                >
                  Speak With Naren Rang
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 4 Editorial Pillars */}
        <div className="about-pillars-grid mt-16 grid border border-white/10 bg-[#090a0f] sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.025)' }}
              transition={{ duration: 0.25 }}
              className={`about-pillar-item p-6 ${
                idx > 0 ? 'border-t border-white/10 lg:border-t-0 lg:border-l' : ''
              } ${idx === 1 || idx === 3 ? 'sm:border-l' : ''} ${
                idx === 1 ? 'sm:border-t-0' : ''
              }`}
            >
              <span className="font-tech text-xs font-bold text-[#ecc56d]">
                {pillar.num}
              </span>
              <h3 className="font-display mt-3 text-lg font-bold text-[#f5f3ee]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8e929b]">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Equipment Philosophy & Operational Discipline */}
        <div className="mt-16">
          <div className="border-b border-white/10 pb-5">
            <span className="font-tech text-[11px] tracking-[0.22em] text-[#ecc56d] uppercase">
              02 // TECHNICAL PHILOSOPHY
            </span>
            <h2 className="font-display mt-2 text-2xl font-extrabold text-[#f5f3ee] sm:text-3xl">
              How We Engineer Every Production
            </h2>
          </div>

          <div className="about-phil-grid mt-8 grid gap-6 lg:grid-cols-2">
            {equipmentPhilosophy.map((block) => (
              <div
                key={block.code}
                className="about-phil-card border border-white/10 bg-[#0a0b10] p-6 sm:p-8"
              >
                <span className="font-tech text-[10px] tracking-[0.22em] text-[#ecc56d] uppercase">
                  {block.code}
                </span>
                <h3 className="font-display mt-2 text-xl font-bold text-[#f5f3ee]">
                  {block.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#b6bac3]">
                  {block.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#ecc56d]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Coverage */}
        <div className="mt-16 border border-white/10 bg-[#090a0f] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
            <div>
              <span className="font-tech text-[10px] tracking-[0.22em] text-[#ecc56d] uppercase">
                03 // SERVICE COVERAGE
              </span>
              <h2 className="font-display mt-1 text-xl font-bold text-[#f5f3ee] sm:text-2xl">
                Dispatching From Garia Across Kolkata &amp; West Bengal
              </h2>
            </div>
            <Link
              to="/gallery"
              className="font-tech text-xs tracking-wider text-[#ecc56d] uppercase hover:text-white"
            >
              View Live Setups ↗
            </Link>
          </div>

          <div className="about-zones-grid mt-6 grid gap-5 md:grid-cols-3">
            {serviceZones.map((item) => (
              <div
                key={item.zone}
                className="about-zone-card border border-white/[0.08] bg-[#050507] p-5"
              >
                <h3 className="font-display text-base font-bold text-[#fff6d6]">
                  {item.zone}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#8e929b] sm:text-sm">
                  {item.areas}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutComp;
