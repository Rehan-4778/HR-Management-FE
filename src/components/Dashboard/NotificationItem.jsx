import React, { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const NotificationItem = ({
  id,
  icon,
  activeIcon,
  title,
  description,
  time,
  status,
  link,
  buttonText,
  buttonAction,
  allowButton,
  allowButtonAction,
  denyButton,
  denyButtonAction,
  hovered,
  setHovered,
}) => {
  return (
    <div
      className="flex items-center space-x-4"
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(-1)}
    >
      <div className="text-3xl">{hovered ? activeIcon : icon}</div>
      <div
        className={`flex items-center justify-between border-b py-4 min-h-16 w-full`}
      >
        <div className={`${hovered ? "mr-5" : ""}`}>
          {link ? (
            <a href={link} className="text-blue-500">
              {title}
            </a>
          ) : (
            <div className={hovered ? "text-blue-500" : "text-black"}>
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm text-gray-500">
              {description}
              {time && <span className="text-sm text-gray-500">{time}</span>}
              {status && (
                <span className="ml-2 text-[10px] font-semibold text-orange-600 border-orange-600 border p-[1.25px] px-[6px] mt-1 rounded-md">
                  {status}
                </span>
              )}
            </div>
          )}
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
