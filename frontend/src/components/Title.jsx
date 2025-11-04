import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center justify-center gap-4 my-10">
      {/* Left Line */}
      <div className="hidden sm:block w-60 h-[2px] bg-gray-400 rounded-full"></div>

      {/* Title Text */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-wide text-center">
        {text1}{" "}
        <span className="text-transparent bg-clip-text bg-blue-700">
          {text2}
        </span>
      </h2>

      {/* Right Line */}
      <div className="hidden sm:block w-60 h-[2px] bg-gray-400 rounded-full "></div>
    </div>
  );
};

export default Title;
