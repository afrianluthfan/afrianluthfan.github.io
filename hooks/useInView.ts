import { useEffect, useState, type RefObject } from "react";

export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.1) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isIntersecting;
}
