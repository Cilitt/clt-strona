import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  rootMargin?: string;
}

export const useScrollAnimation = ({
  threshold = 0.2,
  delay = 0,
  rootMargin = '-20px'
}: ScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, delay, rootMargin]);

  return { ref: elementRef, isVisible };
};