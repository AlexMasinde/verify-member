import { Errors, UserData } from "@/utils/types";
import React, { useState } from "react";

import Input from "./input";
import Button from "./button";

import { registerValidate } from "@/utils/validators";
import Checkbox from "./checkbox";

export default function RegistrationForm({
  userData,
  setUserData,
  setShowPayment,
  loading,
}: {
  userData: UserData;
  setUserData: (value: UserData) => void;
  setShowPayment: (value: boolean) => void;
  loading: boolean;
}) {
  const [inputErrors, setInputErrors] = useState<Errors>({});

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, name: event.target.value });
    if (inputErrors && inputErrors.name) {
      setInputErrors({ ...inputErrors, name: "" });
    }
  }

  function handleSchool(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, school: event.target.value });
    if (inputErrors && inputErrors.school) {
      setInputErrors({ ...inputErrors, school: "" });
    }
  }

  function handleCounty(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, county: event.target.value });
    if (inputErrors && inputErrors.county) {
      setInputErrors({ ...inputErrors, county: "" });
    }
  }

  function handleSubCounty(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, subCounty: event.target.value });
    if (inputErrors && inputErrors.subCounty) {
      setInputErrors({ ...inputErrors, subCounty: "" });
    }
  }

  function handleTscNumber(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, tscNumber: event.target.value });
    if (inputErrors && inputErrors.tscNumber) {
      setInputErrors({ ...inputErrors, tscNumber: "" });
    }
  }
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, email: event.target.value });
    if (inputErrors && inputErrors.email) {
      setInputErrors({ ...inputErrors, email: "" });
    }
  }
  function handlePhone(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, phoneNumber: event.target.value });
    if (inputErrors && inputErrors.phoneNumber) {
      setInputErrors({ ...inputErrors, phoneNumber: "" });
    }
  }

  function handleCheckbox() {
    setUserData({
      ...userData,
      confirmedTSCDeduction: !userData.confirmedTSCDeduction,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { valid, errors } = registerValidate(userData);
    if (!valid) {
      setInputErrors(errors);
      console.log(errors);
      return;
    }
    setShowPayment(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-[100%]">
          <Input
            inputLabel="Full Names"
            onChange={handleName}
            error={inputErrors?.name ? inputErrors?.name : ""}
            value={userData.name}
          />
          <Input
            inputLabel="Email Address"
            onChange={handleEmail}
            error={inputErrors?.email ? inputErrors?.email : ""}
            value={userData.email}
          />
          <Input
            inputLabel="Phone Number"
            onChange={handlePhone}
            error={inputErrors?.phoneNumber ? inputErrors?.phoneNumber : ""}
            value={userData.phoneNumber}
          />
          <Input
            inputLabel="School"
            onChange={handleSchool}
            error={inputErrors?.school ? inputErrors?.school : ""}
            value={userData.school}
          />
          <Input
            inputLabel="TSC Number"
            onChange={handleTscNumber}
            error={inputErrors?.tscNumber ? inputErrors?.tscNumber : ""}
            value={userData.tscNumber}
          />
          <Input
            inputLabel="County"
            onChange={handleCounty}
            error={inputErrors?.county ? inputErrors?.county : ""}
            value={userData.county}
          />
          <Input
            inputLabel="Sub County"
            onChange={handleSubCounty}
            error={inputErrors?.subCounty ? inputErrors?.subCounty : ""}
            value={userData.subCounty}
          />
        </div>
        <Checkbox
          confirmedTSCDeduction={userData.confirmedTSCDeduction}
          handleChange={handleCheckbox}
          checkboxLabel="Are you deducted monthly contributions to the Association by TSC"
        />
        <div className="flex flex-col items-center mt-2">
          <Button text="Submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
}
