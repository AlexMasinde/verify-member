import React from "react";

export default function Input({
  inputLabel,
  onChange,
  error,
  value,
  type,
}: {
  inputLabel: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  value: string;
  type?: string;
}) {
  return (
    <div className="mt-[12px] text-[14px] mb-[5px] opacity-70">
      <p>{inputLabel}</p>
      <p
        className={`text-[14px] mb-[5px]  ${
          error.trim() === "" ? "" : "text-red-700"
        }`}
      >
        {error}
      </p>
      <input
        value={value}
        onChange={onChange}
        type={type ? type : "text"}
        className="border border-gray-300 px-[18px] py-2 rounded-[6px] outline-none w-full lg:w-400 sm:ml-[0%]"
      />
    </div>
  );
}
