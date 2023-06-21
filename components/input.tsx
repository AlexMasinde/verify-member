import React from "react";
import { Input as ChakraInput } from "@chakra-ui/react";

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
    <div className="mt-[12px] text-[14px] mb-[5px]">
      <p>{inputLabel}</p>
      <p
        className={`text-[14px] mb-[5px]  ${
          error.trim() === "" ? "" : "text-red-700"
        }`}
      >
        {error}
      </p>
      <ChakraInput
        value={value}
        onChange={onChange}
        size="md"
        type="text"
        className="rounded-md"
      />
    </div>
  );
}
