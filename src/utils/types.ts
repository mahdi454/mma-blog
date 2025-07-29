import type { JSONContent } from "@tiptap/react";

export interface Article {
  id: string;
  category: string;
  author_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  badge: string;
  blocks: JSONContent;
  keywords: string[];
}
export interface EmbedMedia {
  id: string;
  type: string;
  author_id: string;
  published: boolean;
  created_at: string;
  caption: string;
  embed_code: string;
  badge: string;
  keywords: string[];
}

export interface SportsEvent {
  id: string;
  title: string;
  event_date: string;
  organization: string;
  location?: string;
  status: "upcoming" | "ongoing" | "completed";
  created_at: string;
}

export interface Fighter {
  id: string;
  name: string;
  record: string;
  weight_class: string;
  organization: string;
  created_at: string;
  updated_at: string;
}

export interface NavigationItem {
  text: string;
  href: string;
}
