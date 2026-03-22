import { MessageCircle } from 'lucide-react';

const OFFSET = 96;

function scrollToBooking() {
  const el = document.getElementById('booking');
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

/**
 * Floating action — drives users to the booking section.
 */
export default function FloatingQuote() {
  return (
    <button
      type="button"
      onClick={scrollToBooking}
      className="fixed bottom-24 right-5 z-40 flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-blue-600/40 transition-all duration-300 hover:scale-105 hover:shadow-glow animate-pulse-soft max-sm:px-4 max-sm:text-xs"
      aria-label="Request a quote — go to booking form"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
      <span className="hidden sm:inline">Request Quote</span>
    </button>
  );
}
