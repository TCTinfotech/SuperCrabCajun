import { useEffect } from 'react';

/**
 * Hook to automatically observe and animate elements with the '.reveal' class.
 * Uses IntersectionObserver for performant view-based triggering.
 */
export function useScrollReveal() {
  useEffect(() => {
    // If IntersectionObserver is not supported, just make all elements visible
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
      return;
    }

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -10% 0px', // trigger slightly before entering fully
      threshold: 0.1 // 10% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      revealElements.forEach((el) => {
        try {
          observer.unobserve(el);
        } catch (e) {
          // Element might have been unmounted already
        }
      });
    };
  }, []);
}

/**
 * Scroll Listener Fallback for parallax scroll effects
 * Matches the guideline of writing performance-composited fallback translate animations
 */
export function initParallaxFallback() {
  // If CSS Scroll-driven animations are supported, do nothing
  if (window.CSS && CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    return;
  }

  const wrappers = document.querySelectorAll('.parallax-bg');
  if (wrappers.length === 0) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    wrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const topPos = rect.top + scrollY;
      const height = rect.height;

      // Check if wrapper is in viewport range
      if (scrollY >= topPos - windowHeight && scrollY <= topPos + height) {
        const percent = (scrollY - (topPos - windowHeight)) / (height + windowHeight);
        const layers = wrapper.querySelectorAll('.parallax-layer');
        layers.forEach((layer) => {
          // Translate from 80px to -80px based on percent
          const transY = 80 - percent * 160;
          layer.style.transform = `translateY(${transY}px)`;
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial layout

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}
