
"use client";
import MaxWidthWrapper from "@/components/wrapper/maxWidthWrapper";

import React, { useRef, useState, useEffect } from "react";
import { XCircle, PlusCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ContentType = "text" | "image" | "embed";
type Block = {
  id: string;
  type: ContentType;
  content: string;
};

const TextEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: Date.now().toString(), type: "text", content: "" },
  ]);
  const lastBlockRef = useRef<HTMLDivElement | null>(null);

  // Focus on the last added block
  useEffect(() => {
    if (lastBlockRef.current) {
      lastBlockRef.current.focus();
    }
  }, [blocks]);

  const addBlock = (type: ContentType) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: "",
    };

    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const updateBlockContent = (id: string, newContent: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  const removeBlock = (id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  return (
    <MaxWidthWrapper className="max-w-screen-xl">
      <div className="relative text-gray-50 flex flex-col gap-6">
        {blocks.map((block, index) => (
          <div key={block.id} className="relative w-full">
            <div className="absolute -left-16 flex gap-2 border-gray-800 border-[1px] px-1 rounded-full">
              <XCircle
                onClick={() => removeBlock(block.id)}
                width={20}
                className="text-gray-50 opacity-25 hover:opacity-65 hover:cursor-pointer"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <PlusCircle width={20} className="text-gray-50 opacity-25" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                  <DropdownMenuLabel>Add Content</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => addBlock("text")}>
                    Add Paragraph
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("image")}>
                    Add Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("embed")}>
                    Add H1
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div
              ref={index === blocks.length - 1 ? lastBlockRef : null} // Set ref for the last block
              contentEditable={block.type !== "image"} // Make text and embed editable
              suppressContentEditableWarning
              onInput={(e) => {
                const content = (e.target as HTMLDivElement).innerText || "";
                updateBlockContent(block.id, content);
              }}
              onKeyDown={(e) => {
                // Prevent default behavior for Enter key if needed
                if (e.key === "Enter" && block.type !== "text") {
                  e.preventDefault();
                }
              }}
              className={`group w-full ${
                block.type !== "image" ? "cursor-text" : ""
              }`}
              style={{ direction: "ltr" }} // Ensure text direction is left-to-right
            >
              {block.type === "text" ? (
                <p>{block.content}</p>
              ) : block.type === "image" ? (
                <img src="/placeholder.jpg" alt="Placeholder" />
              ) : (
                <h2 className="text-xl">{block.content || "Add a heading"}</h2>
              )}
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default TextEditor;