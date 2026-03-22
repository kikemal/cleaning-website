import { useEffect, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Meron Tadesse',
    role: 'Homeowner · Bole',
    text: 'They treated our apartment like their own. Spotless finish and the team was incredibly kind.',
  },
  {
    name: 'Daniel Haile',
    role: 'Startup Founder · Kazanchis',
    text: 'Office cleaning on a schedule we can trust. Clients always comment how fresh the space feels.',
  },
  {
    name: 'Sara Mohammed',
    role: 'Property Manager',
    text: 'Move-out cleans are thorough and fast. Kemal Selam Friends is now our go-to partner.',
  },
  {
    name: 'Yonas Bekele',
    role: 'Restaurant Owner',
    text: 'Deep cleaning after busy weekends saves our crew hours. Professional and consistent every time.',
  },
  {
    name: 'Hanna Girma',
    role: 'Family of four · Lebu',
    text: 'With kids and pets, we needed someone patient and careful. This team delivers both.',
  },
  {
    name: 'Elias Worku',
    role: 'IT Consultant',
    text: 'Windows and carpets look brand new. Fair pricing and clear communication from booking to finish.',
  },
];

function GradientStars() {
  const gid = useId().replace(/:/g, '');
  const gradId = `star-grad-${gid}`;
  return (
    <div className="relative flex gap-0.5" aria-label="5 out of 5 stars">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-5 w-5 text-transparent"
          style={{ fill: `url(#${gradId})` }}
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [inView, paused]);

  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);

  const r = REVIEWS[index];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative scroll-mt-24 bg-gradient-to-b from-white via-slate-50 to-white py-24 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 2000)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-green-400">
            Loved by locals
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 font-display text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl"
          >
            Voices of <span className="text-gradient">trust</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="flex justify-between gap-2 sm:absolute sm:inset-y-0 sm:-left-4 sm:-right-4 sm:z-10 sm:items-center">
            <button
              type="button"
              onClick={prev}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl border border-white/40 bg-white/80 text-blue-600 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 dark:border-slate-600 dark:bg-slate-800 dark:text-green-400"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl border border-white/40 bg-white/80 text-blue-600 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 dark:border-slate-600 dark:bg-slate-800 dark:text-green-400 sm:ml-auto"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={r.name}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/10 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-glow dark:border-white/10 dark:bg-white/5 sm:px-12 sm:py-10"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(37,99,235,0.25), inset 0 0 0 1px rgba(34,197,94,0.2)',
                }}
              />
              <div className="relative flex flex-col items-center text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-green-500 text-xl font-bold text-white shadow-lg ring-4 ring-white/50 dark:ring-slate-800"
                  aria-hidden
                >
                  {r.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900 dark:text-white">{r.name}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{r.role}</p>
                <div className="relative mt-4">
                  <GradientStars />
                </div>
                <p className="mt-6 text-lg italic leading-relaxed text-slate-700 dark:text-slate-200">&ldquo;{r.text}&rdquo;</p>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-1" role="tablist" aria-label="Testimonial slides">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 transition-all duration-300"
                aria-label={`Show testimonial ${i + 1}`}
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-8 bg-gradient-to-r from-blue-600 to-green-500'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Static grid — additional desktop richness */}
        <div className="mt-16 hidden gap-5 lg:grid lg:grid-cols-3">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.name}
              className="rounded-2xl border border-white/30 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-sm font-bold text-white">
                  {rev.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{rev.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{rev.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm italic text-slate-600 dark:text-slate-300">&ldquo;{rev.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
