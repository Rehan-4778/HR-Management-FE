import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  children,
  primary,
  secondary,
  tertiary,
  success,
  warning,
  danger,
  outline,
  rounded,
  classnames,
  full,
  ...rest
}) => {
  const classes = classNames(
    "flex justify-center items-center px-5 py-2.5 focus:outline-none transition duration-300 ease-in-out text-sm font-semibold tracking-wider",
    {
      "bg-primary text-white": primary,
      "bg-secondary text-white": secondary,
      "bg-tertiary": tertiary,
      "bg-success text-white": success,
      "bg-warning text-white": warning,
      "bg-danger text-white": danger,
      "border-2 bg-transparent": outline,
      "rounded-full": rounded,
      "border-primary text-primary": primary && outline,
      "border-secondary text-secondary": secondary && outline,
      "border-tertiary text-tertiary": tertiary && outline,
      "border-success text-success": success && outline,
      "border-warning text-warning": warning && outline,
      "border-danger text-danger": danger && outline,
      "w-full": full,
    },
    classnames
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

const checkVariationValue = (props, propName, componentName) => {
  const { primary, secondary, tertiary, success, warning, danger } = props;
  const count =
    Number(!!primary) +
    Number(!!secondary) +
    Number(!!tertiary) +
    Number(!!success) +
    Number(!!warning) +
    Number(!!danger);

  if (count > 1) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. You can't use more than one variation at a time.`
    );
  }
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: checkVariationValue,
  secondary: checkVariationValue,
  tertiary: checkVariationValue,
  success: checkVariationValue,
  warning: checkVariationValue,
  danger: checkVariationValue,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  classnames: PropTypes.string,
};

export default Button;
