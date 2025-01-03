import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeeDetailTable = ({
  headings,
  list,
  allowDelete,
  allowEdit,
  onDelete,
  onEdit,
  isFixedValue = false,
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

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
              {!isFixedValue ? (
                Object.keys(item)?.map(
                  (key, colIndex) =>
                    key !== "_id" &&
                    key !== "reportsTo" &&
                    key !== "payRateUnit" && (
                      <td
                        key={colIndex}
                        className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700"
                      >
                        {typeof item[key] === "string" &&
                        item[key].toUpperCase() === "CURRENT" ? (
                          <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-md bg-tertiary text-white">
                            {item[key]}
                          </span>
                        ) : (key === "dateAssigned" ||
                            key === "dateReturned" ||
                            key === "effectiveDate" ||
                            key === "issuedDate" ||
                            key === "expirationDate") &&
                          item[key] ? (
                          new Date(item[key])?.toLocaleDateString()
                        ) : key === "payRate" ? (
                          "$" + item[key]
                        ) : (
                          //  + "/" + item["payRateUnit"]
                          item[key]
                        )}
                      </td>
                    )
                )
              ) : (
                <React.Fragment key={rowIndex}>
                  <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                    {item.date ? new Date(item.date).toLocaleDateString() : ""}
                  </td>
                  <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                    {item.visaType}
                  </td>
                  <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                    {item.issuingCountry}
                  </td>
                  <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                    {item.issuedDate
                      ? new Date(item.issuedDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                    {item.expirationDate
                      ? new Date(item.expirationDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                    {rowIndex === 0 && item.issuedDate ? (
                      <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-md bg-tertiary text-white">
                        CURRENT
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-1 text-sm py-4 border-b border-gray-200 font-medium text-gray-700">
                    {item.note}
                  </td>
                </React.Fragment>
              )}

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

EmployeeDetailTable.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  allowDelete: PropTypes.bool,
  allowEdit: PropTypes.bool,
};

EmployeeDetailTable.defaultProps = {
  allowDelete: false,
  allowEdit: false,
};

export default EmployeeDetailTable;
