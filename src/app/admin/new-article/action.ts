import { createClient } from "@/utils/supabase/client";
import type { Article } from "@/utils/types";

const supabase = createClient();

export const articleService = {
  async createArticle(
    article: Omit<Article, "id" | "created_at" | "updated_at">
  ) {
    const { data, error } = await supabase
      .from("articles")
      .insert({ ...article, published: false })
      .select()
      .single();

    if (error) throw error;
    return data as Article;
  },

    async getArticleById(id: string) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Article;
    },

    async publishArticle(id: string) {
      const { error } = await supabase
        .from("articles")
        .update({ published: true })
        .eq("id", id);

      if (error) throw error;
    },
    async getArticles(category?: string): Promise<Article[]> {
      let query = supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      // Add category filter if provided
      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query; // Execute the query
      if (error) throw error; // Handle error
      return data as Article[]; // Return the result
    },
    async deleteArticle(id: string) {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
  
};
