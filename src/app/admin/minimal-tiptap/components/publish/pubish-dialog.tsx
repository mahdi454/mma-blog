"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Send, SendIcon } from "lucide-react"
import type { Content } from "@tiptap/react"
import React from "react"
import SendArticleForm from "./sendForPublish"
import { Button } from "@/components/ui/button"

interface Props {
  content: Content
}

export default function SendForReviewDialog({ content }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
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
        <SendArticleForm content={content} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
