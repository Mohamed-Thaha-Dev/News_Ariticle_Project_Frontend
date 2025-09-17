import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const UploadBox = ({ onFilesSelect,reset }) => {
  const [previewFiles, setPreviewFiles] = useState([]);
    const [error, setError] = useState("");


     useEffect(() => {
    if (reset) {
      setPreviewFiles([]);
      onFilesSelect([]);
    }
  }, [reset, onFilesSelect]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
      if (previewFiles.length + files.length > 3) {
      setError("Maximum of 3 files allowed.");
      setTimeout(() => {
        setError("")
      }, 4000);
      return;
    }
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previewFiles, ...newPreviews];
    setPreviewFiles(updatedPreviews);
    onFilesSelect(updatedPreviews.map((item) => item.file)); // Pass files back to parent
  };

  const handleRemove = (index) => {
    const updatedPreviews = [...previewFiles];
    updatedPreviews.splice(index, 1);
    setPreviewFiles(updatedPreviews);
    onFilesSelect(updatedPreviews.map((item) => item.file)); // Update parent
  };

  return (
    <div>
      {/* Main Upload Box */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg w-full h-80 cursor-pointer relative">
        <AiOutlinePlus size={50} className="text-gray-500" />
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
           {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-2 text-center">{error}</p>
      )}

      {/* Preview Thumbnails */}
      {previewFiles.length > 0 && (
        <div className="flex flex-wrap mt-4 gap-4">
          {previewFiles.map((item, index) => (
            <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
              {["mp4", "webm", "ogg"].includes(item.file.type.split("/")[1]) ? (
                <video
                  src={item.preview}
                  className="w-full h-full object-cover"
                 
                />
              ) : (
                <img
                  src={item.preview}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
              )}
              <button
                type="button"
                className="absolute top-1 right-1 bg-gray-800 text-white cursor-pointer rounded-full p-1"
                onClick={() => handleRemove(index)}
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadBox;
