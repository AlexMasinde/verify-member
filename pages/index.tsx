import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/images/kssha_logo.png";
import Delegates from "@/components/delegates";
import Exhibitors from "@/components/exhibitors";

export default function Home() {
  const [showDelegates, setShowDelegates] = useState(true);
  return (
    <main className="lg:bg-blue-100 min-h-screen pat relative lg:pt-[10px]">
      <div className="pb-[80px] lg:w-[60%] mx-auto z-10 lg:rounded-[8px]">
        <div className="w-full mx-auto flex flex-col items-center bg-white rounded-[6px]  py-[16px]">
          <div className="width-[fit-content] m-[auto]">
            <img
              src="https://res.cloudinary.com/db7w5helg/image/upload/v1683731506/kssha_logo_avbyuj.png"
              alt="KSSHA Logo"
            />
          </div>
          <div className="mt-[12px] flex flex-col items-center">
            <h1 className=" text-lg">
              KESSHA 46TH ANNUAL NATIONAL CONFERENCE OF PRINCIPALS AND
              EXHIBITION
            </h1>
            <p className="text-lg opacity-60">
              26th to 30th June 2023 at the Sheikh Zayed Hall in Mombasa.
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between bg-white mt-[10px] rounded-bl-none rounded-br-none border-b border-b-gray-200 rounded-tl-[8px] rounded-tr-[8px]">
          <div
            onClick={() => setShowDelegates(true)}
            className={`w-1/2 flex flex-col items-center py-[10px] rounded-tl-[8px] cursor-pointer ${
              showDelegates ? "bg-[#514887] text-white" : ""
            }`}
          >
            <p>Delegate Registration</p>
          </div>
          <div
            onClick={() => setShowDelegates(false)}
            className={`w-1/2 flex flex-col items-center py-[10px] rounded-tr-[8px] cursor-pointer ${
              showDelegates ? "" : " bg-[#514887] text-white"
            }`}
          >
            <p>Exhibitor Registration</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full mx-auto justify-between bg-white rounded-[8px] p-5 shadow-lg shadow-[rgba(81, 72, 135, 1)] rounded-tl-none rounded-tr-none">
          {showDelegates ? <Delegates /> : <Exhibitors />}
        </div>
      </div>
    </main>
  );
}
