import { ExhibitorData, ExhibitorErrors, SpaceData } from "@/utils/types";
import React, { useState } from "react";

import Input from "./input";
import Button from "./button";

import TextArea from "./textArea";
import SpacesDropdown from "./spacesDropdown";
import { exhibitorValidate } from "@/utils/validators";

export default function ExhibitorRegistrationForm({
  exhibitorData,
  setExhibitorData,
}: {
  exhibitorData: ExhibitorData;
  setExhibitorData: (value: ExhibitorData) => void;
}) {
  const [inputErrors, setInputErrors] = useState<ExhibitorErrors>({});
  const [showSpacesDropdown, setShowSpacesDropDown] = useState(false);

  const [selectedSpace, setSelectedSpace] = useState<SpaceData | null>(null);

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setExhibitorData({ ...exhibitorData, name: event.target.value });
    if (inputErrors && inputErrors.name) {
      setInputErrors({ ...inputErrors, name: "" });
    }
  }

  function handleDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setExhibitorData({ ...exhibitorData, description: event.target.value });
    if (inputErrors && inputErrors.description) {
      setInputErrors({ ...inputErrors, description: "" });
    }
  }
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setExhibitorData({ ...exhibitorData, email: event.target.value });
    if (inputErrors && inputErrors.email) {
      setInputErrors({ ...inputErrors, email: "" });
    }
  }

  function handlePhone(event: React.ChangeEvent<HTMLInputElement>) {
    setExhibitorData({ ...exhibitorData, phoneNumber: event.target.value });
    if (inputErrors && inputErrors.phoneNumber) {
      setInputErrors({ ...inputErrors, phoneNumber: "" });
    }
  }

  function handleContactPerson(event: React.ChangeEvent<HTMLInputElement>) {
    setExhibitorData({ ...exhibitorData, contactPerson: event.target.value });
    if (inputErrors && inputErrors.contactPerson) {
      setInputErrors({ ...inputErrors, contactPerson: "" });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { valid, errors } = exhibitorValidate(exhibitorData);
    if (!valid) {
      setInputErrors(errors);
      console.log(errors);
      return;
    }
  }

  console.log("inputErrors", inputErrors);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-[100%]">
          <Input
            inputLabel="Name of Company/Institution"
            onChange={handleName}
            error={inputErrors?.name ? inputErrors?.name : ""}
            value={exhibitorData.name}
          />
          <Input
            inputLabel="Email Address"
            onChange={handleEmail}
            error={inputErrors?.email ? inputErrors?.email : ""}
            value={exhibitorData.email}
          />
          <Input
            inputLabel="Contact Person"
            onChange={handleContactPerson}
            error={inputErrors?.contactPerson ? inputErrors?.contactPerson : ""}
            value={exhibitorData.contactPerson}
          />
          <Input
            inputLabel="Phone Number"
            onChange={handlePhone}
            error={inputErrors?.phoneNumber ? inputErrors?.phoneNumber : ""}
            value={exhibitorData.phoneNumber}
          />
          <TextArea
            inputLabel="Description of Service"
            onChange={handleDescription}
            error={inputErrors?.description ? inputErrors?.description : ""}
            value={exhibitorData.description}
          />
        </div>
        <p
          className={`text-[14px] mb-[5px] mt-[8px] opacity-70 ${
            inputErrors.spaceReserved ? "text-red-700" : ""
          }`}
        >
          {inputErrors.spaceReserved
            ? inputErrors.spaceReserved
            : "Space Reserved"}
        </p>
        <div className="border border-gray-300 px-[18px] rounded-[6px] cursor-pointer">
          {selectedSpace ? (
            <p
              onClick={() => setShowSpacesDropDown(!showSpacesDropdown)}
              className="py-2"
            >
              TENTS ({selectedSpace.tent}) {selectedSpace.price}/-
            </p>
          ) : (
            <p
              onClick={() => setShowSpacesDropDown(!showSpacesDropdown)}
              className="py-2 opacity-70"
            >
              Select
            </p>
          )}
          {showSpacesDropdown ? (
            <SpacesDropdown
              selectedSpace={selectedSpace}
              setSelectedSpace={setSelectedSpace}
              setShowSpacesDropdown={setShowSpacesDropDown}
              setExhibitorData={setExhibitorData}
              exhibitorData={exhibitorData}
            />
          ) : null}
        </div>

        <div className="flex flex-col items-center">
          <Button text="Reserve" />
        </div>
      </form>
    </div>
  );
}
