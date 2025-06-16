"use client"
import * as React from 'react'
import type { Editor } from "@tiptap/react"
import type { VariantProps } from "class-variance-authority"
import type { toggleVariants } from "@/components/ui/toggle"
import { ToolbarButton } from "../toolbar-button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Youtube } from 'lucide-react'
import EmbedBlock from './embedBlock'



// If you don't have UI components, you can replace them with standard HTML elements

interface EmbedDialogProps extends VariantProps<typeof toggleVariants> {
    editor: Editor
}

const EmbedDialog: React.FC<EmbedDialogProps> = ({ editor,size,variant }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ToolbarButton
                    isActive={editor.isActive("embed")}
                    tooltip="Embed"
                    aria-label="Embed"
                    size={size}
                    variant={variant}
                >
                    <Youtube className="size-5" />
                </ToolbarButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Embed Media</DialogTitle>
                    <DialogDescription>
                        Add YouTube videos, tweets, or Instagram posts to your content.
                    </DialogDescription>
                </DialogHeader>
                <EmbedBlock editor={editor} close={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

export default EmbedDialog