
import * as React from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select' // Adjust the import path as needed


interface EmbedBlockProps {
    editor: Editor
    close: () => void
}

export const EmbedBlock: React.FC<EmbedBlockProps> = ({
    editor,
    close,
}) => {

    const [embedType, setEmbedType] = React.useState<'youtube' | 'twitter' | 'instagram'>('youtube')
    const [embedUrl, setEmbedUrl] = React.useState('')
    const [title, setTitle] = React.useState('')

    const handleInsertEmbed = () => {
        if (!editor || !embedUrl.trim()) return

        editor.commands.setEmbed({
            src: embedUrl,
            type: embedType,
            title: title || undefined
        })

        // Reset form
        setEmbedUrl('')
        setTitle('')
        close()
    }


    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="embed-type">Platform</Label>
                <Select
                    value={embedType}
                    onValueChange={(value: any) => setEmbedType(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="embed-url">URL</Label>
                <Input
                className="bg-black/50"
                    id="embed-url"
                    placeholder={`Paste ${embedType} URL here`}
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="embed-title">Title (optional)</Label>
                <Input
                className="bg-black/50"
                    id="embed-title"
                    placeholder="Title for accessibility"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={close}>
                    Cancel
                </Button>
                <Button onClick={handleInsertEmbed}>Insert</Button>
            </div>
        </div>

    )
}

export default EmbedBlock
