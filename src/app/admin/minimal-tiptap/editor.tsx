// app/editor/page.tsx
"use client"

import React, { useState } from "react"

import type { Content } from "@tiptap/react"
import { useToast } from "@/hooks/use-toast"
import MinimalTiptapEditor from "./minimal-tiptap"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"


export default function EditorPage() {
    const { toast } = useToast()
    const [content, setContent] = useState<Content>('')
    console.log(content)
    return (


        <TooltipProvider delayDuration={0}>
            <div className="max-w-5xl mx-auto">
                <MinimalTiptapEditor
                    value={content}
                    throttleDelay={3000}
                    className={cn("h-full min-h-56 w-full rounded-xl")}
                    editorContentClassName="overflow-auto h-full"
                    output="json"
                    onChange={(value) => {
                        console.log(value)
                    }}
                    placeholder="This is your placeholder..."
                    editable={true}
                    editorClassName="focus:outline-none px-5 py-4 h-full"
                />
            </div>
            <Toaster />
        </TooltipProvider>
    )
}

