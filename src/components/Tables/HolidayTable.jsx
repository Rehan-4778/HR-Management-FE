import moment from "moment/moment";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";

const HolidayTable = ({
  headings,
  list,
  allowDelete,
  allowEdit,
  onDelete,
  onEdit,
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const handleEditClick = (item) => {
    onEdit(item);
  };

  return (
    <div className="overflow-x-auto max-h-[100vh]">
      <table className="min-w-full">
        <thead className="bg-gray-200 rounded-lg">
          <tr>
            {headings?.map((heading, index) => (
              <th
                key={index}
                className={`py-3 text-left font-semibold text-[15px] text-gray-600 ${"first:rounded-tl-sm rounded-bl-sm ps-5"} ${
                  index === headings.length - 1
                    ? "last:rounded-tr-sm rounded-br-sm"
                    : ""
                }`}
              >
                {heading}
              </th>
            ))}
            {(allowDelete || allowEdit) && (
              <th className="py-3 pe-10 font-semibold text-[15px] text-gray-700 last:rounded-tr-sm rounded-br-sm text-end">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {list?.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onMouseEnter={() => setHoveredRowIndex(rowIndex)}
              onMouseLeave={() => setHoveredRowIndex(null)}
            >
              <td className="px-1 text-sm h-12 border-b border-gray-200 font-medium text-gray-700 ps-5">
                {item.name}
              </td>
              <td className="px-1 text-sm h-12 border-b border-gray-200 font-medium text-gray-700">
                {moment(item.date).format("MMMM D (dddd)")}
              </td>
              <td className="px-1 text-sm h-12 border-b border-gray-200 font-medium text-gray-700">
                {item.description}
              </td>

              {(allowDelete || allowEdit) && (
                <td className="px-1 text-sm border-b border-gray-200 text-end pr-5">
                  {hoveredRowIndex === rowIndex && (
                    <div>
                      {allowEdit && (
                        <button
                          type="button"
                          className="mr-1 border-[1.3px] p-2 rounded-sm border-gray-300"
                          onClick={() => handleEditClick(item)}
                        >
                          <FaPencil className="text-gray-600" size={16} />
                        </button>
                      )}
                      {allowDelete && (
                        <button
                          type="button"
                          className="border-[1.3px] p-2 rounded-sm border-gray-300"
                          onClick={() => onDelete(item._id)}
                        >
                          <FaTrash className="text-gray-600" size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayTable;
