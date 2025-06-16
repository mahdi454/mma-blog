// app/editor/page.tsx
"use client";

import { useState } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Content } from "@tiptap/react";
import MinimalTiptapEditor from "./minimal-tiptap";
import SendForReviewDialog from "./components/publish/pubish-dialog";

export default function EditorPage() {
  const [content, setContent] = useState<Content>("");

  return (
    <TooltipProvider delayDuration={0}>
      <div className="max-w-5xl mx-auto ">
        <MinimalTiptapEditor
          value={content}
          onChange={setContent}
          className={cn("h-full min-h-56 w-full rounded-sm bg-black/50 backdrop-blur-[1px] ")}
          editorContentClassName="overflow-auto h-full"
          output="json"
          placeholder="This is your placeholder..."
          editable
          editorClassName="px-2 py-1 h-full"
        />
      <div className="mt-6 text-right bg-transparent">
        <SendForReviewDialog content={content} />
      </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
