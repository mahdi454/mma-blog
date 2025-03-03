import { useBlocksStore } from "@/app/admin/new-article/useBlockStore";

export const useBlock = (id: string) =>
  useBlocksStore((state) =>
    state.blocks.find((block) => block.id === id)
  );

