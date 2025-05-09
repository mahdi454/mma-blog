// import Modal from "@/components/ui/modals";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import React, { useRef, useState } from "react";
// import { type Block } from "./page";

// type SetBlocks = React.Dispatch<React.SetStateAction<Block[]>>;
// // type TextContentType = {
// //   id: string;
// //   type: "text" | "h1" | "h2";
// //   content: string;
// // };

// interface TextBlockProps {
//   block: Block;
//   setBlocks: SetBlocks;
// }

// const TextBlock: React.FC<TextBlockProps> = ({ block, setBlocks }) => {
//   if (block.type !== "text" && block.type !== "h1" && block.type !== "h2") {
//     return null; // Prevent rendering for non-text blocks
//   }

//   const editorRef = useRef<HTMLTextAreaElement>(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [linkUrl, setLinkUrl] = useState("");
//   const [selectionRange, setSelectionRange] = useState<Range | null>(null);

//   // Handle text selection
//   const handleTextSelection = () => {
//     const selection = window.getSelection();
//     if (selection && selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);
//       if (range && !range.collapsed) {
//         setSelectionRange(range);
//         setIsPopupOpen(true); // Open popup to add the link
//       }
//     }
//   };

//   // Insert link into selected text
//   const insertLink = () => {
//     if (selectionRange && editorRef.current) {
//       const anchor = document.createElement("a");
//       anchor.href = linkUrl;
//       anchor.textContent = selectionRange.toString();
//       anchor.target = "_blank"; // Optional: Open link in a new tab
//       selectionRange.deleteContents(); // Remove selected text
//       selectionRange.insertNode(anchor); // Insert the link
//       setIsPopupOpen(false);
//       setLinkUrl("");
//     }
//   };
//   // Update block content
//   const updateBlockContent = (id: string, content: string) => {
//     setBlocks((prevBlocks) =>
//       prevBlocks.map((b) => (b.id === id ? { ...b, content } : b))
//     );
//   };

//   // Reset the height to auto to calculate new height
//   const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = event.target;
//     textarea.style.height = "auto";
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   };

//   return (
//     <div className="relative">
//       <textarea
//         ref={editorRef}
//         onMouseUp={handleTextSelection}
//         rows={1}
//         onInput={handleInput}
//         value={block.content}
//         onChange={(e) => updateBlockContent(block.id, e.target.value)}
//         placeholder="Start typing..."
//         className={cn(
//           "bg-slate-700 border-l-1 border-gray-500 w-full outline-none px-2",
//           {
//             "text-4xl": block.type === "h1",
//             "text-2xl": block.type === "h2",
//           }
//         )}
//       />
//       {isPopupOpen && (
//         <div className=" text-gray-50 h-40 w-44 bg-gray-500">hleiio</div>
//       )}
//     </div>
//   );
// };

// export default TextBlock;
