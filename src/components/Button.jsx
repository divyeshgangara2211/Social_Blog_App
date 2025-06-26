import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white' ,
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110 focus:ring-2 focus:ring-blue-400 focus:outline-none ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button