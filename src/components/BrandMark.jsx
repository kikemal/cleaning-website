import logo from '../assets/logo.png';

const sizeClasses = {
  nav: 'h-[52px] w-[52px] sm:h-14 sm:w-14',
  hero: 'h-28 w-28 sm:h-36 sm:w-36',
  footer: 'h-16 w-16 sm:h-[72px] sm:w-[72px]',
};

/**
 * Circular crop of the official logo showing the droplet / house mark only (no embedded wordmark).
 */
export function BrandMarkCircle({ variant = 'nav', className = '' }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border-2 border-white/70 bg-white shadow-md ring-2 ring-blue-500/15 dark:border-slate-600 dark:bg-slate-100 dark:ring-green-500/20 ${sizeClasses[variant]} ${className}`}
    >
      <img
        src={logo}
        alt=""
        className="pointer-events-none h-[215%] w-full object-cover object-[center_4%] select-none"
        draggable={false}
        width={200}
        height={400}
        loading={variant === 'footer' ? 'lazy' : 'eager'}
        decoding="async"
      />
    </div>
  );
}

/** Typography matching the logo: name (blue tone), service line + agency (green), tagline (blue). */
export function BrandWordmark({ layout = 'compact', className = '' }) {
  if (layout === 'hero') {
    return (
      <div className={`text-center sm:text-left ${className}`}>
        <p className="font-display text-2xl font-extrabold tracking-tight text-sky-100 sm:text-3xl">
          Kemal Selam Friends
        </p>
        <p className="mt-1 font-display text-sm font-bold uppercase tracking-[0.2em] text-emerald-300 sm:text-base">
          Cleaning Services
        </p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-emerald-200/95">Deliver Agency</p>
        <p className="mt-3 text-base font-medium text-white/90 sm:text-lg">Cleanliness with Friendship and Care</p>
      </div>
    );
  }

  if (layout === 'footer') {
    return (
      <div className={className}>
        <p className="font-display text-lg font-bold text-sky-100">Kemal Selam Friends</p>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-widest text-emerald-400">Cleaning Services</p>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300/90">Deliver Agency</p>
        <p className="mt-2 text-sm text-white/75">Cleanliness with Friendship and Care</p>
      </div>
    );
  }

  /* compact — navbar */
  return (
    <div className={`min-w-0 leading-tight ${className}`}>
      <p className="font-display text-base font-extrabold tracking-tight text-gradient sm:text-lg">Kemal Selam Friends</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-emerald-400 sm:text-[11px]">
        Cleaning Services
      </p>
    </div>
  );
}
