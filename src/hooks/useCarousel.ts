import { type CarouselApi } from "@/components/ui/carousel";
import { useState, useCallback, useRef } from "react";

interface UseCarouselOptions {
  autoplay?: boolean;
  interval?: number;
}

export const useCarousel = ({
  autoplay: defaultAutoplay = true,
  interval = 10000,
}: UseCarouselOptions = {}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplay, setAutoplay] = useState(defaultAutoplay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!api || !autoplay) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, interval);
  }, [api, autoplay, interval]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleApiUpdate = useCallback(
    (newApi?: CarouselApi) => {
      if (!newApi) return;

      setApi(newApi);
      setCount(newApi.scrollSnapList().length);
      setCurrent(newApi.selectedScrollSnap() + 1);

      newApi.on("select", () => {
        setCurrent(newApi.selectedScrollSnap() + 1);
      });

      if (autoplay) {
        startAutoplay();
      }
    },
    [autoplay, startAutoplay]
  );

  const handlePrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return {
    api,
    count,
    current,
    autoplay,
    setAutoplay,
    setApi: handleApiUpdate,
    handleNext,
    handlePrevious,
    startAutoplay,
    stopAutoplay,
  };
};

// import {type CarouselApi } from "@/components/ui/carousel";
// import { useEffect, useState, useCallback } from "react";
// export const useCarousel=()=>{
//     const [api, setApi] = useState<CarouselApi>();
//     const [current, setCurrent] = useState(0);
//     const [count, setCount] = useState(0);
//     const [autoplay, setAutoplay] = useState(true);

//     useEffect(() => {
//       if (!api) {
//         return;
//       }

//       setCount(api.scrollSnapList().length);
//       setCurrent(api.selectedScrollSnap() + 1);

//       api.on("select", () => {
//         setCurrent(api.selectedScrollSnap() + 1);
//       });
//     }, [api]);

//     useEffect(() => {
//       if (!api || !autoplay) return;

//       const intervalId = setInterval(() => {
//         api.scrollNext();
//       }, 10000);

//       return () => clearInterval(intervalId);
//     }, [api, autoplay]);

//     const handlePrevious = useCallback(() => {
//       api?.scrollPrev();
//     }, [api]);

//     const handleNext = useCallback(() => {
//       api?.scrollNext();
//     }, [api]);

//     return {api, count,current,autoplay,setAutoplay,setApi,handleNext,handlePrevious}
// }
