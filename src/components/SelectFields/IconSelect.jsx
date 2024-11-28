import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp, FaExclamationCircle } from "react-icons/fa";
import "./IconSelect.css";

const IconSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  width,
  disabled,
  labelAsValue = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const selectRef = useRef(null);

  useEffect(() => {
    if (labelAsValue)
      setSelectedOption(
        options?.find((country) => country.label === value)?.value
      );
  }, [value]);

  const [searchInput, setSearchInput] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    if (labelAsValue && !option.label.toString().includes("Select")) {
      onChange(option.label);
    } else {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (!isOpen || disabled) return;

    if (/^[a-zA-Z0-9\s]$/.test(event.key)) {
      clearTimeout(handleKeyDown.timer);
      setSearchInput((prev) => prev + event.key);
      // alert(searchInput);
      handleKeyDown.timer = setTimeout(() => setSearchInput(""), 1000);
    }
  };

  useEffect(() => {
    if (searchInput) {
      const matchingOption = options.find((option) =>
        option.label.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      if (matchingOption) {
        setSelectedOption(matchingOption.value);
        if (
          labelAsValue &&
          !matchingOption.label.toString().includes("Select")
        ) {
          onChange(matchingOption.label);
        } else {
          onChange(matchingOption.value);
        }
      }
    }
  }, [searchInput]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="custom-select-container" ref={selectRef}>
      <div className="flex items-center">
        {error && <FaExclamationCircle className="text-danger" />}
        {label && (
          <label
            htmlFor={name}
            className={`input-label ${error && "ml-1 text-red font-medium"}`}
          >
            {label}
          </label>
        )}
      </div>
      <div className="custom-select-wrapper" style={{ width }}>
        <div
          className={`custom-select-field ${error && "border-red"} ${
            disabled && "cursor-default"
          } ${isOpen && "active"}`}
          onClick={() => {
            if (!disabled) {
              return setIsOpen((prev) => !prev);
            }
          }}
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
                className={`custom-select-option ${
                  selectedOption === option.value && "active"
                }`}
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
