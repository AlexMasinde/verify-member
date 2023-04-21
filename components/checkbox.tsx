import React, { useState } from "react";

function Checkbox({
  confirmedTSCDeduction,
  setConfirmedTSCDeduction,
  checkboxLabel,
}: {
  confirmedTSCDeduction: boolean;
  setConfirmedTSCDeduction: (value: boolean) => void;
  checkboxLabel: string;
}) {
  return (
    <div className="flex items-center mt-[12px]">
      <input
        type="checkbox"
        id="checkbox"
        className="hidden"
        checked={confirmedTSCDeduction}
        onChange={() => setConfirmedTSCDeduction(!confirmedTSCDeduction)}
      />
      <label
        htmlFor="checkbox"
        className="flex items-center justify-center w-4 h-4 border border-[#514887] rounded cursor-pointer mr-2"
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