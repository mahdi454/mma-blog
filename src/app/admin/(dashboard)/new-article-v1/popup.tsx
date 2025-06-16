const Popup: React.FC<{
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  onInsertLink: () => void;
  onMakeBold: () => void;
  onClose: () => void;
}> = ({ linkUrl, setLinkUrl, onInsertLink, onMakeBold, onClose }) => {
  return (
    <div className="absolute top-0 left-1/2  transform -translate-x-1/2 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="Enter link URL"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Enter link URL"
        />
        <div className="flex gap-2">
          <button
            onClick={onInsertLink}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Add Link"
          >
            Add Link
          </button>
          <button
            onClick={onMakeBold}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Make Bold"
          >
            Make Bold
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup