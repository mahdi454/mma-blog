import { Article } from "@/utils/types";
import { CircleCheckBig, ShieldAlert } from "lucide-react";
import React from "react";

type ArticleFormProps = {
  formData: Partial<Article>;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  error?: string;
  success?: boolean;
};

const categories = ["UFC", "PFL", "ONE Championship", "Boxing"];
const badges=["Normal","Hot", "Breaking News", "Good News"]

export default function ArticleForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  success,
}: ArticleFormProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-8 text-gray-50">Create New Article</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex gap-3">
          <ShieldAlert/>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex gap-3">
          <CircleCheckBig  />
          Article created successfully!
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6 ">
        <div>
          <label
            htmlFor="keywords"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
           Key words
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={formData.keywords || ""}
            onChange={onChange}
            placeholder="#people, #event..."
            required
            className="w-full px-4 py-1 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-gray-400 text-sm flex gap-1"><span><ShieldAlert width={18}/></span> each key-words must start with #</span>
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
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isSubmitting ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
}
