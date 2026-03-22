import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, ShieldCheck, Award, Users } from 'lucide-react';

const STATS = [
  { label: 'Years of Experience', value: 12, suffix: '+' },
  { label: 'Happy Customers', value: 2400, suffix: '+' },
  { label: 'Services Completed', value: 18500, suffix: '+' },
  { label: 'Team Members', value: 45, suffix: '+' },
];

function useCountUp(end, start = 0, duration = 1800, enabled) {
  const [val, setVal] = useState(start);
  const frame = useRef();
  const startTime = useRef();

  useEffect(() => {
    if (!enabled) return;
    const step = (ts) => {
      if (!startTime.current) startTime.current = ts;
      const p = Math.min((ts - startTime.current) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setVal(Math.floor(start + (end - start) * eased));
      if (p < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [end, start, duration, enabled]);

  return val;
}

function StatCard({ label, value, suffix, enabled }) {
  const n = useCountUp(value, 0, 2000, enabled);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-white/10 dark:bg-white/5">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(34,197,94,0.12))',
        }}
      />
      <p className="relative font-display text-3xl font-extrabold text-gradient sm:text-4xl">
        {n.toLocaleString()}
        {suffix}
      </p>
      <p className="relative mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</p>
    </div>
  );
}

const galleryPlaceholders = [
  { alt: 'Team cleaning a bright living room', from: 'from-blue-600', to: 'to-teal-500' },
  { alt: 'Spotless modern kitchen counter', from: 'from-teal-500', to: 'to-green-500' },
  { alt: 'Professional cleaner with supplies', from: 'from-indigo-600', to: 'to-emerald-500' },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [loaded, setLoaded] = useState([false, false, false]);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded([true, true, true]), 500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-blue-900/90 via-blue-700 to-green-600 py-24 text-white"
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-2 gap-4"
          >
            {galleryPlaceholders.map((g, i) => (
              <div
                key={g.alt}
                className={`relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/20 shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:shadow-glow ${
                  i === 0 ? 'col-span-2 sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:min-h-[320px]' : ''
                }`}
              >
                {!loaded[i] && (
                  <div
                    className="absolute inset-0 animate-pulse bg-white/20 backdrop-blur-sm"
                    aria-hidden
                  />
                )}
                <div
                  className={`h-full w-full bg-gradient-to-br ${g.from} ${g.to} opacity-90 transition-transform duration-700 hover:scale-110`}
                  role="img"
                  aria-label={g.alt}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-200">Our story</p>
            <h2 id="about-heading" className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Friendship first. <span className="text-emerald-200">Impeccable results.</span>
            </h2>
            <p className="mt-6 text-lg text-white/90 leading-relaxed">
              Kemal Selam Friends was built on a simple promise: treat every home and workplace like it belongs to
              someone we care about. As part of <strong className="font-semibold text-white">Deliver Agency</strong>, we
              combine professional standards with warm, respectful service — so you always feel comfortable inviting us
              in.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { Icon: Heart, text: 'Human, friendly communication at every step' },
                { Icon: ShieldCheck, text: 'Vetted team members and careful handling of your belongings' },
                { Icon: Award, text: 'Quality checks and satisfaction-focused follow-through' },
                { Icon: Users, text: 'Long-term relationships, not one-off transactions' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                    <Icon className="h-5 w-5 text-emerald-200" aria-hidden />
                  </span>
                  <span className="text-base text-white/90 pt-2">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} enabled={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
