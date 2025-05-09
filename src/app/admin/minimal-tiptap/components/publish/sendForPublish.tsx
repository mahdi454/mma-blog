"use client"

import { useCallback, useState } from "react"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { articleService } from "@/services/articleService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import type { Article } from "@/utils/types"
import type { Content } from "@tiptap/react"

interface Props {
  content: Content
  onClose: () => void
}

const categories = ["UFC", "PFL", "ONE Championship", "Boxing"]
const badges = ["Featured", "Normal", "Hot"]

export default function SendArticleForm({ content, onClose }: Props) {
  const { profile: user } = useUser()
  const [rawKeywords, setRawKeywords] = useState("");

  const [formData, setFormData] = useState<Partial<Article>>({
    category: "UFC",
    badge: "Normal",
    keywords: [],
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "keywords") {
        setRawKeywords(value); // Just update the string
        const keywordArray = value
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k !== "");

        setFormData((prev) => ({
          ...prev,
          keywords: keywordArray,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );



  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError("")

      try {
        if (!user) throw new Error("You must be logged in")

        await articleService.createArticle({
          ...formData,
          author_id: user.id,
          blocks: content,
        } as Article)

        // router.push("/admin")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setIsSubmitting(false)
        onClose()
      }
    },
    [formData, content, user, onClose]
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="grid gap-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Input
          type="text"
          name="keywords"
          value={rawKeywords}
          onChange={handleChange}
          placeholder="e.g. UFC 300, Dana White, Abu Dhabi"
          className="bg-black/50"
        />


      </div>

      <div className="grid gap-2">
        <Label>Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData((p) => ({ ...p, category: value }))}
        >
          <SelectTrigger className="bg-black/50">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Badge</Label>
        <Select
          value={formData.badge}
          onValueChange={(value) => setFormData((p) => ({ ...p, badge: value }))}
        >
          <SelectTrigger className="bg-black/50">
            <SelectValue placeholder="Select badge" />
          </SelectTrigger>
          <SelectContent>
            {badges.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}
