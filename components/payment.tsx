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
  successMessage,
  requestError,
  loading,
}: {
  setCode: (value: string) => void;
  handleSubmit: (value: any) => void;
  setCodeError: (value: string) => void;
  codeError: string;
  setShowPayment: (value: boolean) => void;
  code: string;
  successMessage: string;
  requestError: string;
  loading: boolean;
}) {
  function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
    setCodeError("");
    setCode(event.target.value);
  }

  function handleBack() {
    if (loading) return;
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
        <div className="flex items-center justify-around mt-2">
          <div onClick={handleBack} className="">
            <span className="text-blue-500  hover:cursor-pointer">Back</span>
          </div>
          <div>
            <Button text="Confirm" disabled={loading} />
          </div>
        </div>
        <div className="mt-[10px]">
          {successMessage ? (
            <p className="text-green-500 text-center">{successMessage}</p>
          ) : null}
          {requestError ? (
            <p className="text-red-500 text-center">{requestError}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
