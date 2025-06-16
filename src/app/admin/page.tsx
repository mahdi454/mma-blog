import { getUser } from "@/queries/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminArticleList from "./(dashboard)/_components/articleList";
import ParallaxScroll from "./(dashboard)/_components/locoWrapper";

export default async function PrivatePage() {
  const supabase = await createClient();
  const userData = await getUser();
  if (!userData?.email) {
    redirect("/admin/sign-in");
  }
  try {
    const { data: articles, error: articlesErr } = await supabase
      .from("articles")
      .select("*")
      .eq("author_id", userData.id)
      .order("created_at", { ascending: false });
    if (articlesErr) {
      throw new Error(articlesErr?.message || "Error fetching articles");
    }

    // return <AdminArticleList articles={articles} error={null} />;
    return <ParallaxScroll/>
  } catch (error) {
    return <AdminArticleList error={(error as Error).message} articles={[]} />;
  }
}



