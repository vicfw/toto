"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  text,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex-1 py-2.5 md:py-2.5 text-sm rounded-lg font-semibold transition-colors touch-manipulation flex items-center justify-center gap-2 ${className} ${
        disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          در حال ارسال...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
