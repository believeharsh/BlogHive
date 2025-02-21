import React from "react";
import { useState } from "react";

const MessComponent = ({ message, children }) => {
  const [showMess, setShowMess] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowMess(true)}
      onMouseLeave={() => setShowMess(false)}
    >
      {children}
      {showMess && (
        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap">
          {message}
        </div>
      )}
    </div>
  );
};

export default MessComponent;
