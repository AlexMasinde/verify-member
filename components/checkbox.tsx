import React, { useState } from "react";

function Checkbox({
  confirmedTSCDeduction,
  handleChange,
  checkboxLabel,
}: {
  confirmedTSCDeduction: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxLabel: string;
}) {
  return (
    <div className="flex items-center mt-[12px]">
      <input
        type="checkbox"
        id="checkbox"
        className="hidden"
        checked={confirmedTSCDeduction}
        onChange={handleChange}
      />
      <label
        htmlFor="checkbox"
        className="w-6 h-4 border border-[#514887] rounded cursor-pointer mr-2"
      >
        {confirmedTSCDeduction && (
          <svg
            className="w-4 h-4 text-[#514887] fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </label>
      <span className="text-sm opacity-70">{checkboxLabel}</span>
    </div>
  );
}

export default Checkbox;
