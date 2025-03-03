import React, { useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import Popup from "./popup";
import { useBlocksStore } from "./useBlockStore";
import DropDown from "./dropDown";
import { CircleCheck, XCircle } from "lucide-react";
import Modal from "@/components/ui/modals";

type TextBlockProps = {
  blockId: string;
};

const TextBlock: React.FC<TextBlockProps> = React.memo(({ blockId }) => {
  const { updateBlock, removeBlock, getBlock } = useBlocksStore(
    (state) => state
  );
  const block = getBlock(blockId);

  if (block?.type !== "text" && block?.type !== "h1" && block?.type !== "h2") {
    return null; // Prevent rendering for non-text blocks
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rawText, setRawText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState("");

  const validateUrl = (url: string) => {
    const urlPattern = /^https?:\/\/.+/;
    return urlPattern.test(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLinkUrl(value);

    if (!validateUrl(value) && value !== "") {
      setError("Please enter a valid URL: https://...");
    } else {
      setError("");
    }
  };
  // Handle text selection
  const handleTextSelection = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        const selectedText = rawText.slice(start, end);
        setSelectedText(selectedText);
        setSelectionStart(start);
        setSelectionEnd(end);
        setIsPopupOpen(true); // Open popup to add the link or bold
      }
    }
  }, [rawText]);

  // Insert link into selected text
  const insertLink = useCallback(() => {
    if (selectedText && linkUrl) {
      const beforeText = rawText.slice(0, selectionStart);
      const afterText = rawText.slice(selectionEnd);

      // Update formatted content (show link syntax)
      const newContent = `${beforeText}[${selectedText}](${linkUrl})${afterText}`;
      setRawText(newContent);
      // updateBlock(block.id, { content: newContent });

      setIsPopupOpen(false);
      setLinkUrl("");
      setSelectedText("");
    }
  }, [selectedText, linkUrl, selectionStart, selectionEnd, rawText]);

  // Wrap selected text in ** for bold formatting
  const makeBold = useCallback(() => {
    if (selectedText) {
      const beforeText = rawText.slice(0, selectionStart);
      const afterText = rawText.slice(selectionEnd);

      // Update formatted content
      const newContent = `${beforeText}**${selectedText}**${afterText}`;
      setRawText(newContent);
      // updateBlock(block.id, { content: newContent });

      setIsPopupOpen(false);
      setSelectedText("");
    }
  }, [selectedText, selectionStart, selectionEnd, rawText]);
  // Wrap selected text in ** for bold formatting
  const makeQuote = useCallback(() => {
    if (selectedText) {
      const beforeText = rawText.slice(0, selectionStart);
      const afterText = rawText.slice(selectionEnd);

      // Update formatted content
      const newContent = `${beforeText}^^${selectedText}^^${afterText}`;
      setRawText(newContent);
      // updateBlock(block.id, { content: newContent });

      setIsPopupOpen(false);
      setSelectedText("");
    }
  }, [selectedText, selectionStart, selectionEnd, rawText]);

  // Handle textarea resize
  const handleResizeInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    []
  );

  const handleUpdateBlock = useCallback(() => {
    updateBlock(blockId, {
      content: rawText,
      isSaved: rawText.length >= 5 && true,
    });
  }, [rawText, blockId]);
  return (
    <div className="relative group">
      <div className=" bg-gray-950 absolute flex right-0 z-50  gap-2 border-gray-200  border-[1px] px-1 rounded-full group-hover:opacity-95 opacity-0 mr-2">
        <CircleCheck
          width={20}
          className=" hover:opacity-75 hover:cursor-pointer hover:text-lg text-green-500"
          onClick={handleUpdateBlock}
        />
        <DropDown blockId={blockId} />
        <XCircle
          onClick={() => removeBlock(blockId)}
          width={20}
          className="text-red-500 hover:opacity-75 hover:cursor-pointer"
        />
      </div>
      {/* Textarea for input */}
      <textarea
        rows={1}
        ref={textareaRef}
        value={rawText} // Use block.content directly
        onInput={handleResizeInput}
        onChange={(e) => {
          setRawText(e.target.value);
        }}
        onMouseUp={handleTextSelection}
        placeholder="Start typing here..."
        className={cn(
          "bg-gray-950 border-l-2  w-full outline-none px-2",
          {
            "text-4xl": block.type === "h1",
            "text-2xl": block.type === "h2",
          },
          {
            "border-red-500": block.isSaved === false,
            "border-green-500": block.isSaved === true,
          }
        )}
        aria-label="Text input"
      />
      {/* <div dangerouslySetInnerHTML={{ __html: parseContent(block.content) }} /> */}

      <Modal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="">
          <div className="mb-2">
            <p className="font-semibold">
              Target:{" "}
              <span className="text-sm text-gray-400 font-semibold">
                {selectedText}
              </span>
            </p>
          </div>
          <input
            type="url"
            value={linkUrl}
            onChange={handleChange}
            placeholder="Enter link URL"
            className={`w-full p-2 mb-2 bg-inherit border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none${
              error ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            aria-label="Enter link URL"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between">
            <button
              disabled={error===""?false:true}
              onClick={insertLink}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:cursor-not-allowed"
              aria-label="Add Link"
            >
              Add Link
            </button>
            <button
              onClick={makeBold}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              aria-label="Make Bold"
            >
              Make Bold
            </button>
            <button
              onClick={makeQuote}
              className="px-4 py-2 bg-fuchsia-500 text-white rounded-md hover:bg-fuchsia-600 focus:outline-none"
              aria-label="Make Quote"
            >
              Quote
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default TextBlock;
