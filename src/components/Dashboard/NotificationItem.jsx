import moment from "moment/moment";
import React from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const NotificationItem = ({
  _id,
  type,
  folderId,
  fileId,
  createdBy,
  createdFor,
  message,
  createdAt,
  icons,
  onClick,
  buttonText,
  buttonAction,
  allowButton,
  allowButtonAction,
  denyButton,
  denyButtonAction,
  hovered,
  setHovered,
}) => {
  console.log("icons", folderId, fileId);
  return (
    <div
      className="flex items-center space-x-4"
      onMouseEnter={() => setHovered(_id)}
      onMouseLeave={() => setHovered(-1)}
    >
      <div className="text-3xl">
        {hovered ? icons?.activeIcon : icons?.icon}
      </div>
      <div
        className={`flex items-center justify-between border-b py-4 min-h-16 w-full`}
      >
        <div className={`${hovered ? "mr-5" : ""}`}>
          <div
            className={hovered ? "text-blue-500 cursor-pointer" : "text-black"}
            onClick={onClick}
          >
            {`${createdBy?.firstName} ${createdBy?.lastName} has requested a signature for a file`}
          </div>
          <div className="text-sm text-gray-500">
            <span>{message}</span>
          </div>
          <span className="text-sm text-orange-600 font-medium">
            {moment(createdAt).fromNow()}
          </span>
        </div>
        {hovered && buttonText && buttonAction && (
          <button
            className="mr-2 p-2 rounded-sm text-xs font-semibold border-[1.75px] border-gray-400 text-gray-500 hover:text-gray-600 w-44"
            onClick={buttonAction}
          >
            {buttonText}
          </button>
        )}
        {hovered && allowButton && denyButton && (
          <div className="flex space-x-2">
            <button
              className="px-[10px] py-[6px] rounded bg-tertiary hover:bg-green1"
              onClick={allowButtonAction}
            >
              <IoIosCheckmarkCircle size={20} color="white" />
            </button>
            <button
              className="px-[10px] py-[6px] rounded bg-gray-100 hover:bg-gray-200"
              onClick={denyButtonAction}
            >
              <IoIosCloseCircle size={20} color="#555" />
            </button>
          </div>
        )}
        {hovered && (
          <button className="text-gray-500 hover:text-gray-700">
            <IoClose size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
