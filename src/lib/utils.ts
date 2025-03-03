import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
