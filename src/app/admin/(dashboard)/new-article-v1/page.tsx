"use client";
import MaxWidthWrapper from "@/components/wrapper/maxWidthWrapper";
import ImageBlock from "./imageBlock";
import EmbedBlock from "./embedBlock";
import TextBlock from "./textBlock";
import { useBlocksStore } from "./useBlockStore";

import withAuth from "../../withAuth";

const ArticleEditor: React.FC = () => {
  const blocks = useBlocksStore((state) => state.blocks);
  console.log(blocks)

  return (
    <MaxWidthWrapper className="max-w-screen-2xl ">
      <div className="relative text-gray-50 flex flex-col gap-2 max-w-5xl ">
        {blocks.map((block) => (
          <div key={block.id}>
            {block.type === "text" ? (
              <TextBlock blockId={block.id} />
            ) : block.type === "image" ? (
              <ImageBlock blockId={block.id} />
            ) : block.type === "embed" ? (
              <EmbedBlock blockId={block.id} />
            ) : null}
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default withAuth(ArticleEditor);
