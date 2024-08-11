import React from "react";
import { FaFolder } from "react-icons/fa";

const FolderCard = ({ folders, onClick }) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {folders?.map((folder, index) => (
        <div
          key={index}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 flex flex-col items-center cursor-pointer"
          onClick={() => onClick(folder)}
        >
          <div className="flex items-center mb-2">
            <FaFolder color="#555" size={50} />
          </div>
          <h2 className="text-base font-medium text-center">{folder.name}</h2>
          <p className="text-gray-500 text-sm">{folder.files.length} items</p>
        </div>
      ))}
    </div>
  );
};

export default FolderCard;
