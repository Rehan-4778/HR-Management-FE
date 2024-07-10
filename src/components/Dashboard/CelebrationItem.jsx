import React from "react";

const CelebrationItem = ({ imgSrc, name, date, description }) => {
  return (
    <div className="flex items-center space-x-4 py-2 border-b last:border-b-0">
      <img src={imgSrc} alt={name} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs text-gray-500">
          {date} - {description}
        </div>
      </div>
      <div className="text-gray-400">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 2a1 1 0 000 2h8a1 1 0 000-2H6zM4 6a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V6z" />
        </svg>
      </div>
    </div>
  );
};

export default CelebrationItem;
