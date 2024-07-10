import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md h-56 overflow-y-scroll scrollbar-hide">
      {children}
    </div>
  );
};

export default Card;
