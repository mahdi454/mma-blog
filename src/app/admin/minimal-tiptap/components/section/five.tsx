import * as React from "react"
import type { Editor } from "@tiptap/react"
import type { FormatAction } from "../../types"
import type { toggleVariants } from "@/components/ui/toggle"
import type { VariantProps } from "class-variance-authority"

import { LinkEditPopover } from "../link/link-edit-popover"
import { ImageEditDialog } from "../image/image-edit-dialog"
import { ToolbarSection } from "../toolbar-section"
import {  ChevronDown, CodeIcon, DivideCircleIcon, InstagramIcon, PlusIcon, QuoteIcon, TwitterIcon, YoutubeIcon } from "lucide-react"
import EmbedDialog from "../embed/embedDialog"

type InsertElementAction = "codeBlock" | "blockquote" | "horizontalRule"
interface InsertElement extends FormatAction {
  value: InsertElementAction
}
type InsertEmbedAction = "embedYoutube" | "embedInstagram" | "embedX"

interface InsertEmbedEl extends FormatAction {
  value: InsertEmbedAction
}


const formatActions: InsertElement[] = [
  {
    value: "codeBlock",
    label: "Code block",
    icon: <CodeIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCodeBlock().run(),
    shortcuts: ["mod", "alt", "C"],
  },
  {
    value: "blockquote",
    label: "Blockquote",
    icon: <QuoteIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBlockquote().run(),
    shortcuts: ["mod", "shift", "B"],
  },

  {
    value: "horizontalRule",
    label: "Divider",
    icon: <DivideCircleIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor) =>
      editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ["mod", "alt", "-"],
  },
]


interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: InsertElementAction[]
  mainActionCount?: number
}

export const SectionFive: React.FC<SectionFiveProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 0,
  size,
  variant,
}) => {
  return (
    <>
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      <ImageEditDialog editor={editor} size={size} variant={variant} />
      <EmbedDialog editor={editor} size={size}  variant={variant}/>
      <ToolbarSection
        editor={editor}
        actions={formatActions}
        activeActions={activeActions}
        mainActionCount={mainActionCount}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <ChevronDown className="size-5" />
          </>
        }
        dropdownTooltip="Insert elements"
        size={size}
        variant={variant}
      />
    </>
  )
}

SectionFive.displayName = "SectionFive"

export default SectionFive
