import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { timeSince } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Clock } from "lucide-react";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ slag: string }>;
}) {
  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Youtube, href: "#" },
  ];
  const supabase = await createClient();
  const id = (await params).slag;
  try {
    const { data: article, error: err } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();
    if (err) {
      throw new Error(err?.message || "Error fetching articles");
    }
    return (
      <MaxWidthWrapper className="max-w-screen-lg">
        <div className=" flex flex-col overflow-hidden shadow-md bg-gray-950">
          {/* Image */}
          <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] bg-gray-100">
            {article.image_url ? (
              <Image
                width={1140}
                height={760}
                src={article.image_url}
                alt={article.title || "Image"}
                className="w-full h-full object-cover object-[center_20%] bg-gray-950"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <p className="text-gray-500 text-sm">No Image Available</p>
              </div>
            )}
          </div>
          <div className="relative w-full py-8  text-white z-30">
            <div className="flex justify-center items-center">
              <Badge
                className=" w-52 pr-0 rounded-none "
                sClassName=""
                pClassName="font-semibold "
              >
                <span className="flex items-center gap-2">
                  <span>
                    <Clock width={14} />
                  </span>
                  <p className="text-sm"> {timeSince(article.created_at)}</p>
                </span>
              </Badge>
              <div className="w-full h-1 bg-emerald-700" />
            </div>
            <h1 className="text-3xl font-bold mt-4 mb-2 max-w-4xl px-2">
              {article.title}
            </h1>
            <div className="mt-5 px-2 flex justify-between items-center">
              <p>Created by Mahdi Hassani</p>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="text-white font-semibold text-lg px-2">
            {article.content}
          </p>
          {/* <div className="w-full flex justify-center items-center ">
            {" "}
            <iframe
              width="1060"
              height="615"
              src="https://www.youtube.com/embed/RudLmL9kCSY?si=86XK3hb-Es3zE4Jg&amp;clip=Ugkx2KF0uemgqombxu37nj0pl6S8f8H37bZn&amp;clipt=EKzOAhiMowY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div> */}
        </div>
      </MaxWidthWrapper>
    );
  } catch (error) {
    return (
      <div className="text-gray-200">
        Failed to load: {(error as Error).message}
      </div>
    );
  }
}
