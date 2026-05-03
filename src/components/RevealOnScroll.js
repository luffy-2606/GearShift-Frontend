import React, { useEffect, useRef, useState } from 'react';

/**
 * Fades/slides content in when it enters the viewport. Optionally staggers children.
 */
export function RevealOnScroll({
  children,
  className = '',
  style,
  as: Component = 'div',
  rootMargin = '64px 0px -6% 0px',
  threshold = 0.06,
  delayMs = 0,
  disabled = false
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      return undefined;
    }
    const el = ref.current;
    if (!el) return undefined;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return undefined;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [disabled, rootMargin, threshold]);

  const combinedStyle =
    delayMs && visible
      ? { ...style, transitionDelay: `${delayMs}ms` }
      : style;

  return (
    <Component
      ref={ref}
      className={`reveal-on-scroll ${visible ? 'reveal-on-scroll--visible' : ''} ${className}`.trim()}
      style={combinedStyle}
    >
      {children}
    </Component>
  );
}

export default RevealOnScroll;
