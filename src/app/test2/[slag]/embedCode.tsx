// "use client";
// import DOMPurify from "dompurify";
// import Script from "next/script";

// type EmbedBlockProps = {
//   code: string;
//   type: string;
// };

// const EmbedBlock: React.FC<EmbedBlockProps> = ({ code,type }) => {

//   const sanitizeEmbedCode = (embedCode: string) => {
//     return DOMPurify.sanitize(embedCode);
//   };
//   if (type === "instagram") {
//     return (
//       <>
//         <div dangerouslySetInnerHTML={{ __html:  sanitizeEmbedCode(code) }} />
//         <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
//       </>
//     );
//   }
//   if (type === "twitter") {
//     return (
//       <>
//         <div dangerouslySetInnerHTML={{ __html:  sanitizeEmbedCode(code) }} />
//         <Script
//           src="https://platform.twitter.com/widgets.js"
//           strategy="lazyOnload"
//         />
//       </>
//     );
//   }
//   if (type === "youtube") {
//     return (
//       <div
//         className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] [&_iframe]:w-[100%!important] [&_iframe]:h-[100%!important]"
//         dangerouslySetInnerHTML={{ __html:  sanitizeEmbedCode(code) }}
//       />
//     );
//   }


// };

// export default EmbedBlock;