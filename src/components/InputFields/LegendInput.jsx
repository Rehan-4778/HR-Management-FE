import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const LegendInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  style,
}) => {
  const borderColor = error ? "border-danger" : "border-tertiary";

  const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "text-tertiary",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: borderColor,
        borderWidth: 1,
      },
      "&.Mui-focused fieldset": {
        borderColor: borderColor,
      },
    },
  });
  return (
    <StyledTextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      style={style}
    />
  );
};

export default LegendInput;
