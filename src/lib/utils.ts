import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Content } from "@tiptap/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeSince(date: string): string {
  const now = Date.now();
  const dateObject = new Date(date);
  const seconds = Math.floor((now - dateObject.getTime()) / 1000);

  if (seconds < 60) {
    return "just now";
  } else if (seconds < 3600) {
    // Less than an hour
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes == 1 ? "minute ago" : "minutes ago"}`;
  } else if (seconds < 86400) {
    // Less than a day
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours == 1 ? "hour ago" : "hours ago"} `;
  }
  // else if (seconds < 2592000) {
  //   // Less than a month
  //   const days = Math.floor(seconds / 86400);

  //   return `${days} ${days == 1 ? "day ago" : "days ago"}`;
  // }
  else {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(dateObject);
  }
}



// Find the first image in the content
export function findFirstImage(content: Content): { src: string; alt: string } | null {
  if (!content) return null;
  
  let image = null;
  
  const findImage = (node: any): { src: string; alt: string } | null => {
    if (!node) return null;
    
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = findImage(item);
        if (found) return found;
      }
      return null;
    }
    
    if (node.type === 'image') {
      return {
        src: node.attrs?.src,
        alt: node.attrs?.alt || '',
      };
    }
    
    if (node.content) {
      return findImage(node.content);
    }
    
    return null;
  };
  
  return findImage(content);
}



// Helper function to extract plain text from Tiptap JSON
export function extractTextFromContent(content: any): string {
  if (!content) return '';
  
  if (typeof content === 'string') return content;
  
  if (Array.isArray(content)) {
    return content.map(node => extractTextFromContent(node)).join(' ');
  }
  
  if (content.type === 'text') {
    return content.text || '';
  }
  
  if (content.content) {
    return extractTextFromContent(content.content);
  }
  
  return '';
}

// Helper to find title in content
export function findTitle(content: any): string | null {
  if (!content || !Array.isArray(content)) return null;
  
  // Find the first h1 heading
  const h1Node = content.find(
    node => node.type === 'heading' && node.attrs?.level === 1
  );
  
  if (h1Node?.content) {
    return extractTextFromContent(h1Node.content);
  }
  
  return null;
}