import { create } from "zustand";

type ContentType = "text" | "image" | "embed";

type ImageContentType = {
  id: string;
  type: "image";
  url: string;
  desc: string;
  centered: number;
};

type EmbedContentType = {
  id: string;
  type: "embed";
  code: string;
  embedType: string;
};

type TextContentType = {
  id: string;
  type: "text";
  content: string;
  txtType:string;

};

export type Block = TextContentType | ImageContentType | EmbedContentType;

type BlocksStore = {
  blocks: Block[];
  addBlock: (type: ContentType, afterId: string) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, newContent: Partial<Block>) => void;
  getBlock: (id: string) => Block | undefined;

};

// Create the Zustand store
export const useBlocksStore = create<BlocksStore>((set, get) => ({
  blocks: [{ id: Date.now().toString(), type: "text", content: "", txtType:"Paragraph" }],

  // Add a new block
  addBlock: (type, afterId) =>
    set((state) => {
      let newBlock: Block;

      switch (type) {
        case "text":
          newBlock = {
            id: Date.now().toString(),
            type: "text",
            content: "",
            txtType: "Paragraph"

          };
          break;
        case "image":
          newBlock = {
            id: Date.now().toString(),
            type: "image",
            url: "",
            desc: "",
            centered: 0,
          };
          break;
        case "embed":
          newBlock = {
            id: Date.now().toString(),
            type: "embed",
            code: "",
            embedType: "",
          };
          break;
        default:
          throw new Error(`Invalid block type: ${type}`);
      }

      const index = state.blocks.findIndex((block) => block.id === afterId);
      const newBlocks = [...state.blocks];
      newBlocks.splice(index + 1, 0, newBlock); // Insert new block after the specified block

      return { blocks: newBlocks };
    }),

  // Remove a block
  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    })),

  // Update a block
  updateBlock: (id, newContent) =>
    set(
      (state) =>
      ({
        blocks: state.blocks.map((block) =>
          block.id === id ? { ...block, ...newContent } : block
        ),
      } as Partial<BlocksStore>)
    ),

  // Get a specific block by ID
  getBlock: (id) => {
    const { blocks } = get();
    return blocks.find((block: Block) => block.id === id);
  },
}));
