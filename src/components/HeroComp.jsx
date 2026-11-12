import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap, MOTION_EASE, SCROLL_REVEAL } from '../motion/motionConfig';
import MagneticWrap from './MagneticWrap';
import heroStageImg from '../assets/images/img1.jpeg';
import stageLightingImg from '../assets/images/stage-lighting-dmx-opt.jpg';
import trussLedWallImg from '../assets/images/truss-led-wall-opt.jpg';
import trussLedWallMobileImg from '../assets/images/truss-led-wall-mobile.jpg';
import heroStageVideo from '../assets/videos/vid1.mp4';

const disciplines = [
  {
    id: '01',
    name: 'Digital Sound Architecture',
    tag: 'Line Array • Soundcraft Consoles',
    summary:
      'High-headroom line array systems, sub-bass arrays, and digital FOH consoles tuned to deliver studio clarity across open grounds and auditoriums.',
    image: heroStageImg,
  },
  {
    id: '02',
    name: 'Stage Lighting & DMX',
    tag: 'Moving Heads • Beams • Wash',
    summary:
      'Choreographed beam arrays, RGBW washes, and synchronized DMX lighting cues crafted to elevate live music, theatre, and keynote stages.',
    image: stageLightingImg,
  },
  {
    id: '03',
    name: 'Box Truss & LED Video Walls',
    tag: 'Heavy Rigging • High-Res LED',
    summary:
      'Engineered aluminum box trusses paired with daylight-bright LED screens for seamless backdrops, live camera feeds, and sponsor visuals.',
    image: trussLedWallImg,
  },
];

const marqueeItems = [
  'DIGITAL SOUND SYSTEMS',
  'STAGE LIGHTING & DMX',
  'ALUMINUM BOX TRUSS',
  'HIGH-RES LED WALLS',
  'LIVE STAGE SHOWS',
  'CONFERENCE INSTRUMENTS',
  'KOLKATA • SOUTH 24 PARGANAS',
];

const workflowSteps = [
  {
    step: '01',
    title: 'Site Assessment & Planning',
    subtitle: 'Venue & Acoustic Mapping',
    desc: 'We evaluate audience capacity, indoor acoustics or open-ground dimensions, power routing, and stage sightlines to specify the ideal audio, truss, and LED layout.',
  },
  {
    step: '02',
    title: 'Transport & Safe Rigging',
    subtitle: 'Structural Truss Assembly',
    desc: 'Our crew arrives ahead of schedule to erect heavy-duty aluminum box trusses, secure overhead lighting bars, and mount high-resolution LED video panels safely.',
  },
  {
    step: '03',
    title: 'Soundcheck & DMX Tuning',
    subtitle: 'Console Calibration',
    desc: 'Every wireless microphone, monitor wedge, and line array cabinet is EQ-tuned on our Soundcraft digital console while DMX lighting cues are programmed to match your program.',
  },
  {
    step: '04',
    title: 'Live Show Operation',
    subtitle: 'Dedicated On-Site Crew',
    desc: 'Experienced sound engineers and lighting operators remain actively at the FOH desk throughout the event—ensuring crisp speech, balanced music, and smooth transitions.',
  },
];

const eventSolutions = [
  {
    code: 'LIVE',
    title: 'Concerts & Musical Nights',
    setup: 'Line Array PA • Subwoofers • Stage Monitors • Sharpy Beams • Box Truss • LED Wall',
    desc: 'High-impact sound pressure and dynamic stage lighting built for bands, vocalists, DJs, and large open-air audiences.',
  },
  {
    code: 'CORP',
    title: 'Corporate Conferences & AGMs',
    setup: 'Podium & Lapel Mics • Delegate Audio • Speech PA • HD LED Screen',
    desc: 'Zero-feedback speech reinforcement and crisp presentation displays engineered for seminars, conventions, and board meetings.',
  },
  {
    code: 'WEDD',
    title: 'Weddings & Sangeet Receptions',
    setup: 'Digital Sound • Warm Wash & Par Lights • Goal-Post Truss • Backdrop LED',
    desc: 'Elegant audio-visual atmospheres for sangeet performances, reception stages, live dhol/band setups, and family celebrations.',
  },
  {
    code: 'FEST',
    title: 'Durga Puja & Cultural Stages',
    setup: 'Full Stage Audio • DMX Lighting • Weather-Safe Truss • Cultural Monitoring',
    desc: 'Reliable multi-day festival setups handling classical recitals, drama, dance programs, and community announcements.',
  },
  {
    code: 'CAMPUS',
    title: 'College Fests & Convocations',
    setup: 'Concert Sound • Moving Head Rig • LED Visual Backdrop • Wireless Mics',
    desc: 'Versatile campus production packages transitioning effortlessly from formal daytime ceremonies to high-energy evening shows.',
  },
  {
    code: 'BRAND',
    title: 'Product Launches & Exhibitions',
    setup: 'Bright LED Video Wall • Crisp PA Sound • Focused Stage Wash • Rigging',
    desc: 'Sharp brand visibility, vibrant stage illumination, and dependable mic coverage for unveilings and trade showcases.',
  },
];

const technicalStandards = [
  {
    label: 'AUDIO PRECISION',
    title: 'Soundcraft Digital Mixing & Line Array Control',
    detail:
      'Multi-channel digital fader control, feedback suppression, and clean stage monitoring for vocalists, anchors, and live instruments.',
  },
  {
    label: 'POWER & BACKUP',
    title: 'Protected Console & Signal Stability',
    detail:
      'Dedicated UPS protection on critical digital mixing desks and tidy, insulated cabling across stage and FOH runs.',
  },
  {
    label: 'COMPLIANCE',
    title: 'GST Registered & Licensed Vendor',
    detail:
      'Transparent corporate & committee billing under GSTIN 19BNEPR3465A1Z0 and Trade Licence NOCL0PL56881408N.',
  },
];

function HeroComp() {
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || typeof IntersectionObserver === 'undefined') return undefined;
    if (navigator.connection?.saveData) return undefined;

    let isVisible = false;
    let readyToAutoPlay = false;

    const tryPlay = () => {
      if (isVisible && readyToAutoPlay) {
        if (videoEl.preload === 'none') {
          videoEl.preload = 'metadata';
        }
        videoEl.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          tryPlay();
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(videoEl);

    // Defer initial 17.7 MB MP4 streaming until after first paint & LCP settle
    const idleId =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(
            () => {
              readyToAutoPlay = true;
              tryPlay();
            },
            { timeout: 1100 }
          )
        : window.setTimeout(() => {
            readyToAutoPlay = true;
            tryPlay();
          }, 900);

    return () => {
      observer.disconnect();
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.hero-bg-layer',
            '.discipline-reveal',
            '.workflow-card',
            '.sector-card',
            '.standard-card',
            '.home-cta-box',
          ],
          { clearProps: 'all', opacity: 1, scale: 1, y: 0, yPercent: 0 }
        );
      });

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        // Subtle parallax on hero background only (already visible at opacity: 1 for instant LCP)
        gsap.to('.hero-bg-layer', {
          yPercent: 8,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        });

        gsap.from('.discipline-reveal', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '#disciplines-showcase',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.workflow-card', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.workflow-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.sector-card', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: 0.1,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.sectors-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.standard-card', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.standards-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.home-cta-box', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: 1.15,
          immediateRender: false,
          ease: MOTION_EASE.gsapDeep,
          scrollTrigger: {
            trigger: '.home-cta-box',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
        [
          '#disciplines-showcase .discipline-reveal',
          '.workflow-grid .workflow-card',
          '.sectors-grid .sector-card',
          '.standards-grid .standard-card',
          '.home-cta-box',
        ].forEach((selector) => {
          gsap.from(selector, {
            y: SCROLL_REVEAL.yMobile,
            opacity: 0,
            duration: SCROLL_REVEAL.durationMobile,
            stagger: SCROLL_REVEAL.staggerMobile,
            immediateRender: false,
            ease: MOTION_EASE.gsapPrimary,
            scrollTrigger: {
              trigger: selector,
              start: SCROLL_REVEAL.startMobile,
              once: true,
            },
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToShowcase = () => {
    const el = document.getElementById('disciplines-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={rootRef} className="relative bg-[#050507]">
      {/* 1. Cinematic Hero */}
      <section className="hero-section relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-18 lg:pt-16 lg:pb-22">
        {/* Responsive Concert Stage, Box Truss & LED Wall LCP Background */}
        <img
          src={trussLedWallImg}
          srcSet={`${trussLedWallMobileImg} 800w, ${trussLedWallImg} 1376w`}
          sizes="100vw"
          width={1376}
          height={768}
          fetchPriority="high"
          decoding="sync"
          loading="eager"
          alt=""
          aria-hidden="true"
          className="hero-bg-layer pointer-events-none absolute inset-0 h-full w-full transform-gpu object-cover object-[50%_28%] md:object-center"
        />

        {/* Dark Gradient Readability Overlay */}
        <div
          aria-hidden="true"
          className="hero-stage-scrim pointer-events-none absolute inset-0"
        />

        {/* Restrained Warm-Gold & Royal-Blue Stage Lighting Accents (GPU radial gradients, no filter blur) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/4 h-80 w-80 rounded-full sm:h-[440px] sm:w-[440px]"
          style={{
            background: 'radial-gradient(circle, rgba(236,197,109,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/5 -bottom-24 h-80 w-80 rounded-full sm:h-[440px] sm:w-[440px]"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-5">
            {/* 1. Brand Eyebrow & Headline (Visible immediately for instant FCP/LCP) */}
            <div className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <motion.p
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.35, ease: MOTION_EASE.cinematic }}
                className="font-editorial text-xl italic text-[#ecc56d] sm:text-2xl"
              >
                Precision Acoustics &amp; Visual Stagecraft
              </motion.p>

              <motion.h1
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.42, ease: MOTION_EASE.cinematic }}
                className="font-display mt-3 text-[2.35rem] leading-[0.98] font-extrabold tracking-tight text-[#f5f3ee] sm:text-6xl lg:text-[4.65rem]"
              >
                <span className="block">CALCUTTA</span>
                <span className="text-champagne block">NO - 1</span>
              </motion.h1>
            </div>

            {/* 2. Video Showcase (Directly Below CALCUTTA NO - 1 on Mobile, Right Column on Desktop) */}
            <motion.div
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, ease: MOTION_EASE.cinematic }}
              className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-end"
            >
              <div className="border border-white/15 bg-[#0b0c10]/95 p-2 shadow-2xl shadow-black sm:p-2.5">
                <div className="relative overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    src={heroStageVideo}
                    poster={heroStageImg}
                    width={640}
                    height={480}
                    muted
                    loop
                    playsInline
                    preload="none"
                    controls
                    className="aspect-[16/10] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/4.4]"
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-white/10 px-1 pt-2.5 text-[11px]">
                  <span className="font-tech text-[#8e929b]">
                    1312 GARIA MAIN ROAD
                  </span>
                  <Link
                    to="/gallery"
                    className="font-tech font-semibold text-[#ecc56d] hover:underline"
                  >
                    FULL ARCHIVE ↗
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* 3. Description, CTAs & Spec Bar */}
            <div className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-2">
              <motion.p
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: MOTION_EASE.cinematic }}
                className="max-w-xl text-sm leading-relaxed text-[#d2d5dc] sm:text-base lg:text-lg"
              >
                Bespoke digital sound engineering, dynamic stage lighting, safe
                heavy-duty truss rigging, high-resolution LED video walls, and
                conference meeting instruments for iconic events across Kolkata &amp;
                South 24 Parganas.
              </motion.p>

              <motion.div
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.42, delay: 0.06, ease: MOTION_EASE.cinematic }}
                className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4"
              >
                <MagneticWrap className="w-full sm:w-auto">
                  <Link
                    to="/contact"
                    className="group inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-[#fff6d6] via-[#ecc56d] to-[#b97d22] px-7 py-4 text-xs font-extrabold tracking-[0.18em] text-[#050507] uppercase shadow-lg shadow-[#ecc56d]/20 transition hover:brightness-110 sm:w-auto"
                  >
                    <span>Book Production</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </MagneticWrap>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/services"
                    className="inline-flex w-full items-center justify-center gap-3 border border-white/25 bg-[#050507]/50 px-7 py-4 text-xs font-bold tracking-[0.18em] text-[#f5f3ee] uppercase backdrop-blur-sm transition hover:border-[#ecc56d]/70 hover:text-[#ecc56d] sm:w-auto"
                  >
                    <span>Explore Disciplines</span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.42, delay: 0.1, ease: MOTION_EASE.cinematic }}
                className="mt-8 grid grid-cols-2 border border-white/15 bg-[#090a0f]/92 sm:mt-10 sm:grid-cols-4"
              >
                {[
                  { k: 'CONSOLE', v: 'Soundcraft Digital' },
                  { k: 'RIGGING', v: 'Box Truss & LED' },
                  { k: 'METRO', v: 'Kavi Nazrul' },
                  { k: 'DIRECT', v: '8910905150' },
                ].map((spec, idx) => (
                  <div
                    key={spec.k}
                    className={`p-3.5 sm:p-4 ${
                      idx !== 0 ? 'border-t border-white/10 sm:border-t-0 sm:border-l' : ''
                    } ${idx === 1 || idx === 3 ? 'border-l border-white/10' : ''}`}
                  >
                    <p className="font-tech text-[9px] tracking-[0.2em] text-[#8e929b] uppercase">
                      {spec.k}
                    </p>
                    <p className="mt-1 truncate text-xs font-bold text-[#f5f3ee] sm:text-sm">
                      {spec.v}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-10 flex justify-center lg:mt-12">
            <button
              type="button"
              onClick={scrollToShowcase}
              className="group inline-flex flex-col items-center gap-2 text-[#8e929b] transition hover:text-[#ecc56d]"
              aria-label="Scroll to production capabilities"
            >
              <span className="font-tech text-[10px] tracking-[0.24em] uppercase">
                Scroll to Explore
              </span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-7 w-4 items-start justify-center rounded-full border border-white/25 p-1 group-hover:border-[#ecc56d]"
              >
                <span className="h-1.5 w-1 rounded-full bg-[#ecc56d]" />
              </motion.span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Kinetic Marquee */}
      <div className="overflow-hidden border-y border-white/10 bg-[#090a0f] py-3.5">
        <div className="animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center">
              <span className="font-display px-6 text-xs font-bold tracking-[0.22em] text-[#f5f3ee]/85 uppercase sm:text-sm">
                {item}
              </span>
              <span className="text-[#ecc56d]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Equipment & Capability Showcase */}
      <section
        id="disciplines-showcase"
        className="border-b border-white/10 bg-[#050507] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="discipline-reveal flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-tech text-[11px] tracking-[0.22em] text-[#ecc56d] uppercase">
                SELECTED CAPABILITIES
              </span>
              <h2 className="font-display mt-2 text-2xl font-extrabold text-[#f5f3ee] sm:text-4xl">
                Engineered for Unforgettable Stages
              </h2>
            </div>
            <Link
              to="/about"
              className="font-tech text-xs tracking-widest text-[#ecc56d] uppercase transition hover:text-white"
            >
              About Calcutta No-1 →
            </Link>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="discipline-reveal divide-y divide-white/10 border-y border-white/10 lg:col-span-7">
              {disciplines.map((item, idx) => {
                const isSelected = activeDiscipline === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveDiscipline(idx)}
                    onMouseEnter={() => setActiveDiscipline(idx)}
                    className={`group flex w-full flex-col gap-2 py-6 text-left transition-colors sm:px-4 ${
                      isSelected ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-tech text-xs transition-colors ${
                            isSelected ? 'text-[#ecc56d]' : 'text-[#8e929b]'
                          }`}
                        >
                          {item.id}
                        </span>
                        <h3
                          className={`font-display text-xl font-bold transition-colors sm:text-2xl ${
                            isSelected
                              ? 'text-[#fff6d6]'
                              : 'text-[#f5f3ee] group-hover:text-[#ecc56d]'
                          }`}
                        >
                          {item.name}
                        </h3>
                      </div>
                      <span
                        className={`font-tech text-xs transition-colors ${
                          isSelected ? 'text-[#ecc56d]' : 'text-[#8e929b]'
                        }`}
                      >
                        {isSelected ? 'ACTIVE' : 'VIEW'}
                      </span>
                    </div>

                    <p className="font-tech pl-8 text-[11px] tracking-wider text-[#ecc56d]/80 uppercase">
                      {item.tag}
                    </p>

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: MOTION_EASE.cinematic }}
                          className="overflow-hidden pl-8 pt-1 text-sm leading-relaxed text-[#b6bac3]"
                        >
                          {item.summary}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            <div className="discipline-reveal lg:col-span-5">
              <div className="overflow-hidden border border-white/15 bg-[#0b0c10] p-2.5">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#050507]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={disciplines[activeDiscipline].id}
                      src={disciplines[activeDiscipline].image}
                      alt={disciplines[activeDiscipline].name}
                      width={1376}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.42, ease: MOTION_EASE.cinematic }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507]/90 via-transparent to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-2">
                    <div>
                      <span className="font-tech text-[10px] tracking-[0.2em] text-[#ecc56d] uppercase">
                        DISCIPLINE {disciplines[activeDiscipline].id}
                      </span>
                      <p className="font-display text-lg font-bold text-white">
                        {disciplines[activeDiscipline].name}
                      </p>
                    </div>
                    <Link
                      to="/services"
                      className="shrink-0 border border-[#ecc56d]/60 bg-[#050507]/85 px-3 py-1.5 font-tech text-[10px] font-bold tracking-widest text-[#fff6d6] uppercase backdrop-blur-sm transition hover:bg-[#ecc56d] hover:text-[#050507]"
                    >
                      Details ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Event Production Solutions Grid */}
      <section className="cv-auto atelier-grid border-b border-white/10 bg-[#08090e] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-tech text-[11px] tracking-[0.22em] text-[#ecc56d] uppercase">
                TAILORED EVENT FORMATS
              </span>
              <h2 className="font-display mt-2 text-2xl font-extrabold text-[#f5f3ee] sm:text-4xl">
                Complete Production for Every Occasion
              </h2>
            </div>
            <Link
              to="/services"
              className="font-tech text-xs tracking-widest text-[#ecc56d] uppercase transition hover:text-white"
            >
              View All Packages →
            </Link>
          </div>

          <div className="sectors-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eventSolutions.map((sector) => (
              <motion.article
                key={sector.code}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: MOTION_EASE.cinematic }}
                className="sector-card flex flex-col justify-between border border-white/10 bg-[#0a0b10] p-6 transition-colors duration-300 hover:border-[#ecc56d]/55"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-tech text-[10px] font-bold tracking-[0.22em] text-[#ecc56d] uppercase">
                      SECTOR // {sector.code}
                    </span>
                    <span className="text-xs text-[#ecc56d]">✦</span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-bold text-[#f5f3ee]">
                    {sector.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#b6bac3]">
                    {sector.desc}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3.5">
                  <p className="font-tech text-[10px] leading-relaxed tracking-wider text-[#8e929b] uppercase">
                    {sector.setup}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 4-Step Execution Workflow */}
      <section className="cv-auto border-b border-white/10 bg-[#050507] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="font-tech text-[11px] tracking-[0.22em] text-[#ecc56d] uppercase">
              PRODUCTION METHODOLOGY
            </span>
            <h2 className="font-display mt-2 text-2xl font-extrabold text-[#f5f3ee] sm:text-4xl">
              From Venue Blueprint to Curtain Call
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#b6bac3] sm:text-base">
              Every Calcutta No - 1 setup follows a disciplined four-phase field
              process so event organizers experience zero technical surprises.
            </p>
          </div>

          <div className="workflow-grid mt-10 grid border border-white/10 bg-[#090a0f] sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((item, idx) => (
              <div
                key={item.step}
                className={`workflow-card p-6 ${
                  idx > 0 ? 'border-t border-white/10 lg:border-t-0 lg:border-l' : ''
                } ${idx === 1 || idx === 3 ? 'sm:border-l' : ''} ${
                  idx === 1 ? 'sm:border-t-0' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-tech text-sm font-bold text-[#ecc56d]">
                    {item.step}
                  </span>
                  <span className="font-tech text-[10px] tracking-widest text-[#8e929b] uppercase">
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-[#f5f3ee]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#8e929b]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Readiness & Closing Production CTA */}
      <section className="cv-auto atelier-grid bg-[#07080d] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="standards-grid grid gap-6 md:grid-cols-3">
            {technicalStandards.map((item) => (
              <div
                key={item.label}
                className="standard-card border border-white/10 bg-[#0a0b10] p-6"
              >
                <span className="font-tech text-[10px] tracking-[0.22em] text-[#ecc56d] uppercase">
                  {item.label}
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-[#f5f3ee]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b6bac3]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="home-cta-box mt-12 flex flex-col items-start justify-between gap-6 border border-[#ecc56d]/35 bg-gradient-to-br from-[#12141e] via-[#0b0c12] to-[#07080c] p-6 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="font-tech text-[11px] tracking-[0.22em] text-[#ecc56d] uppercase">
                READY FOR YOUR NEXT EVENT
              </span>
              <h2 className="font-display mt-2 text-2xl font-extrabold text-[#f5f3ee] sm:text-3xl">
                Planning a Concert, Conference, Wedding, or Cultural Stage?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#b6bac3] sm:text-base">
                Speak directly with <span className="font-semibold text-white">Naren Rang</span>{' '}
                or dispatch your event date and venue details via our instant WhatsApp
                enquiry desk.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <MagneticWrap className="w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center bg-gradient-to-r from-[#fff6d6] via-[#ecc56d] to-[#b97d22] px-6 py-3.5 text-xs font-extrabold tracking-[0.18em] text-[#050507] uppercase transition hover:brightness-110 sm:w-auto"
                >
                  Enquire &amp; Map →
                </Link>
              </MagneticWrap>
              <a
                href="tel:+918910905150"
                className="inline-flex w-full items-center justify-center border border-white/20 bg-white/[0.03] px-6 py-3.5 text-xs font-bold tracking-[0.18em] text-[#f5f3ee] uppercase transition hover:border-[#ecc56d] sm:w-auto"
              >
                Call 8910905150
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroComp;
