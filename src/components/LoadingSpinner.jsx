/**
 * Spinner for loading states — `onGradient` uses a high-contrast ring for colorful buttons.
 */
export default function LoadingSpinner({ className = '', label = 'Loading', onGradient = false }) {
  if (onGradient) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} role="status" aria-label={label}>
        <span
          className="h-6 w-6 shrink-0 rounded-full border-2 border-white/35 border-t-white animate-spin"
          aria-hidden
        />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center justify-center ${className}`} role="status" aria-label={label}>
      <span className="relative h-8 w-8">
        <span
          className="absolute inset-0 animate-spin rounded-full bg-gradient-to-tr from-blue-600 via-teal-400 to-green-400 opacity-90"
          aria-hidden
        />
        <span className="absolute inset-[3px] rounded-full bg-white dark:bg-slate-950" aria-hidden />
      </span>
    </span>
  );
}
