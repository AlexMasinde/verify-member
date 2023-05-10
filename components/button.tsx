import React from "react";

export default function Button({
  text,
  disabled,
  backgroundColor,
  textColor,
}: {
  text: string;
  disabled: boolean;
  backgroundColor?: string;
  textColor?: string;
}) {
  return (
    <div className="w-full">
      <button
        style={{
          backgroundColor: backgroundColor ?? "#514887",
          color: textColor ?? "#ffffff",
        }}
        className={`rounded-lg px-4 py-2 text-white hover:opacity-50 hover:shadow-lg text-sm w-full ${
          disabled ? "opacity-50" : ""
        }`}
        type="submit"
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
