import React from "react";
import type { JSONContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import EmbedComponent from "./embedRender";

interface ArticleRendererProps {
  content: JSONContent;
}

export const ArticleRenderer: React.FC<ArticleRendererProps> = ({
  content,
}) => {
  if (!content || content.type !== "doc" || !Array.isArray(content.content)) {
    return null; // Defensive fallback for corruption
  }

  const skipFlags = {
    hasSkippedH1: false,
    hasSkippedImage: false,
  };

  return <>{renderNodes(content.content, skipFlags)}</>;
};

function renderNodes(
  nodes: JSONContent[],
  skipFlags: { hasSkippedH1: boolean; hasSkippedImage: boolean }
): React.ReactNode {
  if (!nodes || !Array.isArray(nodes)) return null;

  return nodes.map((node, index) => (
    <React.Fragment key={index}>{renderNode(node, skipFlags)}</React.Fragment>
  ));
}

function renderNode(
  node: JSONContent,
  skipFlags: { hasSkippedH1: boolean; hasSkippedImage: boolean }
): React.ReactNode {
  if (!node || typeof node !== "object" || !("type" in node)) return null;

  switch (node.type) {
    case "heading":
      const level = (node.attrs?.level as number) || 1;
      if (level === 1 && !skipFlags.hasSkippedH1) {
        skipFlags.hasSkippedH1 = true; // skip this one
        return null;
      }
      switch (level) {
        case 1:
          return (
            <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-gray-100">
              {renderNodes(node.content as JSONContent[], skipFlags)}
            </h1>
          );
        case 2:
          return (
            <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-3 text-gray-100">
              {renderNodes(node.content as JSONContent[], skipFlags)}
            </h2>
          );
        case 3:
          return (
            <h3 className="text-lg sm:text-xl font-semibold mt-5 mb-2 text-gray-100">
              {renderNodes(node.content as JSONContent[], skipFlags)}
            </h3>
          );
        default:
          return (
            <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-100">
              {renderNodes(node.content as JSONContent[], skipFlags)}
            </h4>
          );
      }

    case "image":
      if (!skipFlags.hasSkippedImage) {
        skipFlags.hasSkippedImage = true; // skip the first image
        return null;
      }
      return (
        <div className="my-6 w-full overflow-hidden">
          <div className="relative w-full h-full lg:h-[500px] flex items-center justify-center overflow-hidden">
            <Image
              width={1140}
              height={720}
              src={node.attrs?.src || ""}
              alt={node.attrs?.alt || "Image"}
              className="w-full h-full object-cover object-[center_10%] bg-gray-950"
            />
            {node.attrs?.title && (
              <p className="absolute bottom-0 right-0 bg-black/65 px-1 text-xs sm:text-sm text-gray-300">
                {node.attrs?.title}
              </p>
            )}
          </div>
        </div>
      );

    case "paragraph":
      return (
        <p className="text-gray-100 mb-4 leading-relaxed">
          {renderNodes(node.content as JSONContent[], skipFlags)}
        </p>
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-4 italic text-gray-100 rounded">
          {renderNodes(node.content as JSONContent[], skipFlags)}
        </blockquote>
      );

    case "bulletList":
      return (
        <ul className="list-disc list-inside mb-4 ml-4">
          {renderNodes(node.content as JSONContent[], skipFlags)}
        </ul>
      );

    case "orderedList":
      return (
        <ol className="list-decimal list-inside mb-4 ml-4">
          {renderNodes(node.content as JSONContent[], skipFlags)}
        </ol>
      );

    case "listItem":
      return (
        <li className="mb-1">
          {node.content?.map((child, idx) => {
            if (child.type === "paragraph") {
              return (
                <React.Fragment key={idx}>
                  {renderNodes(child.content as JSONContent[], skipFlags)}
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={idx}>
                  {renderNode(child, skipFlags)}
                </React.Fragment>
              );
            }
          })}
        </li>
      );

    case "embed":
      return (
        <EmbedComponent
          type={node.attrs?.type}
          src={node.attrs?.src}
          title={node.attrs?.title}
        />
      );

    case "horizontalRule":
      return <hr className="my-6 border-t border-gray-300" />;

    case "text":
      let content: React.ReactNode = node.text;

      if (node.marks && Array.isArray(node.marks)) {
        [...node.marks].reverse().forEach((mark) => {
          content = renderMark(mark, content);
        });
      }

      return content;

    default:
      console.warn(`Unsupported node type: ${node.type}`);
      return null;
  }
}

function renderMark(mark: any, content: React.ReactNode): React.ReactNode {
  switch (mark.type) {
    case "bold":
      return <strong className="font-bold">{content}</strong>;

    case "italic":
      return <em className="italic">{content}</em>;

    case "underline":
      return <span className="underline decoration-1">{content}</span>;

    case "strike":
      return <span className="line-through">{content}</span>;

    case "code":
      return (
        <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">
          {content}
        </code>
      );

    case "link":
      const href = mark.attrs?.href || "#";
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target={mark.attrs?.target || "_blank"}
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {content}
          </a>
        );
      } else {
        return (
          <Link
            href={href}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {content}
          </Link>
        );
      }

    case "textStyle":
      if (mark.attrs?.color) {
        // Handle color variables like var(--mt-accent-green)
        return <span style={{ color: mark.attrs.color }}>{content}</span>;
      }
      return content;

    default:
      console.warn(`Unsupported mark type: ${mark.type}`);
      return content;
  }
}

export default ArticleRenderer;

// Article component without escape first h1 and image
// export const ArticleRenderer: React.FC<ArticleRendererProps> = ({
//   content,
// }) => {
//   if (!content) return null;

//   // Render document node (root level)
//   if (
//     typeof content === "object" &&
//     !Array.isArray(content) &&
//     content !== null &&
//     "type" in content &&
//     content.type === "doc" &&
//     "content" in content
//   ) {
//     return <>{renderNodes(content.content as JSONContent[])}</>;
//   }

//   // If content is an array (like the content property of a node)
//   if (Array.isArray(content)) {
//     return <>{renderNodes(content as JSONContent[])}</>;
//   }

//   return null;
// };

// function renderNodes(nodes: JSONContent[]): React.ReactNode {
//   if (!nodes || !Array.isArray(nodes)) return null;

//   return nodes.map((node, index) => (
//     <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
//   ));
// }

// function renderNode(node: JSONContent): React.ReactNode {
//   if (!node || typeof node !== "object" || !("type" in node)) return null;

//   switch (node.type) {
//     case "paragraph":
//       return (
//         <p className="text-gray-100 mb-4 leading-relaxed">
//           {renderNodes(node.content as JSONContent[])}
//         </p>
//       );

//     case "heading":
//       const level = (node.attrs?.level as number) || 1;
//       switch (level) {
//         case 1:
//           return (
//             <h1 className="text-2xl sm:text-3xl  font-bold mt-8 mb-4 text-gray-100">
//               {renderNodes(node.content as JSONContent[])}
//             </h1>
//           );
//         case 2:
//           return (
//             <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-3 text-gray-100">
//               {renderNodes(node.content as JSONContent[])}
//             </h2>
//           );
//         case 3:
//           return (
//             <h3 className="text-lg sm:text-xl font-semibold mt-5 mb-2 text-gray-100">
//               {renderNodes(node.content as JSONContent[])}
//             </h3>
//           );
//         default:
//           return (
//             <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-100">
//               {renderNodes(node.content as JSONContent[])}
//             </h4>
//           );
//       }

//     case "blockquote":
//       return (
//         <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-4 italic text-gray-100 rounded">
//           {renderNodes(node.content as JSONContent[])}
//         </blockquote>
//       );

//     case "bulletList":
//       return (
//         <ul className="list-disc list-inside mb-4 ml-4">
//           {renderNodes(node.content as JSONContent[])}
//         </ul>
//       );

//     case "orderedList":
//       return (
//         <ol className="list-decimal list-inside mb-4 ml-4">
//           {renderNodes(node.content as JSONContent[])}
//         </ol>
//       );

//     case "listItem":
//       return (
//         <li className="mb-1">
//           {/* Unwrap paragraph nodes inside listItem */}
//           {node.content?.map((child, idx) => {
//             if (child.type === "paragraph") {
//               // Directly render the paragraph's children inline
//               return (
//                 <React.Fragment key={idx}>
//                   {renderNodes(child.content as JSONContent[])}
//                 </React.Fragment>
//               );
//             } else {
//               // Fallback for nested lists or other node types
//               return (
//                 <React.Fragment key={idx}>{renderNode(child)}</React.Fragment>
//               );
//             }
//           })}
//         </li>
//       );

//     case "image":
//       return (
//         <div className="my-6 w-full overflow-hidden">
//           <div className="relative w-full h-full lg:h-[500px] flex items-center justify-center overflow-hidden">
//             <Image
//               width={1140}
//               height={720}
//               src={node.attrs?.src || ""}
//               alt={node.attrs?.alt || "Image"}
//               className="w-full h-full object-cover object-[center_10%] bg-gray-950"
//             />
//             {node.attrs?.title && (
//               <p className="absolute bottom-0 right-0 bg-black/65 px-1 text-xs sm:text-sm text-gray-300">
//                 {node.attrs?.title}
//               </p>
//             )}
//           </div>
//         </div>
//       );

//     case "embed":
//       return (
//         <EmbedComponent
//           type={node.attrs?.type}
//           src={node.attrs?.src}
//           title={node.attrs?.title}
//         />
//       );

//     case "horizontalRule":
//       return <hr className="my-6 border-t border-gray-300" />;

//     case "text":
//       let content: React.ReactNode = node.text;

//       if (node.marks && Array.isArray(node.marks)) {
//         // Apply marks in reverse order to ensure proper nesting
//         [...node.marks].reverse().forEach((mark) => {
//           content = renderMark(mark, content);
//         });
//       }

//       return content;

//     default:
//       console.warn(`Unsupported node type: ${node.type}`);
//       return null;
//   }
// }
