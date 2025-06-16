import { useBlocksStore } from "@/app/admin/(dashboard)/new-article-v1/useBlockStore";

export const useBlock = (id: string) =>
  useBlocksStore((state) =>
    state.blocks.find((block) => block.id === id)
  );

