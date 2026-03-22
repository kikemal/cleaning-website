import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { BrandMarkCircle, BrandWordmark } from './BrandMark';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const SCROLL_OFFSET = 96;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const onScroll = useCallback(() => {
    const scrollPos = window.scrollY + SCROLL_OFFSET + 24;
    let current = 'home';
    for (const { id } of NAV_LINKS) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) current = id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleDark = () => {
    const next = !document.documentElement.classList.contains('dark');
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setDark(next);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav
        className="glass-strong shadow-xl shadow-blue-900/5 transition-all duration-300 dark:shadow-black/40"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex min-h-[44px] items-center gap-3 rounded-xl pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('home');
              setMobileOpen(false);
            }}
            aria-label="Kemal Selam Friends Cleaning Services home"
          >
            <BrandMarkCircle variant="nav" />
            <BrandWordmark layout="compact" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToId(id)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl min-h-[44px] ${
                  active === id
                    ? 'text-blue-600 dark:text-green-400'
                    : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-green-400'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-300 ${
                    active === id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                  aria-hidden
                />
              </button>
            ))}
            <button
              type="button"
              onClick={toggleDark}
              className="ml-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200/80 bg-white/60 text-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-amber-300"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                scrollToId('booking');
                setMobileOpen(false);
              }}
              className="ml-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/35 transition-all duration-300 hover:scale-105 hover:shadow-glow min-h-[44px]"
            >
              Book Now
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleDark}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200/80 bg-white/60 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-amber-300"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200/70 bg-white/70 text-slate-800 backdrop-blur dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/30 bg-white/90 backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/95 lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      scrollToId(id);
                      setMobileOpen(false);
                    }}
                    className={`rounded-xl px-4 py-3 text-left text-base font-semibold transition-all duration-300 min-h-[44px] ${
                      active === id
                        ? 'bg-gradient-to-r from-blue-600/15 to-green-500/15 text-blue-700 dark:text-green-400'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    scrollToId('booking');
                    setMobileOpen(false);
                  }}
                  className="mt-2 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 py-3 text-center text-base font-bold text-white shadow-lg min-h-[44px] transition-all duration-300 hover:shadow-glow"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
