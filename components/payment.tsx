import React, { useState } from "react";
import Button from "./button";
import Input from "./input";

export default function Payment({
  setCode,
  handleSubmit,
  codeError,
  setShowPayment,
  code,
  setCodeError,
}: {
  setCode: (value: string) => void;
  handleSubmit: (value: any) => void;
  setCodeError: (value: string) => void;
  codeError: string;
  setShowPayment: (value: boolean) => void;
  code: string;
}) {
  function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
    setCodeError("");
    setCode(event.target.value);
  }

  function handleBack() {
    setShowPayment(false);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <Input
          inputLabel="M-PESA Code"
          error={codeError}
          onChange={handleCode}
          value={code}
        />
        <div className="flex items-center justify-around ">
          <div onClick={handleBack} className="">
            <span className="text-blue-500  hover:cursor-pointer">Back</span>
          </div>
          <div>
            <Button text="Confirm" />
          </div>
        </div>
      </form>
    </div>
  );
}
