import * as React from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface ImageEditBlockProps {
  editor: Editor
  close: () => void
}

export const ImageEditBlock: React.FC<ImageEditBlockProps> = ({
  editor,
  close,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [link, setLink] = React.useState("")
  const [imageInfo, setImageInfo] = React.useState("")
  console.log("Inserted content", editor.getJSON())
  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFile = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) return

      const insertImages = async () => {
        const contentBucket = []
        const filesArray = Array.from(files)

        for (const file of filesArray) {
          contentBucket.push({ src: file })
        }

        editor.commands.setImages(contentBucket)
      }

      await insertImages()
      close()
    },
    [editor, close]
  )

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (link) {
        editor.commands.setImages([{ src: link, title: imageInfo }])
        close()
      }
    },
    [editor, link, close,imageInfo]
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="image-link">Attach an image link</Label>

            <Input
              id="image-link"
              type="url"
              required
              placeholder="https://example.com"
              value={link}
              className="grow mt-1 bg-black/50"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLink(e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="image-info"> Image description            </Label>
            <Input
              id="image-info"
              type="text"
              required
              placeholder="image info"
              value={imageInfo}
              className="grow mt-1 bg-black/50"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImageInfo(e.target.value)
              }
            />


          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>

        </div>
      </div>
      <Separator />
      <Button type="button" className="w-full" onClick={handleClick}>
        Upload from your computer
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFile}
      />
    </form>
  )
}

export default ImageEditBlock
