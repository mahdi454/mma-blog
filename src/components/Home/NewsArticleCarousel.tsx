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
import { Badge } from "../ui/badge";
import { timeSince } from "@/lib/utils";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function NewsArticleCarousel({
  articles,
  title,
  isBadge,
}: {
  articles: Article[];
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
        </p>
      </div>
      <Carousel
        setApi={setApi}
        onMouseEnter={() => stopAutoplay()}
        onMouseLeave={() => startAutoplay()}
        className="w-full max-w-full mx-auto  relative "
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent>
          {articles.map((article, index) => (
            <CarouselItem
              key={index}
              className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className=" flex flex-col h-full rounded-md overflow-hidden shadow-md bg-slate-950">
                {/* Image */}
                <div className="relative w-full h-48 md:h-60 lg:h-64 bg-gray-100">
                  {article.blocks[0].type==="image" ? (
                    <>
                      {isBadge && (
                        <Badge
                          className="absolute top-4 rounded-none w-20 pr-4 opacity-80"
                          pClassName=""
                        >
                          {article.category || "Unknown"}
                        </Badge>
                      )}
                      <Image
                        width={1000}
                        height={500}
                        src={article.blocks[0].url || ""}
                        alt={article.blocks[0].desc || "Image"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement; // Assert type
                          target.src =
                            "https://via.placeholder.com/1000x500?text=Image+Not+Available"; // Fallback image
                        }}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      <p className="text-gray-500 text-sm">
                        No Image Available
                      </p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow px-3 py-2 bg-gray-200">
                  <h3 className="text-lg font-semibold line-clamp-3">
                    {article.blocks[1].type==="h1" ? article.blocks[1].content : "Untitled"}
                  </h3>
                  <div className="w-full flex justify-between items-center mt-3">
                    <Link href={`/articles/${article.id}`}>
                      <button className=" self-start text-blue-600 hover:text-blue-800 group">
                        Read More{" "}
                        <span className="text-xl font-extrabold scale-95 group-hover:scale-110">
                          &rarr;
                        </span>
                      </button>
                    </Link>
                    <div className="flex items-center gap-1">
                      <span>
                        <Clock width={14} />
                      </span>
                      <p className="text-sm">
                        {" "}
                        {timeSince(article.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            // <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
            //   <div className="flex flex-col rounded-lg overflow-hidden  ">
            //     <Badge className="absolute top-4 rounded-none w-24 pr-4 opacity-60">
            //       {article.category}
            //     </Badge>
            //     <Image
            //       width={1000}
            //       height={500}
            //       src={article.image_url || ""}
            //       alt={article.title}
            //       className="w-full  object-cover"
            //     />
            //     <div className="px-2 pt-1 bg-gray-200">
            //       <h3 className="text-xl font-bold">{article.title}</h3>
            //       <button className="mt-2 text-blue-600 hover:text-blue-800 group mb-2">
            //         Read More{" "}
            //         <span className="text-xl font-extrabold scale-95 group-hover:scale-110">
            //           &rarr;
            //         </span>
            //       </button>
            //     </div>
            //   </div>
            // </CarouselItem>
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
