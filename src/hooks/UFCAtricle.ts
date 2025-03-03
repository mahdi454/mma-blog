"use client";
import { createClient } from "@/utils/supabase/client";
import type { Article } from "@/utils/types";
import { useEffect, useState } from "react";

export function UFCArticleList() {
  const supabase = createClient();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("categoty", "UFC")
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        setArticles(data);
      } catch (err) {
        const errorMessage =
          (err as Error).message || "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [supabase]);

  return { articles, loading, error };
}