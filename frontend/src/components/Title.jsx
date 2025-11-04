import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-8">
      {/* Title Text */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-wide text-center">
        {text1} <span className="text-gray-900">{text2}</span>
      </h2>

      {/* Underline */}
      <div className="w-16 h-[2px] bg-gray-800 rounded-full"></div>
    </div>
  );
};

export default Title;
