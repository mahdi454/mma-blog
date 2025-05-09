"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Article } from "@/utils/types";
import { useCarousel } from "@/hooks/useCarousel";
import Link from "next/link";
import { timeSince } from "@/lib/utils";
import { Clock, MoveRight } from "lucide-react";

export default function FeaturedArticle({
  hotArticles,
  error,
}: {
  hotArticles: Article[];
  error: string | null;
}) {
  const {
    setApi,
    handleNext,
    stopAutoplay,
    startAutoplay,
    handlePrevious,
    current,
  } = useCarousel({
    autoplay: true,
    interval: 5000,
  });

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading articles</div>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
      onMouseEnter={() => {
        stopAutoplay();
      }}
      onMouseLeave={() => {
        startAutoplay();
      }}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {hotArticles.map((article, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[370px] sm:h-[520px] lg:h-[720px] overflow-hidden rounded-sm">
              <div className="absolute inset-0 shadow-inner-container pointer-events-none z-10" />
              {article.blocks[0].type === "image" && (
                <Image
                  width={1300}
                  height={700}
                  src={article.blocks[0].url}
                  alt="Article Image"
                  className="w-full h-full object-cover object-[center_15%]"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0  bg-gradient-to-t  from-gray-950 to-transparent z-20" />
              <div className="absolute bottom-0 left-0 px-2 py-6 sm:px-12 sm:py-10 text-white z-30">


                <div className="bg-emerald-700  px-3 py-1 relative clip-arrow w-44 font-semibold rounded-l-sm">
                  <span className="flex items-center gap-2">
                    <span>
                      <Clock width={18} />
                    </span>
                    <p className="text-sm"> {timeSince(article.created_at)}</p>
                  </span>
                </div>
                {article.blocks[1].type === "h1" &&
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-4 mb-2 max-w-4xl">
                    {article.blocks[1].content}
                  </h1>}
                <Link href={`/test2/${article.id}`}>
                  <button className="relative border border-emerald-600  px-[2px] py-[2px] rounded-full group overflow-hidden mt-3 ">
                    <span className="border border-emerald-600 rounded-full px-12 py-1  font-semibold flex items-center gap-2 ">
                      Read More
                      <span><MoveRight size={18}/></span>
                    </span>
                  </button>

                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        onClick={handlePrevious}
        className="left-1 cursor-pointer opacity-20 hidden sm:flex"
        aria-label="Previous Slide"
      />
      <CarouselNext
        onClick={handleNext}
        className="right-1 cursor-pointer opacity-20 hidden sm:flex"
        aria-label="Next Slide"
      />
      <div className="absolute flex gap-3 bottom-0 left-1/2  transform -translate-x-1/2  py-2 text-center text-sm text-gray-400">
        {hotArticles.map((_, idx) => (
          <div key={idx} className="w-3 sm:w-6">
            <div className="w-full bg-gray-400 h-1 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${idx + 1 === current
                  ? "bg-emerald-700 ease-linear"
                  : "bg-gray-400"
                  }`}
                style={{
                  width: idx + 1 === current ? `100%` : "100%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Carousel>
  );
}
