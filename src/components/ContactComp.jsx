import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap, MOTION_EASE, SCROLL_REVEAL } from '../motion/motionConfig';

const WHATSAPP_NUMBER = '918910905150';

const serviceOptions = [
  'Digital Sound System',
  'Stage Light Setup',
  'Truss Setup',
  'High-Resolution LED Screen',
  'Live Stage Show Package',
  'Conference / Meeting Instruments',
];

function ContactComp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: serviceOptions[0],
    eventDate: '',
    venue: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [dispatched, setDispatched] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(['.cnt-header', '.cnt-panel'], {
          clearProps: 'all',
          opacity: 1,
          y: 0,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        gsap.from('.cnt-header', {
          y: 24,
          opacity: 0,
          duration: 0.85,
          ease: MOTION_EASE.gsapDeep,
        });

        gsap.from('.cnt-panel', {
          y: SCROLL_REVEAL.yDesktop,
          opacity: 0,
          duration: SCROLL_REVEAL.durationDesktop,
          stagger: SCROLL_REVEAL.staggerDesktop,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.cnt-grid',
            start: SCROLL_REVEAL.startDesktop,
            once: true,
          },
        });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
        gsap.from('.cnt-header', {
          y: 16,
          opacity: 0,
          duration: 0.65,
          ease: MOTION_EASE.gsapPrimary,
        });

        gsap.from('.cnt-panel', {
          y: SCROLL_REVEAL.yMobile,
          opacity: 0,
          duration: SCROLL_REVEAL.durationMobile,
          stagger: SCROLL_REVEAL.staggerMobile,
          immediateRender: false,
          ease: MOTION_EASE.gsapPrimary,
          scrollTrigger: {
            trigger: '.cnt-grid',
            start: SCROLL_REVEAL.startMobile,
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (dispatched) setDispatched(false);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please enter your Name and Mobile Number to send an enquiry.');
      return;
    }

    const lines = [
      '*New Event Enquiry - CALCUTTA NO - 1*',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Service Required: ${formData.service}`,
      formData.eventDate ? `Event Date: ${formData.eventDate}` : null,
      formData.venue.trim() ? `Venue / Location: ${formData.venue.trim()}` : null,
      formData.message.trim() ? `Details: ${formData.message.trim()}` : null,
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
    setDispatched(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={rootRef} className="atelier-grid bg-[#050507] py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="cnt-header border-b border-white/10 pb-8">
          <div className="font-tech flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#8e929b] uppercase">
            <Link to="/" className="hover:text-[#ecc56d]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#ecc56d]">Contact</span>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 className="font-display text-3xl leading-[1.02] font-extrabold tracking-tight text-[#f5f3ee] sm:text-5xl lg:col-span-8 lg:text-6xl">
              Initiate Your <span className="text-champagne">Stage Booking</span>
            </h1>
            <p className="text-sm leading-relaxed text-[#b6bac3] lg:col-span-4">
              Send your event brief directly to{' '}
              <span className="font-bold text-[#ecc56d]">+91 8910905150</span> on
              WhatsApp or visit our Garia Main Road hub.
            </p>
          </div>
        </div>

        {/* Form & Google Map Split */}
        <div className="cnt-grid mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left: WhatsApp Enquiry Form */}
          <div className="cnt-panel min-w-0 border border-white/10 bg-[#0a0b10] p-5 shadow-2xl sm:p-8 lg:col-span-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-tech text-[10px] tracking-[0.2em] text-[#ecc56d] uppercase">
                  DIRECT DISPATCH
                </span>
                <h2 className="font-display mt-1 text-xl font-bold text-[#f5f3ee] sm:text-2xl">
                  Event Enquiry Form
                </h2>
              </div>
              <span className="font-tech inline-flex items-center gap-1.5 border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                WhatsApp Ready
              </span>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="font-tech block text-[11px] font-semibold tracking-wider text-[#b6bac3] uppercase"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="mt-1.5 w-full border border-white/15 bg-[#050507] px-3.5 py-3 text-sm text-[#f5f3ee] placeholder-[#656973] transition duration-200 focus:border-[#ecc56d] focus:bg-[#08090f] focus:ring-1 focus:ring-[#ecc56d]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="font-tech block text-[11px] font-semibold tracking-wider text-[#b6bac3] uppercase"
                  >
                    Mobile Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 8910905150"
                    className="mt-1.5 w-full border border-white/15 bg-[#050507] px-3.5 py-3 text-sm text-[#f5f3ee] placeholder-[#656973] transition duration-200 focus:border-[#ecc56d] focus:bg-[#08090f] focus:ring-1 focus:ring-[#ecc56d]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="service"
                    className="font-tech block text-[11px] font-semibold tracking-wider text-[#b6bac3] uppercase"
                  >
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-white/15 bg-[#050507] px-3.5 py-3 text-sm text-[#f5f3ee] transition duration-200 focus:border-[#ecc56d] focus:bg-[#08090f] focus:ring-1 focus:ring-[#ecc56d]/40 focus:outline-none"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="eventDate"
                    className="font-tech block text-[11px] font-semibold tracking-wider text-[#b6bac3] uppercase"
                  >
                    Event Date
                  </label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-white/15 bg-[#050507] px-3.5 py-3 text-sm text-[#f5f3ee] transition duration-200 focus:border-[#ecc56d] focus:bg-[#08090f] focus:ring-1 focus:ring-[#ecc56d]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="venue"
                  className="font-tech block text-[11px] font-semibold tracking-wider text-[#b6bac3] uppercase"
                >
                  Event Venue / Location
                </label>
                <input
                  id="venue"
                  name="venue"
                  type="text"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Garia, South Kolkata"
                  className="mt-1.5 w-full border border-white/15 bg-[#050507] px-3.5 py-3 text-sm text-[#f5f3ee] placeholder-[#656973] transition duration-200 focus:border-[#ecc56d] focus:bg-[#08090f] focus:ring-1 focus:ring-[#ecc56d]/40 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-tech block text-[11px] font-semibold tracking-wider text-[#b6bac3] uppercase"
                >
                  Requirements / Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share crowd size, digital sound, stage light, truss or LED screen details..."
                  className="mt-1.5 w-full border border-white/15 bg-[#050507] px-3.5 py-3 text-sm text-[#f5f3ee] placeholder-[#656973] transition duration-200 focus:border-[#ecc56d] focus:bg-[#08090f] focus:ring-1 focus:ring-[#ecc56d]/40 focus:outline-none"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300"
                  >
                    {error}
                  </motion.p>
                )}
                {dispatched && !error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-300"
                  >
                    Opening WhatsApp with your formatted event enquiry for +91 8910905150.
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="flex w-full items-center justify-center gap-2.5 bg-emerald-500 px-5 py-4 text-xs font-extrabold tracking-[0.16em] text-[#04140d] uppercase shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                <svg className="h-5 w-5 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-.984-.328-1.703-.641-2.984-1.281-4.938-4.297-5.078-4.484-.141-.203-1.219-1.625-1.219-3.094 0-1.469.766-2.188 1.031-2.484.266-.297.578-.375.781-.375.203 0 .391.016.563.016.172 0 .406-.063.641.484.234.563.797 1.953.875 2.094.078.141.125.313.031.5-.094.203-.156.313-.297.484-.156.172-.313.391-.453.516-.156.141-.313.297-.141.594.172.297.781 1.281 1.672 2.078 1.156 1.031 2.125 1.344 2.422 1.5.297.141.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.672-.156.266.094 1.719.813 2.016.953.297.156.484.219.563.344.078.125.078.734-.172 1.438z" />
                </svg>
                <span>Send Enquiry via WhatsApp (8910905150)</span>
              </motion.button>
            </form>
          </div>

          {/* Right: Google Map beside form + Full Official Details */}
          <div className="cnt-panel flex min-w-0 flex-col gap-6 lg:col-span-6">
            <div className="border border-white/10 bg-[#0a0b10] p-2 shadow-2xl">
              <iframe
                title="Calcutta No-1 Location Map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3970.3277854080857!2d88.3766695752973!3d22.46378327956922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDI3JzQ5LjYiTiA4OMKwMjInNDUuMyJF!5e1!3m2!1sen!2sin!4v1794472319694!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-64 w-full sm:h-80 lg:h-[340px]"
              />
            </div>

            <div className="border border-white/10 bg-[#0a0b10] p-6 shadow-2xl transition-colors duration-300 hover:border-[#ecc56d]/40">
              <span className="font-tech text-[10px] tracking-[0.2em] text-[#ecc56d] uppercase">
                OFFICIAL HEADQUARTERS
              </span>
              <h3 className="font-display mt-1 text-lg font-extrabold text-[#f5f3ee]">
                CALCUTTA NO - 1
              </h3>
              <p className="font-tech mt-0.5 text-[11px] tracking-wider text-[#8e929b] uppercase">
                Digital Sound Stage Light Truss &amp; LED Screen / Naren Rang
              </p>

              <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm leading-relaxed text-[#b6bac3]">
                <p className="break-words">
                  <span className="font-semibold text-white">Address: </span>
                  1312 GARIA MAIN ROAD, CHARU RESIDENCY, KOLKATA (LANDMARK - KAVI
                  NAZRUL METRO STATION), South 24 Parganas, West Bengal, 700084
                </p>
                <p>
                  <span className="font-semibold text-white">Mobile: </span>
                  <a
                    href="tel:+918910905150"
                    className="font-extrabold text-[#ecc56d] hover:underline"
                  >
                    +91 8910905150
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactComp;
