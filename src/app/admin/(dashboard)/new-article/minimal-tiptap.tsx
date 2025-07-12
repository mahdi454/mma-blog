import * as React from "react"
import "./styles/index.css"

import type { Content, Editor } from "@tiptap/react"
import type { UseMinimalTiptapEditorProps } from "./hooks/use-minimal-tiptap"
import { EditorContent } from "@tiptap/react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { SectionOne } from "./components/section/one"
import { SectionTwo } from "./components/section/two"
import { SectionThree } from "./components/section/three"
import { SectionFour } from "./components/section/four"
import { SectionFive } from "./components/section/five"
import { LinkBubbleMenu } from "./components/bubble-menu/link-bubble-menu"
import { useMinimalTiptapEditor } from "./hooks/use-minimal-tiptap"
import { MeasuredContainer } from "./components/measured-container"

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="sticky top-0 w-full flex justify-center items-center py-2 bg-black/60 backdrop-blur-md z-50">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3]} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={[
          "italic",
          "bold",
          "underline",
          "code",
          "strikethrough",
          "clearFormatting",
        ]}
        mainActionCount={5}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={["bulletList", "orderedList"]}
        mainActionCount={2}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={["blockquote", "codeBlock", "horizontalRule"]}
        mainActionCount={3}
        variant="outline"
      />
    </div>
  </div>
)

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  })

  if (!editor) {
    return null
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
        className
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor", editorContentClassName)}
      />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  )
})

MinimalTiptapEditor.displayName = "MinimalTiptapEditor"

export default MinimalTiptapEditor
