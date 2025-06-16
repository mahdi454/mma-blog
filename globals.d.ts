// globals.d.ts
declare global {
  interface Window {
    instgrm: {
      Embeds?: {
        process: () => void;
      };
    };
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | undefined) => void;
      };
    };
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export {};
