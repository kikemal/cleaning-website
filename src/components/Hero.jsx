import { motion } from 'framer-motion';
import { Sparkles, Home, Droplets, Wind } from 'lucide-react';
import { BrandMarkCircle, BrandWordmark } from './BrandMark';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const floatIcons = [
  { Icon: Sparkles, className: 'left-[8%] top-[20%] text-white/30', delay: 0 },
  { Icon: Home, className: 'right-[12%] top-[28%] text-emerald-200/25', delay: 0.4 },
  { Icon: Droplets, className: 'left-[18%] bottom-[22%] text-sky-200/30', delay: 0.8 },
  { Icon: Wind, className: 'right-[20%] bottom-[18%] text-white/25', delay: 1.2 },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-green-500"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0, transparent 45%), radial-gradient(circle at 80% 60%, rgba(34,197,94,0.2) 0, transparent 40%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

      {floatIcons.map(({ Icon, className, delay }) => (
        <motion.div
          key={className}
          className={`pointer-events-none absolute hidden md:block ${className}`}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
          aria-hidden
        >
          <Icon className="h-14 w-14 lg:h-16 lg:w-16" strokeWidth={1.25} />
        </motion.div>
      ))}

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pb-24 pt-28 text-center sm:px-6 lg:px-8 lg:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={item}
            className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-10"
          >
            <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
              <BrandMarkCircle variant="hero" className="shadow-2xl shadow-blue-900/30 ring-4 ring-white/25" />
            </motion.div>
            <BrandWordmark layout="hero" className="max-w-md" />
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl"
          >
            <span className="block bg-gradient-to-r from-white via-sky-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-sm">
              Professional Cleaning Services You Can Trust
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="#booking"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 px-10 py-3.5 text-base font-bold text-white shadow-2xl shadow-blue-900/40 transition-all duration-300 hover:scale-105 hover:shadow-glow animate-pulse-soft"
              whileTap={{ scale: 0.97 }}
            >
              Book a Service
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-white/70 bg-white/5 px-10 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-white/15 hover:text-emerald-100"
              whileTap={{ scale: 0.97 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950"
        aria-hidden
      />
    </section>
  );
}
