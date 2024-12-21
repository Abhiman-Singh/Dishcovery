import React from 'react';

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;