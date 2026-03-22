import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Home,
  Building2,
  Sparkles,
  Truck,
  Sofa,
  AppWindow,
  ArrowRight,
} from 'lucide-react';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { whatsappMessages } from '../config/whatsapp';

const SERVICES = [
  {
    title: 'Home Cleaning',
    description: 'Reliable weekly or one-time home care tailored to your space and routine.',
    Icon: Home,
    waMessage: whatsappMessages.homeCleaning,
  },
  {
    title: 'Office Cleaning',
    description: 'Spotless workplaces that impress clients and support productive teams.',
    Icon: Building2,
    waMessage: whatsappMessages.officeCleaning,
  },
  {
    title: 'Deep Cleaning',
    description: 'Detailed top-to-bottom refresh for kitchens, baths, and high-traffic areas.',
    Icon: Sparkles,
    waMessage: whatsappMessages.deepCleaning,
  },
  {
    title: 'Move-in / Move-out',
    description: 'Stress-free transitions with thorough cleaning for handovers and new keys.',
    Icon: Truck,
    waMessage: whatsappMessages.moveInOut,
  },
  {
    title: 'Carpet & Upholstery',
    description: 'Gentle yet effective care to revive fabrics and extend the life of your pieces.',
    Icon: Sofa,
    waMessage: whatsappMessages.carpetCleaning,
  },
  {
    title: 'Window Cleaning',
    description: 'Crystal-clear glass and frames that flood your rooms with natural light.',
    Icon: AppWindow,
    waMessage: whatsappMessages.windowCleaning,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section
      id="services"
      ref={ref}
      className="relative scroll-mt-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      aria-labelledby="services-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-soft opacity-60 dark:opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-green-400">
            What we offer
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl"
          >
            Services crafted with{' '}
            <span className="text-gradient">friendship &amp; care</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            Every visit is handled by trained professionals who treat your space with respect — the Kemal Selam Friends way.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  padding: '1px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.5), rgba(34,197,94,0.45))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-green-500 text-white shadow-lg">
                <s.Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.description}</p>
              <a
                href="#booking"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:gap-2 dark:text-green-400"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <WhatsAppButton
                message={s.waMessage}
                className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-green-500/50 bg-green-500/10 px-3 py-2.5 text-xs font-bold text-green-700 transition-all duration-300 hover:scale-[1.02] hover:bg-green-500/20 dark:border-green-400/40 dark:text-green-400 dark:hover:bg-green-500/15"
                ariaLabel={`Inquire on WhatsApp about ${s.title}`}
              >
                <WhatsAppIcon size={22} className="shrink-0" />
                <span>Inquire on WhatsApp</span>
              </WhatsAppButton>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
