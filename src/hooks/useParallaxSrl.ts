"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useColumnParallax(
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  columnsToAnimate: number[] = [],
  strength: number = -20
) {
  useEffect(() => {
    const triggers: gsap.core.Tween[] = [];

    columnsToAnimate.forEach((index) => {
      const el = refs.current[index];
      if (!el) return;

      const tween = gsap.to(el, {
        yPercent: strength,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      triggers.push(tween);
    });

    return () => {
      triggers.forEach((tween) => tween.scrollTrigger?.kill());
    };
  }, [refs, columnsToAnimate, strength]);
}
