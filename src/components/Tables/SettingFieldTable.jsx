import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";

const SettingFieldTable = ({
  headings,
  list,
  allowDelete,
  allowEdit,
  onDelete,
  onEdit,
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editableData, setEditableData] = useState({});

  const handleEditClick = (rowIndex, item) => {
    setEditingRowIndex(rowIndex);
    setEditableData(item);
  };

  const handleSaveClick = () => {
    if (Object.values(editableData).includes("")) {
      toast.error("Please enter a valid value");
    } else if (Object.values(editableData).some((value) => value.length < 3)) {
      toast.error("Value must be at least 3 characters long");
    } else if (
      editableData.value === editableData[Object.keys(editableData)[0]]
    ) {
      toast.error("Please change the value to update");
    } else {
      onEdit(editableData);
    }

    setEditingRowIndex(null);
    setEditableData({});
  };

  const handleCancelClick = () => {
    setEditingRowIndex(null);
    setEditableData({});
  };

  const handleChange = (key, value) => {
    setEditableData({ ...editableData, [key]: value });
  };

  return (
    <div className="overflow-x-auto max-h-[100vh]">
      <table className="min-w-full">
        <thead className="bg-gray-200 rounded-lg">
          <tr>
            {headings?.map((heading, index) => (
              <th
                key={index}
                className={`py-3 text-left font-semibold text-[15px] text-gray-600 ${
                  index === 0 ? "first:rounded-tl-sm rounded-bl-sm ps-5" : ""
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
              {Object.keys(item)?.map(
                (key, colIndex) =>
                  key !== "_id" &&
                  key !== "value" && (
                    <td
                      key={colIndex}
                      className=" px-1 text-sm h-12 border-b border-gray-200 font-medium text-gray-700 ps-5"
                    >
                      {editingRowIndex === rowIndex ? (
                        <input
                          type="text"
                          value={editableData[key]}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className=" w-1/2 top-2 px-2 py-1  border border-gray-300 rounded-sm outline-none focus:border-green1"
                        />
                      ) : (
                        item[key]
                      )}
                    </td>
                  )
              )}

              {(allowDelete || allowEdit) && (
                <td className="px-1 text-sm border-b border-gray-200 text-end pr-5">
                  {hoveredRowIndex === rowIndex && (
                    <div>
                      {allowEdit && editingRowIndex === rowIndex ? (
                        <>
                          <button
                            type="button"
                            className="mr-1 border-[1.3px] p-2 rounded-sm border-gray-300"
                            onClick={handleSaveClick}
                          >
                            <FaSave className="text-green1" size={16} />
                          </button>
                          <button
                            type="button"
                            className="border-[1.3px] p-2 rounded-sm border-gray-300"
                            onClick={handleCancelClick}
                          >
                            <FaTimes className="text-gray-600" size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          {allowEdit && (
                            <button
                              type="button"
                              className="mr-1 border-[1.3px] p-2 rounded-sm border-gray-300"
                              onClick={() => handleEditClick(rowIndex, item)}
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
                        </>
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

export default SettingFieldTable;
