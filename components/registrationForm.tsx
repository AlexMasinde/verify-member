import { Errors, UserData } from "@/utils/types";
import React, { useState } from "react";

import Input from "./input";
import Button from "./button";

import { guestValidate, registerValidate } from "@/utils/validators";
import { Select } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import CountyDropdown from "./dropdown";
import AppModal from "./modal";
import PrivacyPolicy from "./privacyPolicy";

export default function RegistrationForm({
  userData,
  setUserData,
  setShowPayment,
  loading,
  formType,
  setFormType,
}: {
  userData: UserData;
  setUserData: (value: UserData) => void;
  setShowPayment: (value: boolean) => void;
  setFormType: (value: string) => void;
  formType: string;
  loading: boolean;
}) {
  const [inputErrors, setInputErrors] = useState<Errors>({});
  const [searchValue, setSearchValue] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  function handleDesignation(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, designation: event.target.value });
    if (inputErrors && inputErrors.designation) {
      setInputErrors({ ...inputErrors, designation: "" });
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

  // function handleCheckbox() {
  //   setUserData({
  //     ...userData,
  //     confirmedTSCDeduction: !userData.confirmedTSCDeduction,
  //   });
  // }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { valid, errors } =
      formType === "delegate"
        ? registerValidate(userData)
        : guestValidate(userData);
    if (!valid) {
      setInputErrors(errors);
      console.log(errors);
      return;
    }
    setShowPayment(true);
  }

  function handleCountyOption(county: string) {
    setUserData({ ...userData, county: county });
    if (inputErrors && inputErrors.county) {
      setInputErrors({ ...inputErrors, county: "" });
    }
  }

  function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setInputErrors({});
    setUserData({
      tscNumber: "",
      name: "",
      subCounty: "",
      county: "",
      designation: "",
      email: "",
      phoneNumber: "",
      school: "",
    });
    setFormType(event.target.value);
    setSearchValue("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-[100%]">
          <div className="mt-[12px] text-[14px] mb-[5px]">
            <p className="text-[14px] mb-[5px]">Registration Type</p>
            <Select
              value={formType}
              onChange={handleOptionChange}
              className="border-gray-300"
            >
              <option value="delegate">Delegate</option>
              <option value="guest">Guest</option>
            </Select>
          </div>
          <Input
            inputLabel="Full Names"
            onChange={handleName}
            error={inputErrors?.name ? inputErrors?.name : ""}
            value={userData.name}
          />
          {formType === "guest" && (
            <Input
              inputLabel="Designation"
              onChange={handleDesignation}
              error={inputErrors?.designation ? inputErrors?.designation : ""}
              value={userData.designation}
            />
          )}
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

          {formType === "delegate" && (
            <Input
              inputLabel="School"
              onChange={handleSchool}
              error={inputErrors?.school ? inputErrors?.school : ""}
              value={userData.school}
            />
          )}
          {formType === "delegate" && (
            <Input
              inputLabel="TSC Number"
              onChange={handleTscNumber}
              error={inputErrors?.tscNumber ? inputErrors?.tscNumber : ""}
              value={userData.tscNumber}
            />
          )}
          <CountyDropdown
            setCounty={handleCountyOption}
            inputLabel="County"
            error={inputErrors?.county ? inputErrors?.county : ""}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Input
            inputLabel="Sub County"
            onChange={handleSubCounty}
            error={inputErrors?.subCounty ? inputErrors?.subCounty : ""}
            value={userData.subCounty ?? ""}
          />
        </div>
        <div className="flex flex-col items-center mt-[12px]">
          <Button text="Submit" disabled={loading} />
        </div>
        <p className="text-sm text-center mt-2">
          By submitting you agree to our{" "}
          <span className="text-blue-600 cursor-pointer" onClick={onOpen}>
            Privacy Policy
          </span>
        </p>
        <AppModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          header="Privacy Policy"
        >
          <PrivacyPolicy />
        </AppModal>
      </form>
    </div>
  );
}
