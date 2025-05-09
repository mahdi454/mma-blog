import React, { useRef, useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useBlocksStore } from "./useBlockStore";
import DropDown from "./dropDown";
import { 
  Bold, 
  CircleCheck, 
  Heading1, 
  Heading2, 
  Italic, 
  Link, 
  Quote, 
  Underline, 
  XCircle,
  List
} from "lucide-react";

type TextBlockProps = {
  blockId: string;
};

// Function to convert markdown-like syntax to HTML
const parseMarkdown = (text: string): string => {
  let html = text;

  // Process list items first to prevent conflicts
  const lines = html.split('\n');
  let inList = false;
  let processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith('-- ')) {
      if (!inList) {
        inList = true;
        processedLines.push('<ul class="list-disc my-2">');
      }
      const listItemContent = line.replace(/^-- /, '');
      processedLines.push(`<li class="ml-5">${listItemContent}</li>`);
    } else {
      if (inList) {
        inList = false;
        processedLines.push('</ul>');
      }
      processedLines.push(line);
    }
  }
  
  if (inList) {
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');

  // Headings (avoid conflicts with bold/italic)
  html = html.replace(/!! (.*?)(?:\n|$)/g, '<h1 class="text-3xl font-bold my-2">$1</h1>');
  html = html.replace(/## (.*?)(?:\n|$)/g, '<h2 class="text-xl font-bold my-2">$1</h2>');

  // Bold: **text** to <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic: *text* to <em>text</em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links: [text](url) to <a href="url">text</a>
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 underline">$1</a>');

  // Quote: ^^text^^ to <span class="italic text-gray-500">"text"</span>
  html = html.replace(/\^\^(.*?)\^\^/g, '<span class="italic text-gray-500">"$1"</span>');

  // Underline: __text__ to <u>text</u>
  html = html.replace(/__(.*?)__/g, '<u>$1</u>');

  return html;
};

// Function to determine text type
const determineTextType = (text: string): string => {
  // Check for headings
  if (text.trim().startsWith("!! ")) return "H1";
  if (text.trim().startsWith("## ")) return "H2";
  
  // Check for list - if any line starts with "-- "
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith("-- ")) return "List";
  }
  
  return "Paragraph";
};

const TextBlock: React.FC<TextBlockProps> = React.memo(({ blockId }) => {
  const { updateBlock, removeBlock, getBlock } = useBlocksStore(
    (state) => state
  );
  const block = getBlock(blockId);

  if (block?.type !== "text") {
    return null; // Prevent rendering for non-text blocks
  }

  // State
  const [rawText, setRawText] = useState(block.content || "");
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [textType, setTextType] = useState(determineTextType(block.content || ""));
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  // Load content when block changes
  useEffect(() => {
    setRawText(block.content || "");
    setTextType(determineTextType(block.content || ""));
  }, [block.id, block.content]);

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
      }
    }
  }, [rawText]);

  // Insert link into selected text
  const insertLink = useCallback(() => {
    if (selectedText && linkUrl && !error) {
      const beforeText = rawText.slice(0, selectionStart);
      const afterText = rawText.slice(selectionEnd);

      // Update formatted content (show link syntax)
      const newContent = `${beforeText}[${selectedText}](${linkUrl})${afterText}`;
      setRawText(newContent);
      updateBlock(blockId, { content: newContent, txtType: textType });

      // Reset states
      setLinkUrl("");
      setSelectedText("");
      setShowLinkInput(false);
    }
  }, [selectedText, linkUrl, error, selectionStart, selectionEnd, rawText, blockId, updateBlock, textType]);

  const applyFormatting = useCallback((prefix: string, suffix: string) => {
    if (selectedText) {
      const beforeText = rawText.slice(0, selectionStart);
      const afterText = rawText.slice(selectionEnd);
      const newContent = `${beforeText}${prefix}${selectedText}${suffix}${afterText}`;

      setRawText(newContent);
      // If adding a list item, update the text type
      if (prefix === "-- ") {
        setTextType("List");
        updateBlock(blockId, { content: newContent, txtType: "List" });
      } else {
        updateBlock(blockId, { content: newContent, txtType: textType });
      }
      setSelectedText("");
    } else if (prefix === "!! " || prefix === "## " || prefix === "-- ") {
      // Special case for headings and lists - add at beginning of line
      const textarea = textareaRef.current;
      if (textarea) {
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = rawText.substring(0, cursorPos);
        const textAfterCursor = rawText.substring(cursorPos);
        
        // Find the beginning of the current line
        const lastNewLineIndex = textBeforeCursor.lastIndexOf('\n');
        const lineStart = lastNewLineIndex !== -1 ? lastNewLineIndex + 1 : 0;
        
        // Check if the line already has a prefix
        const currentLine = rawText.substring(lineStart, cursorPos + 
          rawText.substring(cursorPos).indexOf('\n') === -1 ? 
          rawText.length : 
          cursorPos + rawText.substring(cursorPos).indexOf('\n'));
          
        const hasPrefix = /^(?:!! |## |-- )/.test(currentLine);
        
        let newContent;
        if (hasPrefix) {
          // Replace existing prefix
          newContent = 
            textBeforeCursor.substring(0, lineStart) + 
            prefix + 
            currentLine.replace(/^(?:!! |## |-- )/, "") + 
            textAfterCursor.substring(
              textAfterCursor.indexOf('\n') === -1 ? 
              textAfterCursor.length : 
              textAfterCursor.indexOf('\n')
            );
        } else {
          // Add prefix to line
          newContent = 
            textBeforeCursor.substring(0, lineStart) + 
            prefix + 
            textBeforeCursor.substring(lineStart) + 
            textAfterCursor;
        }
        
        setRawText(newContent);
        
        // Update text type based on prefix
        let newTextType = "Paragraph";
        if (prefix === "!! ") newTextType = "H1";
        else if (prefix === "## ") newTextType = "H2";
        else if (prefix === "-- ") newTextType = "List";
        
        setTextType(newTextType);
        updateBlock(blockId, { content: newContent, txtType: newTextType });
        
        // Set cursor after the prefix
        setTimeout(() => {
          if (textarea) {
            textarea.selectionStart = lineStart + prefix.length;
            textarea.selectionEnd = lineStart + prefix.length;
            textarea.focus();
          }
        }, 0);
      }
    }
  }, [selectedText, rawText, selectionStart, selectionEnd, blockId, updateBlock, textType]);

  // Formatting actions
  const makeBold = useCallback(() => applyFormatting("**", "**"), [applyFormatting]);
  const makeItalic = useCallback(() => applyFormatting("*", "*"), [applyFormatting]);
  const makeUnderline = useCallback(() => applyFormatting("__", "__"), [applyFormatting]);
  const makeQuote = useCallback(() => applyFormatting("^^", "^^"), [applyFormatting]);
  const makeH1 = useCallback(() => applyFormatting("!! ", ""), [applyFormatting]);
  const makeH2 = useCallback(() => applyFormatting("## ", ""), [applyFormatting]);
  const makeList = useCallback(() => applyFormatting("-- ", ""), [applyFormatting]);

  // Handle text type change
  const handleTextTypeChange = useCallback((newType: string) => {
    // If changing to list and text already contains content
    if (newType === "List" && rawText.trim() && !rawText.includes("-- ")) {
      // If text already has multiple lines, add the list marker to each line
      if (rawText.includes('\n')) {
        const lines = rawText.split('\n');
        const newContent = lines.map(line => line.trim() ? `-- ${line}` : line).join('\n');
        setRawText(newContent);
        setTextType(newType);
        updateBlock(blockId, { content: newContent, txtType: newType });
        return;
      } else {
        // If single line content, convert to list item
        const newContent = `-- ${rawText}`;
        setRawText(newContent);
        setTextType(newType);
        updateBlock(blockId, { content: newContent, txtType: newType });
        return;
      }
    }
    
    // For headings
    if ((newType === "H1" || newType === "H2") && rawText.trim()) {
      let prefix = newType === "H1" ? "!! " : "## ";
      
      // If there are multiple lines, only apply to first line
      if (rawText.includes('\n')) {
        const lines = rawText.split('\n');
        // Remove any existing heading prefix from first line
        lines[0] = lines[0].replace(/^(?:!! |## |-- )/, "");
        // Add new heading prefix
        lines[0] = `${prefix}${lines[0]}`;
        const newContent = lines.join('\n');
        setRawText(newContent);
        setTextType(newType);
        updateBlock(blockId, { content: newContent, txtType: newType });
        return;
      } else {
        // Remove any existing prefix
        let contentWithoutPrefix = rawText.replace(/^(?:!! |## |-- )/, "");
        const newContent = `${prefix}${contentWithoutPrefix}`;
        setRawText(newContent);
        setTextType(newType);
        updateBlock(blockId, { content: newContent, txtType: newType });
        return;
      }
    }
    
    // Converting from formatted content to paragraph - remove formatting
    if (newType === "Paragraph") {
      let newContent = "";
      
      if (textType === "List") {
        // Remove list markers
        const lines = rawText.split('\n');
        newContent = lines.map(line => line.replace(/^-- /, "")).join('\n');
      } else if (textType === "H1" || textType === "H2") {
        // Remove heading markers from first line only
        const lines = rawText.split('\n');
        lines[0] = lines[0].replace(/^(?:!! |## )/, "");
        newContent = lines.join('\n');
      } else {
        newContent = rawText;
      }
      
      setRawText(newContent);
      setTextType(newType);
      updateBlock(blockId, { content: newContent, txtType: newType });
      return;
    }
    
    setTextType(newType);
    updateBlock(blockId, { content: rawText, txtType: newType });
  }, [rawText, blockId, updateBlock, textType]);

  // Handle textarea resize
  const handleResizeInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    []
  );

  // Save content when focus is lost
  const handleBlur = useCallback(() => {
    updateBlock(blockId, { content: rawText, txtType: textType });
  }, [blockId, rawText, updateBlock, textType]);

  // Toggle link input dialog
  const toggleLinkInput = useCallback(() => {
    if (selectedText) {
      setShowLinkInput(!showLinkInput);
    }
  }, [selectedText, showLinkInput]);

  return (
    <div ref={blockRef} className="relative group/block">
      {/* Block actions menu - Only visible on hover */}
      <div className="absolute right-0 bottom-0 flex gap-2 border-gray-200 border-[1px] px-1 rounded-full opacity-0 group-hover/block:opacity-95 transition-opacity">
        <DropDown blockId={blockId} />
        <XCircle
          onClick={() => removeBlock(blockId)}
          width={20}
          className="text-red-500 hover:opacity-75 hover:cursor-pointer"
        />
      </div>

      {/* Formatting toolbar */}
      {!previewMode && (
        <div className="w-full flex flex-wrap items-center mb-2 gap-2 bg-gray-900 p-2 rounded-md">
          {/* Text Type Selector */}
          <select 
            value={textType} 
            onChange={(e) => handleTextTypeChange(e.target.value)}
            className="bg-gray-800 rounded px-2 py-1 text-sm mr-2"
          >
            <option value="Paragraph">Paragraph</option>
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="List">List</option>
          </select>
          
          <button
            onClick={makeBold}
            className="p-1 hover:bg-gray-800 rounded"
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={makeItalic}
            className="p-1 hover:bg-gray-800 rounded"
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={makeUnderline}
            className="p-1 hover:bg-gray-800 rounded"
            title="Underline"
          >
            <Underline size={16} />
          </button>
          <button
            onClick={makeQuote}
            className="p-1 hover:bg-gray-800 rounded"
            title="Quote"
          >
            <Quote size={16} />
          </button>
          <button
            onClick={makeH1}
            className="p-1 hover:bg-gray-800 rounded"
            title="Heading 1"
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={makeH2}
            className="p-1 hover:bg-gray-800 rounded"
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>
          <button
            onClick={makeList}
            className="p-1 hover:bg-gray-800 rounded"
            title="List Item"
          >
            <List size={16} />
          </button>

          <div className="relative">
            <button
              disabled={!selectedText}
              onClick={toggleLinkInput}
              className={`p-1 hover:bg-gray-800 rounded disabled:opacity-50 ${showLinkInput ? 'bg-gray-700' : ''}`}
              title="Add Link"
            >
              <Link size={16} />
            </button>
            
            {showLinkInput && (
              <div className="absolute z-10 left-0 top-full mt-1 bg-gray-800 p-2 rounded shadow-lg w-64">
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-300">Adding link to: "{selectedText}"</div>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="bg-gray-700 p-1 rounded text-sm"
                  />
                  {error && <div className="text-xs text-red-400">{error}</div>}
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setShowLinkInput(false)}
                      className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={insertLink}
                      disabled={!linkUrl || !!error}
                      className="text-xs px-2 py-1 bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600"
                    >
                      Insert
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ml-auto">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-sm"
            >
              Preview
            </button>
          </div>
        </div>
      )}

      {/* Edit or Preview mode */}
      {!previewMode ? (
        <textarea
          rows={1}
          ref={textareaRef}
          value={rawText}
          onInput={handleResizeInput}
          onChange={(e) => {
            setRawText(e.target.value);
            // Update text type when content changes, but only if it contains list markers
            const newType = determineTextType(e.target.value);
            if (newType !== textType) {
              setTextType(newType);
            }
          }}
          onMouseUp={handleTextSelection}
          onKeyUp={handleTextSelection}
          onBlur={handleBlur}
          placeholder="Start typing here..."
          className={cn(
            "bg-gray-950 border-l-2 w-full outline-none px-2 py-1  resize-none",
            "border-l-blue-500"
          )}
          aria-label="Text input"
        />
      ) : (
        <div
          className={cn(
            "bg-gray-950 border-l-2 border-l-gray-700 w-full px-2 py-1 ",
          )}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(rawText) }}
          onClick={() => setPreviewMode(false)} // Click to edit
        />
      )}
      
    </div>
  );
});

export default TextBlock;