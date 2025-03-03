import MaxWidthWrapper from "@/components/maxWidthWrapper";
import Post from "./post";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: { slag: string };
}) {
  const supabase = await createClient();
  const id = params.slag;
  try {
    const { data: article, error: err } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();
    if (err) {
      throw new Error(err?.message || "Error fetching articles");
    }
    return (
      <MaxWidthWrapper className="max-w-screen-xl">
        <Post blocks={article} />
      </MaxWidthWrapper>
    );
  } catch (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Failed to load: {(error as Error).message}
      </div>
    );
  }
}
