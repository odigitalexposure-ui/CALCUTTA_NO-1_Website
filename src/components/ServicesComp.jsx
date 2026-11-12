import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollTrigger, gsap, MOTION_EASE, SCROLL_REVEAL } from '../motion/motionConfig';
import MagneticWrap from './MagneticWrap';

const servicesList = [
  {
    num: '01',
    title: 'Digital Sound System',
    category: 'Acoustic Engineering',
    description:
      'High-output line array speakers, deep sub-bass cabinets, Soundcraft digital consoles, and interference-free wireless microphones tuned for live music and speech.',
    specs: ['Line Array & Subwoofers', 'Soundcraft Digital Mixing', 'UHF Wireless Microphones'],
    idealFor: 'Concerts, Cultural Programs, Weddings & Outdoor Grounds',
  },
  {
    num: '02',
    title: 'Professional Stage Lighting',
    category: 'DMX & Visual FX',
    description:
      'Sharpy moving heads, RGBW LED par cans, warm theatrical front washes, and DMX-programmed light shows designed to transform any stage.',
    specs: ['Moving Head Beams', 'RGBW LED Wash & Par', 'Live DMX Console Control'],
    idealFor: 'Live Stage Shows, Fashion/Award Nights & Receptions',
  },
  {
    num: '03',
    title: 'Strong & Safe Truss Setup',
    category: 'Structural Rigging',
    description:
      'Heavy-duty aluminum box trusses, goal-post frames, and full overhead stage rigs engineered with strict load safety for indoor and open-air grounds.',
    specs: ['Aluminum Box Truss', 'Goal-Post & Stage Rigs', 'Weather-Safe Stability'],
    idealFor: 'Open-Air Festivals, Durga Puja Pandals & Concert Stages',
  },
  {
    num: '04',
    title: 'High-Resolution LED Screen',
    category: 'LED Video Walls',
    description:
      'Ultra-bright seamless LED video walls for live camera relay, stage motion graphics, corporate decks, and festival branding.',
    specs: ['Indoor & Outdoor Panels', 'Live Camera Feed Ready', 'High Contrast Brightness'],
    idealFor: 'Corporate Keynotes, Brand Launches & Live Stage Backdrops',
  },
  {
    num: '05',
    title: 'Live Stage Show Production',
    category: 'Full Turnkey Events',
    description:
      'Integrated sound, lighting, truss, and stage monitoring packages for musical concerts, Durga Puja cultural nights, college fests, and weddings.',
    specs: ['Stage Floor Monitors', 'Full Audio-Visual Sync', 'On-Site Tech Engineers'],
    idealFor: 'Bands, College Fests, Musical Nights & Puja Committees',
  },
  {
    num: '06',
    title: 'Conference & Meeting Instruments',
    category: 'Corporate & Seminars',
    description:
      'Gooseneck podium microphones, lapel/collar mics, delegate discussion systems, and crisp display setups for conferences and AGMs.',
    specs: ['Podium & Lapel Mics', 'Delegate Audio Units', 'Seminar Projection'],
    idealFor: 'Board Meetings, Seminars, Panel Discussions & Conventions',
  },
];

const packageTiers = [
  {
    tier: 'TIER 01',
    name: 'Conference & Seminar Rig',
    audience: 'Indoor Auditoriums • Boardrooms • Panels',
    includes: [
      'Digital Mixer & Speech-Tuned PA Speakers',
      'Gooseneck Podium, Handheld & Collar Mics',
      'Delegate Audio & Conference Meeting Instruments',
      'Presentation LED Screen / Projection Support',
      'Dedicated On-Site Sound Engineer',
    ],
  },
  {
    tier: 'TIER 02',
    name: 'Wedding, Sangeet & Cultural Stage',
    audience: 'Banquets • Lawns • Reception Stages',
    includes: [
      'High-Clarity Digital Sound & Sub-Bass Setup',
      'Warm Stage Wash, LED Par Cans & Moving Heads',
      'Goal-Post / Backdrop Aluminum Truss Rig',
      'High-Resolution LED Screen for Visuals',
      'Audio & Lighting Console Crew Included',
    ],
  },
  {
    tier: 'TIER 03',
    name: 'Grand Concert & Puja Festival Setup',
    audience: 'Open Grounds • College Fests • Pandal Stages',
    includes: [
      'Full Line Array PA & Dual Sub-Bass Arrays',
      'Soundcraft Multi-Channel Digital FOH + Stage Monitors',
      'Full Overhead Box Truss & Sharpy DMX Light Show',
      'Large-Format Outdoor/Indoor LED Video Wall',
      'Multi-Technician Production & Rigging Team',
    ],
  },
];

const eventSectors = [
  'Live Concerts & Musical Nights',
  'Corporate Conferences & AGMs',
  'Weddings & Sangeet Receptions',
  'Durga Puja & Cultural Stages',
  'College Fests & Convocations',
  'Exhibitions & Brand Launches',
];

const serviceFaqs = [
  {
    q: 'Can we bundle Sound, Stage Light, Truss, and LED Screen together?',
    a: 'Yes. Most clients book our integrated turnkey packages so audio, lighting, structural trussing, and LED visuals are coordinated by one experienced crew with zero vendor friction.',
  },
  {
    q: 'Do trained sound engineers and lighting operators stay during the event?',
    a: 'Yes. Every setup includes on-site technical operators who handle load-in, soundcheck, DMX programming, and live monitoring until your program concludes.',
  },
  {
    q: 'Do you provide conference and corporate meeting instruments?',
    a: 'Yes. We supply gooseneck podium microphones, lapel/collar wireless mics, delegate audio setups, and high-resolution LED displays for seminars, AGMs, and corporate summits.',
  },
  {
    q: 'How far in advance should we reserve dates for peak season?',
    a: 'For Durga Puja, winter weddings, and college fest seasons, we recommend confirming 2 to 4 weeks ahead via WhatsApp (8910905150) or an office visit at Garia Main Road.',
  },
];

function ServicesComp() {
  const [expandedNum, setExpandedNum] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(['.srv-header', '.srv-card', '.srv-tier', '.srv-sector'], {
          clearProps: 'all',
          opacity: 1,
          y: 0,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        const tl = gsap.timeline({ defaults: { ease: MOTION_EASE.gsapDeep } });

        tl.from('.srv-header', {
          y: 22,
          opacity: 0,
          duration: 0.75,
        }).from(
          '.srv-card',
          {
            y: SCROLL_REVEAL.yDesktop,
            opacity: 0,
            duration: SCROLL_REVEAL.durationDesktop,
            stagger: 0.1,
            ease: MOTION_EASE.gsapPrimary,
          },
          '-=0.35'
        );

        gsap.from('.srv-tier', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.srv-tiers-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });

        gsap.from('.srv-sector', {
          y: 22,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.srv-sectors-box',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
        const tl = gsap.timeline({ defaults: { ease: MOTION_EASE.gsapPrimary } });
        tl.from('.srv-header', {
          y: 16,
          opacity: 0,
          duration: 0.55,
        }).from(
          '.srv-card',
          {
            y: SCROLL_REVEAL.yMobile,
            opacity: 0,
            duration: SCROLL_REVEAL.durationMobile,
            stagger: SCROLL_REVEAL.staggerMobile,
          },
          '-=0.25'
        );

        gsap.from('.srv-tier', {
          y: SCROLL_REVEAL.yMobile,
          opacity: 0,
          duration: SCROLL_REVEAL.durationMobile,
          stagger: SCROLL_REVEAL.staggerMobile,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.srv-tiers-grid',
            start: SCROLL_REVEAL.startMobile,
            once: true,
          },
        });
      });
    }, rootRef);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const toggleExpand = (num) => {
    setExpandedNum((prev) => (prev === num ? null : num));
  };

  return (
    <section ref={rootRef} className="atelier-grid bg-[#050507] py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="srv-header border-b border-white/10 pb-6">
          <div className="font-tech flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#8e929b] uppercase">
            <Link to="/" className="hover:text-[#ecc56d]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#ecc56d]">Services</span>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="font-display max-w-3xl text-3xl leading-[1.02] font-extrabold tracking-tight text-[#f5f3ee] sm:text-5xl lg:text-6xl">
              Production <span className="text-champagne">Disciplines</span> &amp; Gear
            </h1>
            <MagneticWrap className="w-full md:w-auto">
              <Link
                to="/contact"
                className="inline-flex w-full shrink-0 items-center justify-center bg-gradient-to-r from-[#fff6d6] via-[#ecc56d] to-[#b97d22] px-6 py-3.5 text-xs font-extrabold tracking-[0.18em] text-[#050507] uppercase transition hover:brightness-110 md:w-auto"
              >
                Request Custom Quote →
              </Link>
            </MagneticWrap>
          </div>
        </div>

        {/* Architectural Grid of Interactive Service Cards */}
        <div className="srv-grid mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => {
            const isExpanded = expandedNum === service.num;
            return (
              <motion.article
                key={service.num}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: MOTION_EASE.cinematic }}
                className="srv-card group flex flex-col justify-between border border-white/10 bg-[#0a0b10] p-6 transition-colors duration-300 hover:border-[#ecc56d]/60 hover:bg-[#0e1017]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-tech text-xs font-bold tracking-widest text-[#ecc56d]">
                      {service.num}
                    </span>
                    <span className="font-tech text-[10px] tracking-[0.18em] text-[#8e929b] uppercase">
                      {service.category}
                    </span>
                  </div>

                  <h2 className="font-display mt-5 text-xl font-bold text-[#f5f3ee] transition-colors group-hover:text-[#fff6d6] sm:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#b6bac3]">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 font-tech text-[11px] text-[#8e929b]">
                    {service.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2.5">
                        <span className="h-1 w-1 bg-[#ecc56d] transition-transform group-hover:scale-150" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(service.num)}
                      aria-expanded={isExpanded}
                      className="font-tech inline-flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#ecc56d]/90 uppercase transition hover:text-white"
                    >
                      <span>{isExpanded ? 'Hide Applications' : 'Ideal Applications'}</span>
                      <span
                        className={`inline-block transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: MOTION_EASE.cinematic }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2 border-l-2 border-[#ecc56d]/50 pl-3 text-xs leading-relaxed text-[#b6bac3]">
                            {service.idealFor}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <a
                    href={`https://wa.me/918910905150?text=${encodeURIComponent(
                      `Hello Calcutta No-1, I would like to enquire about ${service.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-tech text-[11px] font-bold tracking-wider text-[#ecc56d] uppercase transition hover:text-white"
                  >
                    WhatsApp Quote ↗
                  </a>
                  <Link
                    to="/contact"
                    className="font-tech text-[11px] tracking-wider text-[#8e929b] uppercase transition hover:text-[#f5f3ee]"
                  >
                    Book Form →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Turnkey Production Packages */}
        <div className="mt-12">
          <div className="border-b border-white/10 pb-5">
            <span className="font-tech text-[11px] tracking-[0.22em] text-[#ecc56d] uppercase">
              TURNKEY CONFIGURATIONS
            </span>
            <h2 className="font-display mt-2 text-2xl font-extrabold text-[#f5f3ee] sm:text-3xl">
              Scalable Production Packages by Venue Size
            </h2>
          </div>

          <div className="srv-tiers-grid mt-6 grid gap-6 lg:grid-cols-3">
            {packageTiers.map((pkg) => (
              <div
                key={pkg.tier}
                className="srv-tier flex flex-col justify-between border border-white/10 bg-[#0a0b10] p-6 transition hover:border-[#ecc56d]/50"
              >
                <div>
                  <span className="font-tech text-[10px] font-bold tracking-[0.22em] text-[#ecc56d] uppercase">
                    {pkg.tier}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-bold text-[#f5f3ee]">
                    {pkg.name}
                  </h3>
                  <p className="font-tech mt-1 text-[11px] text-[#8e929b]">
                    {pkg.audience}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-sm text-[#b6bac3]">
                    {pkg.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#ecc56d]" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <a
                    href={`https://wa.me/918910905150?text=${encodeURIComponent(
                      `Hello Calcutta No-1, I would like a quote for ${pkg.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center border border-[#ecc56d]/50 bg-[#ecc56d]/10 py-3 font-tech text-xs font-bold tracking-widest text-[#fff6d6] uppercase transition hover:bg-[#ecc56d] hover:text-[#050507]"
                  >
                    Enquire {pkg.tier} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Sectors Footer Strip */}
        <div className="srv-sectors-box mt-10 border border-white/10 bg-[#090a0f] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
            <h3 className="font-display text-lg font-bold text-[#f5f3ee] sm:text-xl">
              Events We Power Across Kolkata &amp; West Bengal
            </h3>
            <span className="font-tech text-[10px] tracking-[0.2em] text-[#ecc56d] uppercase">
              INDOOR &amp; OPEN-AIR
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {eventSectors.map((sector) => (
              <div
                key={sector}
                className="srv-sector flex items-center gap-3 border border-white/[0.08] bg-[#050507] px-4 py-3 text-sm font-medium text-[#f5f3ee] transition hover:border-[#ecc56d]/40"
              >
                <span className="text-xs text-[#ecc56d]">✦</span>
                <span>{sector}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Production & Booking FAQ Accordion */}
        <div className="mt-10 border border-white/10 bg-[#090a0f] p-6 sm:p-8">
          <span className="font-tech text-[10px] tracking-[0.22em] text-[#ecc56d] uppercase">
            TECHNICAL &amp; BOOKING FAQ
          </span>
          <h3 className="font-display mt-2 text-xl font-bold text-[#f5f3ee] sm:text-2xl">
            Common Questions Before Booking
          </h3>

          <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="font-display text-sm font-bold text-[#f5f3ee] sm:text-base">
                      {faq.q}
                    </span>
                    <span className="font-tech shrink-0 text-xs text-[#ecc56d]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: MOTION_EASE.cinematic }}
                        className="overflow-hidden pt-3 text-sm leading-relaxed text-[#b6bac3]"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesComp;
