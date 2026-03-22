import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, ChevronUp } from 'lucide-react';
import { BrandMarkCircle, BrandWordmark } from './BrandMark';
import WhatsAppButton from './WhatsAppButton';
import { whatsappMessages } from '../config/whatsapp';

const quick = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Booking', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

function scrollToHash(e, href) {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsErr, setNewsErr] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsErr('Please enter a valid email.');
      return;
    }
    setNewsErr('');
    console.log('[Newsletter]', email);
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <footer className="relative border-t border-transparent bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex items-start gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              onClick={(e) => scrollToHash(e, '#home')}
              aria-label="Kemal Selam Friends home"
            >
              <BrandMarkCircle variant="footer" className="shadow-lg shadow-black/30" />
              <BrandWordmark layout="footer" />
            </Link>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Quick links</h3>
            <ul className="mt-4 space-y-2">
              {quick.map((q) => (
                <li key={q.href}>
                  <a
                    href={q.href}
                    onClick={(e) => scrollToHash(e, q.href)}
                    className="inline-flex min-h-[40px] items-center text-white/80 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {q.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                <a href="tel:+251905077915" className="transition-colors hover:text-white">
                  +251 905 077 915
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                <a href="mailto:info@kemalselamfriends.com" className="transition-colors hover:text-white">
                  info@kemalselamfriends.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                Addis Ababa, Ethiopia
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-green-500 p-2 text-white shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
              <WhatsAppButton
                message={whatsappMessages.general}
                iconOnly
                iconSize={22}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-green-500 p-2 text-white shadow-lg transition-all duration-300 hover:scale-110"
                ariaLabel="WhatsApp"
              />
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Newsletter</h3>
            <p className="mt-2 text-sm text-white/75">Tips, offers, and friendly updates — no spam.</p>
            <form onSubmit={subscribe} className="mt-4 space-y-2" noValidate>
              <label htmlFor="footer-email" className="sr-only">
                Email for newsletter
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setNewsErr('');
                }}
                placeholder="you@example.com"
                className="w-full min-h-[48px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-invalid={!!newsErr}
                aria-describedby={newsErr ? 'news-err' : undefined}
              />
              {newsErr && (
                <p id="news-err" className="text-sm text-red-300">
                  {newsErr}
                </p>
              )}
              <button
                type="submit"
                className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm text-white/60">
            © {new Date().getFullYear()} Kemal Selam Friends Cleaning Services. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/20"
            aria-label="Back to top"
          >
            <ChevronUp className="h-4 w-4" />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
