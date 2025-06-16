// app/components/InstagramVideoEmbed.tsx
"use client";

export default function InstagramEmbed() {
  return (
    <div className={`overflow-hidden `}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DF8KUflJlts/?utm_source=ig_embed&amp;utm_campaign=loading"
        data-instgrm-version="14"
      >
       
      </blockquote>
      <script async src="//www.instagram.com/embed.js"></script>
    </div>
  );
}
