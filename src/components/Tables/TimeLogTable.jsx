import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TimeLogTable = ({
  headings,
  list,
  allowDelete,
  allowEdit,
  onDelete,
  onEdit,
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const calculateTotalWorkingHours = (
    clockIn,
    clockOut,
    breakStart,
    breakEnd
  ) => {
    const clockInTime = new Date(clockIn);
    const clockOutTime = new Date(clockOut);
    const breakStartTime = new Date(breakStart);
    const breakEndTime = new Date(breakEnd);

    const workDuration = (clockOutTime - clockInTime) / (1000 * 60 * 60); // in hours
    const breakDuration = (breakEndTime - breakStartTime) / (1000 * 60 * 60); // in hours

    return (workDuration - breakDuration).toFixed(2); // total working hours
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-200 rounded-lg">
          <tr>
            {headings?.map((heading, index) => (
              <th
                key={index}
                className={`py-5 text-left font-semibold text-[15px] text-gray-600 ${
                  index === 0 ? "first:rounded-tl-sm rounded-bl-sm" : ""
                } ${
                  index === headings.length - 1
                    ? "last:rounded-tr-sm rounded-br-sm"
                    : ""
                }`}
              >
                {heading}
              </th>
            ))}
            {(allowDelete || allowEdit) && (
              <th className="py-5 text-left font-semibold text-[15px] text-gray-700 last:rounded-tr-sm rounded-br-sm">
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
              <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                {item.date ? new Date(item.date).toLocaleDateString() : ""}
              </td>
              <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                {item.clockIn ? formatTime(item.clockIn) : ""}
              </td>
              <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                {item.breakStart ? formatTime(item.breakStart) : ""}
              </td>
              <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                {item.breakEnd ? formatTime(item.breakEnd) : ""}
              </td>
              <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                {item.clockOut ? formatTime(item.clockOut) : ""}
              </td>
              <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                {calculateTotalWorkingHours(
                  item.clockIn,
                  item.clockOut,
                  item.breakStart,
                  item.breakEnd
                )}{" "}
                hours
              </td>

              {(allowDelete || allowEdit) && (
                <td className="px-1 text-sm py-4 border-b border-gray-200">
                  {hoveredRowIndex === rowIndex && (
                    <div>
                      {allowEdit && (
                        <button
                          type="button"
                          className="mr-3"
                          onClick={() => onEdit(item)}
                        >
                          <FaEdit className="text-gray-600" size={18} />
                        </button>
                      )}
                      {allowDelete && (
                        <button
                          type="button"
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

export default TimeLogTable;
