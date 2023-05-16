import { useState } from "react";

import TextDetails from "@/components/textDetails";
import RegistrationForm from "@/components/registrationForm";
import Payment from "@/components/payment";
import { api } from "@/api";
import postDataWithRetries from "@/utils/request";
import delay from "@/utils/delay";

export default function Delegates() {
  const [userData, setUserData] = useState({
    name: "",
    school: "",
    county: "",
    subCounty: "",
    tscNumber: "",
    email: "",
    phoneNumber: "",
    confirmedTSCDeduction: false,
  });
  const [showPayment, setShowPayment] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const codes = code
      .split(",")
      .map(function (id) {
        return id.trim();
      })
      .filter(function (id) {
        return id !== "";
      });

    if (codes.length === 0) {
      return setCodeError("Enter at least one transaction code");
    }
    if (new Set(codes).size !== codes.length) {
      return setCodeError("Duplicate transaction codes found");
    }

    try {
      console.log({ ...userData, TransID: code });
      setLoading(true);
      const payload = {
        ...userData,
        TransID: code,
      };
      const url = "/payment/verify";
      await postDataWithRetries(payload, url);
      setSuccessMessage(
        "Registration completed successfully! Check your email for the invitation letter"
      );
      await delay(6000);
      setSuccessMessage("");
      setUserData({
        name: "",
        email: "",
        tscNumber: "",
        phoneNumber: "",
        county: "",
        school: "",
        subCounty: "",
        confirmedTSCDeduction: false,
      });
      setCode("");
      setShowPayment(false);
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setRequestError("Error completing registration! Try again later");
      } else {
        const error =
          err.response?.data.error.message ??
          "Error completing registration! Try again later";
        setRequestError(error);
      }
      setTimeout(() => {
        setRequestError("");
      }, 3000);
    } finally {
      setLoading(false);
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
            successMessage={successMessage}
            requestError={requestError}
            loading={loading}
          />
        ) : (
          <RegistrationForm
            userData={userData}
            setUserData={setUserData}
            setShowPayment={setShowPayment}
            loading={loading}
          />
        )}
      </div>
    </>
  );
}
