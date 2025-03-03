// import { createClient } from "@/utils/supabase/server";
// import type { Article } from "@/utils/types";

// export async function getStaticProps() {
//   const supabase = await createClient();

//   try {
//     // Fetch articles by category
//     const { data: ufcArticles, error: ufcError } = await supabase
//       .from("articles")
//       .select("*")
//       .eq("category", "UFC")
//       .order("created_at", { ascending: false })
//       .limit(5);

//     const { data: boxingArticles, error: boxingError } = await supabase
//       .from("articles")
//       .select("*")
//       .eq("category", "Boxing")
//       .order("created_at", { ascending: false })
//       .limit(5);


//     // Fetch articles with the "Hot" badge
//     const { data: hotArticles, error: hotError } = await supabase
//       .from("articles")
//       .select("*")
//       .eq("badge", "HOT")
//       .order("created_at", { ascending: false })
//       .limit(5);

//     // Handle errors
//     if (ufcError || boxingError || hotError) {
//       throw new Error(
//         ufcError?.message ||
//           boxingError?.message ||
//           hotError?.message ||
//           "Error fetching articles"
//       );
//     }

//     return {
//       props: {
//         ufcArticles: ufcArticles || [],
//         boxingArticles: boxingArticles || [],
//         hotArticles: hotArticles || [],
//       },
//       revalidate: 60, // Regenerate every 60 seconds
//     };
//   } catch (error) {
//     return {
//       props: {
//         ufcArticles: [],
//         boxingArticles: [],
//         hotArticles: [],
//         error: (error as Error).message,
//       },
//       revalidate: 60,
//     };
//   }
// }
