import React from "react";

export default function Button({ text }: { text: string }) {
  return (
    <div className="mt-[12px] w-full">
      <button
        className="bg-[#514887] rounded-lg px-4 py-2 text-white hover:opacity-50 hover:shadow-lg w-full"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
}
