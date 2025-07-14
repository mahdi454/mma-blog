// components/EmbedComponentView.tsx
"use client";

import React, { useEffect } from "react";

interface EmbedProps {
  type: string;
  src: string;
  title?: string;
}

export default function EmbedComponent({ type, src, title }: EmbedProps) {
  switch (type) {
    case "youtube": {
      const youtubeId = extractYoutubeId(src);
      if (!youtubeId)
        return <div className="text-red-500">Invalid YouTube URL</div>;

      return (
        <figure className="w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-md"
          />
          {title && (
            <figcaption className="text-center text-xs text-gray-500 mt-1 italic">
              {title}
            </figcaption>
          )}
        </figure>
      );
    }

    case "twitter":
      return (
        <figure className="w-full max-w-lg mx-auto bg-white rounded-md shadow overflow-hidden">
          <blockquote className="twitter-tweet" data-dnt="true">
            <a href={src} target="_blank" rel="noopener noreferrer">
              {title || "View on Twitter"}
            </a>
          </blockquote>
          {title && (
            <figcaption className="text-center text-xs text-gray-500 mt-1 italic">
              {title}
            </figcaption>
          )}
          <TwitterScript />
        </figure>
      );

    case "instagram":
      return (
        <figure className="instagram-embed w-full max-w-lg mx-auto">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={src}
            data-instgrm-version="14"
          >
            <a href={src} target="_blank" rel="noopener noreferrer">
              {title || "View on Instagram"}
            </a>
          </blockquote>
          {title && (
            <figcaption className="text-center text-xs text-gray-500 mt-1 italic">
              {title}
            </figcaption>
          )}
          <InstagramScript />
        </figure>
      );

    default:
      return <div className="text-red-500">Unsupported embed type</div>;
  }
}

// Extract YouTube video ID from various URL formats
function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Load Twitter widget script
const TwitterScript = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};

// Load Instagram embed script
const InstagramScript = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};


// "use client";

// import React, { useEffect } from "react";

// interface EmbedProps {
//   type: string;
//   src: string;
//   title?: string;
// }

// export default function EmbedComponent({ type, src, title }: EmbedProps) {
//   switch (type) {
//     case "youtube": {
//       const youtubeId = extractYoutubeId(src);
//       if (!youtubeId) return <div className="text-red-500">Invalid YouTube URL</div>;
//       return (
//         <div className="w-full aspect-video my-6">
//           <iframe
//             src={`https://www.youtube.com/embed/${youtubeId}`}
//             title={title || "YouTube Video"}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="w-full h-full rounded-md"
//           />
//           {title && (
//             <p className="text-sm text-gray-500 mt-2 italic text-center">{title}</p>
//           )}
//         </div>
//       );
//     }

//     case "twitter":
//       return (
//         <div className="w-full my-6">
//           <blockquote className="twitter-tweet">
//             <a href={src} target="_blank" rel="noopener noreferrer">
//               {title || "View Tweet"}
//             </a>
//           </blockquote>
//           <TwitterScript />
//           {title && (
//             <p className="text-sm text-gray-500 mt-2 italic text-center">{title}</p>
//           )}
//         </div>
//       );

//     case "instagram":
//       return (
//         <div className="w-full my-6 max-w-xl mx-auto">
//           <blockquote
//             className="instagram-media"
//             data-instgrm-permalink={src}
//             data-instgrm-version="14"
//             style={{ background: "#FFF", border: 0, margin: "1px", padding: 0 }}
//           >
//             <a href={src} target="_blank" rel="noopener noreferrer">
//               {title || "View on Instagram"}
//             </a>
//           </blockquote>
//           <InstagramScript />
//           {title && (
//             <p className="text-sm text-gray-500 mt-2 italic text-center">{title}</p>
//           )}
//         </div>
//       );

//     default:
//       return <div className="text-red-500">Unsupported embed type</div>;
//   }
// }

// // -------- Helpers --------

// // Extract YouTube video ID
// function extractYoutubeId(url: string): string | null {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return match && match[2].length === 11 ? match[2] : null;
// }

// // Load Twitter widget script
// function TwitterScript() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://platform.twitter.com/widgets.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
//   return null;
// }

// // Load Instagram embed script
// function InstagramScript() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://www.instagram.com/embed.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
//   return null;
// }
