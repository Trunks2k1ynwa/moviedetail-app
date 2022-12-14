import React from "react";

const Button = ({bgColor = 'primary',onClick,type='button', children,width='w-full',props}) => {
  let bgClassName = 'bg-outrinh';
switch (bgColor) {
  case 'primary':
    bgClassName = 'bg-primary'
    break;
  case 'secondary':
    bgClassName = 'bg-secondary'
    break;

  default:
    break;
}
  return (
    <button
      type={type}
      onClick={onClick}
      className={`my-4 px-3 py-2 font-bold rounded-lg ${bgClassName} ${width}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
