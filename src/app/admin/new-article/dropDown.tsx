import React from "react";
import {
  AArrowDown,
  Code,
  Heading1,
  Heading2,
  ImageDownIcon,
  XCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PlusCircle } from "lucide-react";
import { useBlocksStore } from "./useBlockStore";

interface DropDownProps {
  blockId: string;
}
const DropDown: React.FC<DropDownProps> = React.memo(({ blockId }) => {
  const addBlock = useBlocksStore((state) => state.addBlock);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <PlusCircle
          width={20}
          className="text-gray-50  hover:opacity-75 hover:cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-gray-900 text-gray-50 border-gray-800">
        <DropdownMenuLabel>INSERT what?...</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem onClick={() => addBlock("text", blockId)}>
          Add Text
          <DropdownMenuShortcut>
            <AArrowDown width={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addBlock("h1", blockId)}>
          Heading 1
          <DropdownMenuShortcut>
            <Heading1 width={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addBlock("h2", blockId)}>
          Heading 2
          <DropdownMenuShortcut>
            <Heading2 width={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem onClick={() => addBlock("embed", blockId)}>
          Embed
          <DropdownMenuShortcut>
            <Code width={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addBlock("image", blockId)}>
          Image
          <DropdownMenuShortcut>
            <ImageDownIcon width={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default DropDown;
