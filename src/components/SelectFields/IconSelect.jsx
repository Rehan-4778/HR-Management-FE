import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import "./IconSelect.css";

const IconSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const selectRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select-container" ref={selectRef}>
      {label && (
        <label htmlFor={name} className={`input-label ${error && "text-red"}`}>
          {label}
        </label>
      )}
      <div className="custom-select-wrapper" style={{ width }}>
        <div
          className={`custom-select-field ${error && "border-red"} ${
            isOpen && "active"
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="w-full flex justify-between items-center">
            {selectedOption
              ? options?.find((option) => option.value === selectedOption)
                  ?.label
              : "--Select--"}
            <div className="icon-container">
              {isOpen ? (
                <FaCaretUp color="#444" />
              ) : (
                <FaCaretDown color="#444" />
              )}
            </div>
          </span>
        </div>
        {isOpen && (
          <div className={`custom-select-dropdown ${isOpen && "active"}`}>
            {options?.map((option) => (
              <div
                key={option.value}
                className="custom-select-option"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-4 mt-1">
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default IconSelect;
