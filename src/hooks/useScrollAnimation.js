import { useInView } from 'react-intersection-observer';

/**
 * Reusable hook for fade/slide-in when section enters viewport.
 * @param {{ threshold?: number, triggerOnce?: boolean, rootMargin?: string }} options
 */
export function useScrollAnimation(options = {}) {
  const { threshold = 0.12, triggerOnce = true, rootMargin = '0px 0px -8% 0px' } = options;

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  return { ref, inView };
}
