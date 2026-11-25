import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  gsap,
  MOTION_EASE,
  SCROLL_REVEAL,
  modalBackdropVariants,
  modalPanelVariants,
} from '../motion/motionConfig';
import MagneticWrap from './MagneticWrap';
import { mediaItems, setupChecklist } from '../data/galleryData';

const photoItems = mediaItems.filter((item) => item.type === 'photo');

function GalleryComp() {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(['.gal-header', '.gal-note-card'], {
          clearProps: 'all',
          opacity: 1,
          y: 0,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.gal-header', {
          y: 22,
          opacity: 0,
          duration: 0.85,
          ease: MOTION_EASE.gsapDeep,
        });

        gsap.from('.gal-note-card', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.gal-notes-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowRight') {
        const idx = photoItems.findIndex((p) => p.id === selectedItem.id);
        if (idx !== -1) setSelectedItem(photoItems[(idx + 1) % photoItems.length]);
      } else if (e.key === 'ArrowLeft') {
        const idx = photoItems.findIndex((p) => p.id === selectedItem.id);
        if (idx !== -1) {
          setSelectedItem(
            photoItems[(idx - 1 + photoItems.length) % photoItems.length]
          );
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem]);

  const filteredItems =
    filter === 'all'
      ? mediaItems
      : mediaItems.filter((item) => item.type === filter);

  const stepPhoto = (direction) => {
    if (!selectedItem) return;
    const idx = photoItems.findIndex((p) => p.id === selectedItem.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + photoItems.length) % photoItems.length;
    setSelectedItem(photoItems[nextIdx]);
  };

  return (
    <section ref={rootRef} className="atelier-grid bg-[#050507] py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="gal-header flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <div className="font-tech flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#8e929b] uppercase">
              <Link to="/" className="hover:text-[#ecc56d]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#ecc56d]">Gallery</span>
            </div>
            <h1 className="font-display mt-4 text-3xl leading-[1.02] font-extrabold tracking-tight text-[#f5f3ee] sm:text-5xl lg:text-6xl">
              Production <span className="text-champagne">Archive</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-[#b6bac3] sm:text-base">
              Authentic photos and live show footage straight from our Calcutta No - 1
              assets collection—featuring our Soundcraft & Midas FOH rigs, concert lighting, box truss, and
              heavy event fleet.
            </p>
          </div>

          {/* Framer Motion layoutId Filter Bar */}
          <div
            className="inline-flex w-full border border-white/15 bg-[#0a0b10] p-1 sm:w-auto"
            role="tablist"
            aria-label="Gallery media filter"
          >
            {[
              { id: 'all', label: `All Media (${mediaItems.length})` },
              { id: 'photo', label: `Photos (${photoItems.length})` },
              { id: 'video', label: `Videos (${mediaItems.length - photoItems.length})` },
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`font-tech relative flex-1 px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors sm:flex-none ${
                    isActive ? 'text-[#050507]' : 'text-[#8e929b] hover:text-[#f5f3ee]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-[#ecc56d]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    delay: Math.min(idx * 0.02, 0.4),
                    ease: MOTION_EASE.cinematic,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between border border-white/10 bg-[#0a0b10] p-2.5 transition-colors duration-300 hover:border-[#ecc56d]/60"
              >
                <div>
                  {item.type === 'video' ? (
                    <div className="relative bg-black">
                      <video
                        src={item.src}
                        poster={item.poster}
                        controls
                        playsInline
                        preload="none"
                        className="aspect-video w-full object-cover"
                      />
                      <span className="font-tech pointer-events-none absolute top-3 left-3 bg-red-600 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                        VIDEO REEL
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="relative block w-full overflow-hidden text-left"
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="font-tech absolute top-3 left-3 border border-[#ecc56d]/40 bg-[#050507]/85 px-2.5 py-1 text-[10px] tracking-widest text-[#ecc56d] uppercase backdrop-blur-sm">
                        {item.category}
                      </span>
                    </button>
                  )}

                  <div className="px-1 pt-3">
                    <span className="font-tech text-[10px] text-[#ecc56d]">
                      {item.num} // {item.category.toUpperCase()}
                    </span>
                    <h2 className="mt-1 text-sm font-bold text-[#f5f3ee]">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#8e929b]">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 px-1 pt-3 pb-1">
                  <span className="font-tech text-[10px] text-[#656973] uppercase">
                    {item.type === 'video' ? 'HD PLAYBACK' : 'HIGH-RES STILL'}
                  </span>
                  {item.type === 'photo' ? (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setSelectedItem(item)}
                      className="font-tech shrink-0 border border-white/15 px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#ecc56d] uppercase transition hover:border-[#ecc56d] hover:bg-[#ecc56d] hover:text-[#050507]"
                    >
                      Expand ↗
                    </motion.button>
                  ) : (
                    <Link
                      to="/contact"
                      className="font-tech text-[10px] font-bold tracking-wider text-[#ecc56d] uppercase hover:text-white"
                    >
                      Book Similar Rig →
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* On-Site Production Standards & CTA */}
        <div className="gal-notes-grid mt-14 grid gap-5 md:grid-cols-3">
          {setupChecklist.map((item) => (
            <div
              key={item.code}
              className="gal-note-card border border-white/10 bg-[#090a0f] p-6"
            >
              <span className="font-tech text-[10px] tracking-[0.22em] text-[#ecc56d] uppercase">
                {item.code}
              </span>
              <h3 className="font-display mt-2 text-lg font-bold text-[#f5f3ee]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8e929b]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border border-[#ecc56d]/30 bg-[#0a0b10] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-lg font-bold text-[#f5f3ee] sm:text-xl">
              Want This Production Quality at Your Venue?
            </h3>
            <p className="mt-1 text-sm text-[#b6bac3]">
              Explore full service specs or request an event quote directly on WhatsApp.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/services"
              className="inline-flex items-center justify-center border border-white/20 px-5 py-3 text-xs font-bold tracking-widest text-[#f5f3ee] uppercase transition hover:border-[#ecc56d]"
            >
              View Services
            </Link>
            <MagneticWrap>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center bg-gradient-to-r from-[#fff6d6] via-[#ecc56d] to-[#b97d22] px-5 py-3 text-xs font-extrabold tracking-widest text-[#050507] uppercase transition hover:brightness-110 sm:w-auto"
              >
                Book Now →
              </Link>
            </MagneticWrap>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="lightbox-backdrop"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
          >
            <motion.div
              key={selectedItem.id}
              variants={modalPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl border border-white/15 bg-[#0a0b10] p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="font-tech absolute top-5 right-5 z-10 border border-white/20 bg-[#050507]/90 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase transition hover:border-[#ecc56d] hover:bg-[#ecc56d] hover:text-[#050507]"
                aria-label="Close preview"
              >
                Close [ESC]
              </button>

              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-h-[75vh] w-full object-contain"
              />

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-2 pt-3 pb-1 text-xs">
                <div>
                  <span className="font-bold text-[#f5f3ee]">{selectedItem.title}</span>
                  <span className="font-tech ml-3 text-[10px] text-[#ecc56d] uppercase">
                    {selectedItem.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => stepPhoto(-1)}
                    className="font-tech border border-white/15 px-3 py-1.5 text-[10px] font-bold text-[#f5f3ee] uppercase transition hover:border-[#ecc56d] hover:text-[#ecc56d]"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => stepPhoto(1)}
                    className="font-tech border border-white/15 px-3 py-1.5 text-[10px] font-bold text-[#f5f3ee] uppercase transition hover:border-[#ecc56d] hover:text-[#ecc56d]"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GalleryComp;
