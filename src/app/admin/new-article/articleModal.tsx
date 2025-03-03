"use client";
import React, { useCallback, useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { Article } from "@/utils/types";
import { articleService } from "@/services/articleService";
import { CircleCheckBig, ShieldAlert } from "lucide-react";
import { useBlocksStore } from "./useBlockStore";
import { useRouter } from "next/navigation";

const categories = ["UFC", "PFL", "ONE Championship", "Boxing"];
const badges = ["Featured","Normal", "Hot"];
interface NewArticleProps {
  onClose: () => void;
}
export default function NewArticle({onClose}: NewArticleProps) {
    const blocks = useBlocksStore((state) => state.blocks);
  const {profile:user } = useUser();
  const [formData, setFormData] = useState<Partial<Article>>({
    category: "UFC",
    badge: "Normal",
    keywords: "",
    blocks: blocks,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [keywordError, setKeywordError] = useState("");
  const router = useRouter();
  useEffect(() => {
    setFormData((prev) => ({ ...prev, blocks }));
  }, [blocks]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      if (!user) throw new Error("You must be logged in to create articles");

      await articleService.createArticle({
        ...formData,
        author_id: user.id,
      } as Article);

      setSuccess(true);
      setFormData({
        category: "UFC",
        badge: "Normal",
        keywords: "",
        blocks: blocks,
      });
      onClose()
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, user, blocks]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "keywords") {
      const keywords = value.split(" ").map(keyword => keyword.trim());
      const isValid = keywords.every(keyword => /^#[a-zA-Z0-9-]+$/.test(keyword));
      if (!isValid) {
        setKeywordError("Each keyword must start with # and multiple words separated by -");
      } else {
        setKeywordError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-8 text-gray-50">
        Create New Article
      </h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex gap-3">
          <ShieldAlert />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex gap-3">
          <CircleCheckBig />
          Article created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div>
          <label
            htmlFor="keywords "
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Key words 
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={formData.keywords || ""}
            onChange={handleChange}
            placeholder="#people, #event-1..."
            required
            className="w-full px-2 py-1 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
           {keywordError && (
            <p className="text-red-500 text-sm mt-1">{keywordError}</p>
          )}
         
        </div>

        <div className="w-full">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-100 mb-1 "
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category || "UFC"}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label
            htmlFor="badge"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Badge
          </label>
          <select
            id="badge"
            name="badge"
            value={formData.badge || "Normal"}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {badges.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || keywordError !== ""}
          className="w-full bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isSubmitting ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
}
