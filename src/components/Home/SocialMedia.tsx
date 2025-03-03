"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/useCarousel";
import { Badge } from "../ui/badge";

import { Embed } from "./NewsGrid";
import InstagramEmbed from "./InstaEmbed";

export default function MediaCarousel({
  title,
  isBadge,
}: {
  title: string;
  isBadge: boolean;
}) {
  const {
    count,
    current,
    stopAutoplay,
    startAutoplay,
    setApi,
    handleNext,
    handlePrevious,
  } = useCarousel({ autoplay: false });

  return (
    <div className="w-full relative pt-6 px-2">
      <div className="flex justify-between text-white pb-2">
        <Badge className="pr-10 " pClassName="font-semibold">
          {title}
        </Badge>
        <p className="text-sm ">
          {" "}
          Slide {current} of {count}
        </p>n
      </div>
      <Carousel
        setApi={setApi}
        onMouseEnter={() => stopAutoplay()}
        onMouseLeave={() => startAutoplay()}
        className="w-full max-w-full mx-auto  relative "
        opts={{ loop: true, align: "start" }}
        aria-live="polite"
      >
        <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <InstagramEmbed />
          </CarouselItem>
        ))}
        </CarouselContent>
        <CarouselPrevious
          onClick={handlePrevious}
          className="left-1 cursor-pointer hidden sm:flex opacity-30"
          aria-label="Previous Slide"
        />
        <CarouselNext
          onClick={handleNext}
          className="right-1 cursor-pointer hidden sm:flex opacity-30"
          aria-label="Next Slide"
        />
      </Carousel>
    </div>
  );
}
