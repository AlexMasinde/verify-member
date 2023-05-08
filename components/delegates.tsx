import { useState } from "react";

import TextDetails from "@/components/textDetails";
import RegistrationForm from "@/components/registrationForm";
import Payment from "@/components/payment";

export default function Delegates() {
  const [userData, setUserData] = useState({
    name: "",
    school: "",
    county: "",
    subCounty: "",
    tscNumber: "",
    email: "",
    phoneNumber: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.trim() === "") {
      setCodeError("Please provide payment code");
      return;
    }
  }
  return (
    <>
      <TextDetails />
      <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 lg:px-[20px] xs:px-[5%] sm:px-[0%]">
        {showPayment ? (
          <Payment
            setCode={setCode}
            handleSubmit={handleSubmit}
            codeError={codeError}
            setShowPayment={setShowPayment}
            code={code}
            setCodeError={setCodeError}
          />
        ) : (
          <RegistrationForm
            userData={userData}
            setUserData={setUserData}
            setShowPayment={setShowPayment}
          />
        )}
      </div>
    </>
  );
}
