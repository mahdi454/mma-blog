"use client";
import * as React from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { EmbedMedia } from "@/utils/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path as needed
import { DialogClose } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { embedService } from "@/services/embedService";

const categories = ["Youtube", "Twitter", "Instagram"];
const badges = ["Featured", "Normal", "Hot"];

export const EmbedBlock = () => {
  const { profile: user } = useUser();
  const [rawKeywords, setRawKeywords] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState<Partial<EmbedMedia>>({
    embed_code: "",
    type: "Youtube",
    caption: "",
    badge: "Featured",
    keywords: [],
  });



  const handleChange = React.useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
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

  const handleSubmit = React.useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
  
        try {
          if (!user) throw new Error("You must be logged in");
      
            await embedService.createEmbed({
              ...formData,
              author_id: user.id,
            } as EmbedMedia);
          
  
          // router.push("/admin")
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
          console.log(err)
        } finally {
          setIsSubmitting(false);
          close()
        }
      },
      [formData, user]
    );
  

  return (
       <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="grid gap-2">
        <Label htmlFor="embed-url">Embed Code</Label>
        <Input
          className="bg-black/50"
          id="embed-url"
          placeholder={`Paste embed code here`}
        value={formData.embed_code}
          onChange={(e) =>  setFormData((p) => ({ ...p, embed_code: e.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="embed-title">Title (optional)</Label>
        <Input
          className="bg-black/50"
          id="embed-title"
          placeholder="Title for accessibility"
          value={formData.caption}
          onChange={(e) =>  setFormData((p) => ({ ...p, caption: e.target.value }))}
        />
      </div>
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

      <div className="flex gap-4 items-center justify-between w-full">
        <div className="grid gap-2 w-full">
          <Label htmlFor="embed-type">Platform</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>  setFormData((p) => ({ ...p, type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full">
          <Label>Badge</Label>
          <Select
            value={formData.badge}
            onValueChange={(value) =>
              setFormData((p) => ({ ...p, badge: value }))
            }
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
      </div>
      <div className="flex justify-end gap-3 mt-3">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
      </form>
  );
};

export default EmbedBlock;

