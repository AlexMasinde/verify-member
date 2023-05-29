import React, { useState, useRef, useEffect } from "react";
import { County } from "@/utils/types";

import { counties } from "@/utils/counties";

export default function CountyDropdown({
  setCounty,
  inputLabel,
  error,
}: {
  inputLabel: string;
  error: string;
  setCounty: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredOptions = counties.filter((option) =>
    option.county_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isOpen) setIsOpen(true);
    setSearchValue(e.target.value);
  }

  function handleDropdownToggle() {
    setIsOpen(!isOpen);
  }

  function handleOptionSelect(option: County) {
    setIsOpen(false);
    setSearchValue(option.county_name);
    setCounty(option.county_name);
  }

  return (
    <div
      className="relative inline-block mt-[10px] text-[14px] mb-[5px] w-full lg:w-400 sm:ml-[0%]"
      ref={dropdownRef}
    >
      <p>{inputLabel}</p>
      <p
        className={`text-[14px] mb-[5px]  ${
          error.trim() === "" ? "" : "text-red-700"
        }`}
      >
        {error}
      </p>
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 px-[18px] py-2 rounded-[6px] outline-none w-full lg:w-400 sm:ml-[0%]"
        value={searchValue}
        onChange={handleSearchInputChange}
        onClick={handleDropdownToggle}
      />
      {isOpen && (
        <div
          className={`absolute w-full ${
            filteredOptions.length > 0 ? "max-h-[150px]" : "max-h-[36px]"
          } overflow-y-auto bg-white rounded-md shadow-lg ${
            filteredOptions.length > 0 ? "top-auto" : "bottom-auto"
          }`}
        >
          {filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.county_name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-2 text-gray-600">No options found</p>
          )}
        </div>
      )}
    </div>
  );
}
