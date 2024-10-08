import React, { useState, useEffect, useRef } from "react";
import { FaFileAlt, FaEllipsisV } from "react-icons/fa";
import { format } from "date-fns";

const FileCard = ({ file, onDelete, onClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(file._id);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div
      className="relative border rounded-lg px-8 py-5 shadow-sm bg-white flex items-center cursor-pointer
      hover:shadow-inner transition duration-100 ease-in-out"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <FaFileAlt className="text-gray-500 w-12 h-12 text-center" />
        <div className="font-medium mt-2">{file.name}</div>
        <div className="text-gray-500 text-xs">
          {format(new Date(file.uploadDate), "MMMM d, yyyy")}
        </div>
      </div>
      <div className="absolute top-3 right-1" ref={dropdownRef}>
        <button
          onClick={(e) => handleToggleDropdown(e)}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <FaEllipsisV />
        </button>
        {showDropdown && (
          <div className="absolute left-0 bg-white border rounded shadow-lg z-10">
            <button
              onClick={(e) => handleDelete(e)}
              className="block w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-100 focus:outline-none"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileCard;
