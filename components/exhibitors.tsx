import { useState } from "react";
import ExhibitorRegistrationForm from "./exhibitorRegistrationForm";

import { ExhibitorData } from "@/utils/types";

import TextDetails from "./textDetails";
import ExhibitorTextDetails from "./exhibitorTextDetails";

export default function Exhibitors() {
  const [exhibitorData, setExhibitorData] = useState({
    name: "",
    contactPerson: "",
    phoneNumber: "",
    description: "",
    email: "",
    spaceReserved: "",
  });

  return (
    <>
      <ExhibitorTextDetails />
      <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 lg:px-[20px] xs:px-[5%] sm:px-[0%]">
        <ExhibitorRegistrationForm
          exhibitorData={exhibitorData}
          setExhibitorData={setExhibitorData}
        />
      </div>
    </>
  );
}
