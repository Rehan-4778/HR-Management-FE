import React from "react";
import "./Input.css";

const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options,
  className,
  labelAsValue = false,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          onChange(e.target.value);
        }} // Pass the selected value
        onBlur={onBlur}
        className={`select-field ${error && "border-red"}`}
      >
        {options?.map((option, index) => (
          <option
            key={option.value}
            value={
              labelAsValue && !option.label.toString().includes("Select")
                ? option.label
                : option.value
            }
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="h-4 mt-1">
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Select;
