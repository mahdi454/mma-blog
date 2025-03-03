import Image from "next/image";
import { Block } from "../../admin/new-article/useBlockStore";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { cn, timeSince } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Article } from "@/utils/types";
import Script from "next/script";




const socialLinks = [
  { Icon: Facebook, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube, href: "#" },
];

type RenderBlockProps = {
  block: Block;
  index: number;
  blocks: Article;
};

const RenderBlock: React.FC<RenderBlockProps> = async ({
  block,
  index,
  blocks,
}) => {
  const parseContent = (text: string) => {
    // Bold: **text**
    let parsedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Links: [text](url)
    parsedText = parsedText.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" style="color: blue; text-decoration: underline;">$1</a>'
    );

    return parsedText;
  };

  // Sanitize embed code to prevent XSS attacks
  // const sanitizeEmbedCode = (code: string) => {
  //   return DOMPurify.sanitize(code);
  // };

  switch (block.type) {
    case "text":
      return (
        <p
          className="text-gray-50 px-2 sm:px-0"
          dangerouslySetInnerHTML={{ __html: parseContent(block.content) }}
        />
      );
    case "h1":
      if (index === 1) {
        return (
          <div className="relative w-full text-white z-30 py-1 sm:py-0">
            <div className="flex justify-center items-center mt-2">
              <Badge
                className="w-56 pr-0 rounded-none"
                sClassName=""
                pClassName="font-semibold"
              >
                <span className="flex items-center gap-2">
                  <span>
                    <Clock width={14} />
                  </span>
                  <p className="text-sm"> {timeSince(blocks.created_at)}</p>
                </span>
              </Badge>
              <div className="w-full h-1 bg-emerald-700" />
            </div>
            <h1
              className="text-2xl sm:text-4xl text-gray-50 font-bold px-2 sm:px-0 pt-1"
              dangerouslySetInnerHTML={{ __html: parseContent(block.content) }}
            />
            <div className="mt-5 px-2 sm:px-0 flex justify-between items-center">
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
        );
      } else {
        return (
          <h1
            className="text-2xl sm:text-4xl text-gray-50 font-bold px-2 sm:px-0"
            dangerouslySetInnerHTML={{ __html: parseContent(block.content) }}
          />
        );
      }
    case "h2":
      return (
        <h2
          className=" text-xl sm:text-2xl text-gray-50 font-semibold px-2 sm:px-0"
          dangerouslySetInnerHTML={{ __html: parseContent(block.content) }}
        />
      );
    case "image":
      return (
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] bg-gray-100">
          <Image
            width={1140}
            height={760}
            src={block.url}
            alt={block.desc || "Image"}
            className={cn(
              `w-full h-full object-cover object-[center_${block.centered}%] bg-gray-950`
            )}
          />
          {block.desc && (
            <p className=" text-xs font-semibold text-gray-500">{block.desc}</p>
          )}
        </div>
      );
    case "embed":
      if (block.embedType === "instagram") {
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html:  block.code }} />
            <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
          </>
        );
      }
      if (block.embedType === "twitter") {
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html:  block.code }} />
            <Script
              src="https://platform.twitter.com/widgets.js"
              strategy="lazyOnload"
            />
          </>
        );
      }
      if (block.embedType === "youtube") {
        return (
          <div
            className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] [&_iframe]:w-[100%!important] [&_iframe]:h-[100%!important]"
            dangerouslySetInnerHTML={{ __html:  block.code }}
          />
        );
      }
    default:
      return null;
  }
};

export default RenderBlock;
