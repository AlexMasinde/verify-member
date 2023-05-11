import React from "react";

export default function ExhibitorTextDetails() {
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
              Provide a accurate contact details about your organization
              including a preferred contact person
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
              Include a short description of the services that you provide
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
              Select the space that you would like to reserve from the three
              available alternatives
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
              Further details about the reservation, including payment, will be
              shared through the provided email address and phone
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
              Please note that the Deadline for payment is{" "}
              <strong className="text-sm font-bold text-gray-900">
                9 June, 2023.
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
              The few available spaces will be allocated on a first come first
              served basis.{" "}
              <strong>NO PAYMENT WILL BE DONE AT THE VENUE.</strong>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
