import React from "react";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`}
    ></div>
  );
};

export default LoadingSpinner;
