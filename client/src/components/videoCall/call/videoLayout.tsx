import React from "react";

const VideoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const videoElements = React.Children.toArray(children);
  const videoCount = videoElements.length;

  return (
    <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
      <div
        className={`flex-1 relative bg-gray-900 ${videoCount > 1 ? "flex flex-col" : ""}`}
      >
        {videoElements.map((video, index) => (
          <div
            key={index}
            className={`relative ${
              videoCount === 1 ? "w-full h-full" : "w-full h-1/2"
            }`}
          >
            {video}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLayout;
