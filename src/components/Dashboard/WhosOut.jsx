import React from "react";

const WhosOut = ({ date, message }) => {
  return (
    <div className="mb-2">
      <div className="text-gray-500 text-xs font-semibold">{date}</div>
      <div className="text-sm">{message}</div>
    </div>
  );
};

export default WhosOut;
