import React, { useState } from "react";
import "./IconInput.css";
import { FaExclamationCircle } from "react-icons/fa";

const IconInput = ({
  width,
  height,
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  className,
  leftIcon,
  rightIcon,
  multiLine,
  ...rest
}) => {
  return (
    <div className={className}>
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
      <div
        className={"relative input-field-container"}
        style={{ width, height }}
      >
        {leftIcon && <span className="absolute left-3">{leftIcon}</span>}
        {multiLine ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`input-field  ${error && "border-red"}`}
            {...rest}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`input-field  ${error && "border-red"}`}
            {...rest}
          />
        )}
        {rightIcon && <span className="absolute right-3">{rightIcon}</span>}
      </div>
      <div className="h-4 mt-1">
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default IconInput;
