import React from "react";
import { FaFolder } from "react-icons/fa";
import { HiDownload, HiFolderAdd } from "react-icons/hi";

const DocumentManagement = ({ folders }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-green-600">Documents</h1>
      </div>
      <div className="flex justify-between space-x-2 border-b mb-10">
        <div className="flex gap-3 h-8">
          <button className="text-green1 font-semibold px-3 py-[1.5px] rounded-sm flex items-center text-sm border border-green1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Upload
          </button>
          <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded flex items-center">
            <HiFolderAdd className="w-5 h-5" />
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search documents..."
            className="border border-gray-300 rounded text-sm px-3 py-[6px] w-full"
          />
          <button className="border-gray-500 border px-3 py-1 rounded ml-2">
            <HiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex flex-col items-center"
          >
            <div className="flex items-center mb-2">
              <FaFolder color="#555" size={50} />
            </div>
            <h2 className="text-base font-medium text-center">{folder.name}</h2>
            <p className="text-gray-500 text-sm">{folder.items} items</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManagement;
