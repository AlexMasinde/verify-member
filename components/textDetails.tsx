import React from "react";

export default function TextDetails() {
  return (
    <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 xs:px-[5%] sm:px-[0%] flex flex-col items-center">
      <div className="bg-[#fff] rounded-[8px] p-5 h-[100%]">
        <ul className="space-y-4">
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-[#fff] stroke-[#514887] stroke-2"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path
                d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                fill="none"
              />
            </svg>
            <p className="ml-4">
              Fill in your personal details accurately then click register
            </p>
          </li>
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-[#fff] stroke-[#514887] stroke-2"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path
                d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                fill="none"
              />
            </svg>
            <p className="ml-4">
              Make your payment for the conference to paybill number{" "}
              <strong className="text-sm font-bold text-gray-900">
                675252
              </strong>
            </p>
          </li>
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-[#fff] stroke-[#514887] stroke-2"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path
                d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                fill="none"
              />
            </svg>
            <p className="ml-4">
              For account number, use your{" "}
              <strong className="text-sm font-bold text-gray-900">name</strong>
            </p>
          </li>
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-[#fff] stroke-[#514887] stroke-2"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path
                d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                fill="none"
              />
            </svg>
            <p className="ml-4">
              Enter the transaction code{" "}
              <strong className="text-sm font-bold text-gray-900">
                (e.g. RDK7NQ9AMH)
              </strong>{" "}
              that you receive to complete registration
            </p>
          </li>
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-[#fff] stroke-[#514887] stroke-2"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path
                d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                fill="none"
              />
            </svg>
            <p className="ml-4">
              Once done, you will receive your ticket for the conference in the
              provided email address
            </p>
          </li>
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-[#fff] stroke-[#514887] stroke-2"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path
                d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                fill="none"
              />
            </svg>
            <p className="ml-4">
              In case you are deduced monthly contributions to the Association
              by TSC, check the box at the end of the form. Otherwise, leave it
              empty
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
