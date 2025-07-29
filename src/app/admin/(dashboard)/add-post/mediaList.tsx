import type { EmbedMedia } from "@/utils/types";
import { useCallback } from "react";
import EmbedComponent from "../preview/[id]/embedRender";
export default function MediaList({ media }: { media: EmbedMedia[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4 overflow-hidden justify-center px-4 pt-12 bg-black/5 backdrop-blur-[2px]">
      {media.map((media) => (
          <EmbedComponent
            src={media.embed_code}
            type={media.type.toLocaleLowerCase()}
            title={media.caption}
            key={media.id}
          />
      ))}
    </div>
  );
}
