"use client";

import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Content } from "@tiptap/react";
import MinimalTiptapEditor from "./minimal-tiptap";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SendIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import SendArticleForm from "./components/publish/sendForPublish";
import type { Article } from "@/utils/types";



export default function EditorPageClient({ article }: { article?: Article }) {
  const [content, setContent] = useState<Content>(article?.blocks || "");
  const [open, setOpen] = React.useState(false);
  return (
    <TooltipProvider delayDuration={0}>
      <div className="max-w-5xl mx-auto">
        <MinimalTiptapEditor
          value={content}
          onChange={setContent}
          className={cn(
            "h-full min-h-56 w-full rounded-sm bg-black/50 backdrop-blur-[1px]"
          )}
          editorContentClassName="overflow-auto h-full"
          output="json"
          placeholder="Edit your article..."
          editable
          editorClassName="px-2 py-1 h-full"
        />
        <div className="mt-6 text-right bg-transparent">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <SendIcon className="mr-2" />
                Submit for Publishing
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white">
              <DialogHeader>
                <DialogTitle>Submit Article for Review</DialogTitle>
              </DialogHeader>
              <SendArticleForm
                content={content}
                onClose={() => setOpen(false)}
                article={article}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
