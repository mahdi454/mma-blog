import { createClient } from "@/utils/supabase/client";
import type { EmbedMedia } from "../utils/types";

const supabase = createClient(); 

export const embedService = {
async getEmbed(category?: string): Promise<EmbedMedia[]> {
    let query = supabase
        .from("social_media")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as EmbedMedia[];
},

async createEmbed(embed: Omit<EmbedMedia, "id" | "created_at" >) {
    const { data, error } = await supabase
        .from("social_media")
        .insert({ ...embed, published: false })
        .select()
        .single();

    if (error) throw error;
    return data as EmbedMedia;
},

async updateEmbed(
    id: string,
    updates: Partial<Omit<EmbedMedia, "id" | "created_at" >>
) {
    const { data, error } = await supabase
        .from("social_media")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data as EmbedMedia;
},

async getEmbedById(id: string) {
    const { data, error } = await supabase
        .from("social_media")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as EmbedMedia;
},

async publishEmbed(id: string) {
    const { error } = await supabase
        .from("social_media")
        .update({ published: true })
        .eq("id", id);

    if (error) throw error;
},

  
};
