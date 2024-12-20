import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TimeOffTable = ({
  headings,
  list,
  allowDelete,
  allowEdit,
  onDelete,
  onEdit,
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const colSpans = {
    0: 3,
    1: 3,
    2: 3,
    3: 4,
    4: 2,
    5: 3,
    6: 2,
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-200 rounded-lg">
          <tr>
            {headings?.map((heading, index) => (
              <th
                colSpan={colSpans[index]}
                key={index}
                className={`py-5  text-left font-semibold text-[15px] text-gray-600 ${
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
              <td
                colSpan={3}
                className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
              >
                {item.leaveType?.name}
              </td>
              <td
                colSpan={3}
                className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
              >
                {item.startDate
                  ? new Date(item.startDate).toLocaleDateString()
                  : ""}
              </td>
              <td
                colSpan={3}
                className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
              >
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString()
                  : ""}
              </td>
              <td
                colSpan={4}
                className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
              >
                {item.hoursPerDay?.map((hour, index) => (
                  <div key={index}>
                    {hour.hours} hours on{" "}
                    {new Date(hour.date).toLocaleDateString()}
                  </div>
                ))}
              </td>
              <td
                colSpan={2}
                className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
              >
                {/* total hours */}
                {item.hoursPerDay?.reduce(
                  (acc, curr) => acc + curr.hours,
                  0
                )}{" "}
                hours
              </td>
              <td
                colSpan={3}
                className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
              >
                {item.note}
              </td>
              <td
                colSpan={2}
                className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
              >
                {item.status === "Pending" ? (
                  <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-md bg-yellow-500 text-white">
                    {item.status}
                  </span>
                ) : item.status === "Approved" ? (
                  <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-md bg-green-500 text-white">
                    {item.status}
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-md bg-red-500 text-white">
                    {item.status}
                  </span>
                )}
              </td>

              {(allowDelete || allowEdit) && (
                <td className="px-1 text-sm py-4 border-b border-gray-200">
                  {hoveredRowIndex === rowIndex &&
                    item?.leaveType?.name !== "Holiday" && (
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

export default TimeOffTable;
