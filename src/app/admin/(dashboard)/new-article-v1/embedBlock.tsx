import Modal from "@/components/ui/modals";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useBlocksStore } from "./useBlockStore";
import { CircleCheck, XCircle } from "lucide-react";
import DropDown from "./dropDown";

type EmbedContentType = {
  id: string;
  type: "embed";
  code: string;
  embedType: string;
};

interface EmbedBlockProps {
  blockId: string;
}

const EmbedBlock: React.FC<EmbedBlockProps> = React.memo(({ blockId }) => {
  const { updateBlock, removeBlock, getBlock } = useBlocksStore(
    (state) => state
  );
  const block = getBlock(blockId);

  // Ensure the block is of type "embed"
  if (!block || block.type !== "embed") {
    return null; // Prevent rendering for non-embed blocks
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [embedBlock, setEmbedBlock] = useState({
    code: block.code || "",
    embedType: block.embedType || "youtube",
  });

  // Reset embedBlock state when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      setEmbedBlock({
        code: block.code || "",
        embedType: block.embedType || "youtube",
      });
    }
  }, [isModalOpen, block.code, block.embedType]);

  useEffect(() => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [block]);

  return (
    <div className="relative group">
      <div className=" bg-gray-950 absolute flex right-0 z-50  gap-2 border-gray-200  border-[1px] px-1 rounded-full group-hover:opacity-95 opacity-0 mr-2">
        <DropDown blockId={block.id} />
        <XCircle
          onClick={() => removeBlock(blockId)}
          width={20}
          className="text-red-500 hover:opacity-75 hover:cursor-pointer"
        />
      </div>
      {/* Display placeholder image if no embed code exists */}
      {block.code === "" ? (
        <Image
          width={1140}
          height={760}
          src="/embed.png"
          alt="Placeholder for embed"
          className="w-full h-full object-cover bg-gray-950 sm:px-2"
        />
      ) : (
        <div key={`${block.id}-${block.embedType}`}>
          {/* Render based on embedType */}
          {block.embedType === "instagram" && (
            <>
              <div dangerouslySetInnerHTML={{ __html: block.code }} />
              <Script
                src="//www.instagram.com/embed.js"
                strategy="lazyOnload"
              />
            </>
          )}
          {block.embedType === "twitter" && (
            <>
              <div dangerouslySetInnerHTML={{ __html: block.code }} />
              <Script
                src="https://platform.twitter.com/widgets.js"
                strategy="lazyOnload"
              />
            </>
          )}
          {block.embedType === "youtube" && (
            <div
              className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] [&_iframe]:w-[100%!important] [&_iframe]:h-[100%!important]"
              dangerouslySetInnerHTML={{ __html: block.code }}
            />
          )}
        </div>
      )}

      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute px-4 py-1 rounded-sm bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-600 border border-gray-600 hover:bg-slate-700 font-semibold"
      >
        Add Embed Code
      </button>

      {/* Modal to edit embed code */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="sm:max-w-[425px] bg-gray-900 border-gray-700 text-gray-50 p-4">
          <div className="mb-2">
            <p className="font-semibold">Add Embed Code</p>
            <p className="text-sm text-gray-400">
              Make changes to the code here. Click save when you're done.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {/* Embed code textarea */}
            <div className="relative w-full h-[200px] bg-gray-800 border border-gray-700 flex items-center justify-center">
              <textarea
                value={embedBlock.code}
                onChange={(e) =>
                  setEmbedBlock({ ...embedBlock, code: e.target.value })
                }
                placeholder="Paste embed code here..."
                className="bg-gray-900 text-gray-50 w-full h-full outline-none p-2"
              />
            </div>
            {/* Embed type dropdown */}
            <div>
              <label
                htmlFor="embedType"
                className="block text-sm font-medium text-gray-100 mb-1"
              >
                Embed Type
              </label>
              <select
                value={embedBlock.embedType}
                onChange={(e) =>
                  setEmbedBlock({
                    ...embedBlock,
                    embedType: e.target.value as EmbedContentType["embedType"],
                  })
                }
                className="w-full px-2 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="youtube">Youtube</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
              </select>
            </div>
            {/* Save changes button */}
            <div className="flex justify-end mt-3">
              <button
                onClick={() => {
                  updateBlock(block.id, {
                    code: embedBlock.code,
                    embedType: embedBlock.embedType,
                  });
                  setIsModalOpen(false);
                }}
                className="px-4 py-1 rounded-sm bg-slate-900 border border-gray-700 hover:bg-slate-800 font-semibold"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default EmbedBlock;
