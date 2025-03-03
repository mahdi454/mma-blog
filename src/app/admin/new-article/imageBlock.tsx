import Modal from "@/components/ui/modals";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { useBlocksStore } from "./useBlockStore";
import DropDown from "./dropDown";
import { XCircle } from "lucide-react";


interface ImageBlockProps {
  blockId: string;
}

const ImageBlock: React.FC<ImageBlockProps> = React.memo(({ blockId }) => {
  const { updateBlock, removeBlock, getBlock } = useBlocksStore(
    (state) => state
  );
  const block = getBlock(blockId);

  if (!block || block.type !== "image") {
    return null; // Prevent rendering for non-image blocks
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageBlock, setImageBlock] = useState({
    desc: "",
    url: "",
    centered: "",
  });
  const handleChange = () => {
    updateBlock(block.id, {
      url: imageBlock.url,
      desc: imageBlock.desc,
      centered: Number(imageBlock.centered),
    }),
      setIsModalOpen(false);
  }

  return (
    <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] group">
      <div className=" bg-gray-950 absolute flex right-0 z-50  gap-2 border-gray-200  border-[1px] px-1 rounded-full group-hover:opacity-95 opacity-0 mr-2">
        <DropDown blockId={block.id} />
        <XCircle
          onClick={() => removeBlock(blockId)}
          width={20}
          className="text-red-500 hover:opacity-75 hover:cursor-pointer"
        />
      </div>
      {block.url === "" ? (
        <Image
          width={1140}
          height={760}
          src="/placeholder.webp"
          alt="Getty Image of an event with participants and audience"
          className="w-full h-full object-cover  bg-gray-950 sm:px-2"
        />
      ) : (
        <>
          <Image
            width={1140}
            height={760}
            src={block.url}
            alt="image"
            className={cn(
              `w-full h-full object-cover  sm:px-2 object-[center_${block.centered}%] `
            )}
          />
          <span className="absolute bottom-0 left-0 text-gray-300 px-2">
            {block.desc}
          </span>
        </>
      )}
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute px-4 rounded-sm py-1 bottom-12 left-1/2  transform -translate-x-1/2 bg-gray-600 border-[1px] border-gray-600 hover:bg-slate-700 font-semibold"
        >
          Add Image URL
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="sm:max-w-[425px] bg-gray-900 border-gray-700 text-gray-50 p-2">
            <div className="mb-2">
              <p className="font-semibold">Add Image</p>
              <p className="text-sm text-gray-400">
                Make changes to the image here. Click save when you're done.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-100 mb-1"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="image url..."
                  value={imageBlock.url}
                  onChange={(e) =>
                    setImageBlock({
                      ...imageBlock,
                      url: e.target.value,
                    })
                  }
                  required
                  className="w-full px-2 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-100 mb-1"
                >
                  Image Description
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="image desc..."
                  value={imageBlock.desc}
                  onChange={(e) =>
                    setImageBlock({
                      ...imageBlock,
                      desc: e.target.value,
                    })
                  }
                  className="w-full px-2 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-100 mb-1"
                >
                  Image Location
                </label>
                <select
                  id="badge"
                  name="badge"
                  value={imageBlock.centered || 0}
                  onChange={(e) =>
                    setImageBlock({
                      ...imageBlock,
                      centered: e.target.value,
                    })
                  }
                  className="w-full px-2 py-2 border border-gray-700 outline-none text-slate-50 bg-slate-900 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={index} value={index * 10}>
                      {index * 10}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end mt-3 ">
                <button
                  onClick={handleChange}
                  className="px-4 rounded-sm py-1  bg-slate-900 border-[1px] border-gray-700 hover:bg-slate-800 font-semibold"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
});

export default ImageBlock;
