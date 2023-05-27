import { ExhibitorData, LoginData, LoginErrors } from "@/utils/types";
import { counties } from "./counties";
import { Errors, UserData, ExhibitorErrors } from "./types";

export function loginValidate(loginData: LoginData) {
  const errors: LoginErrors = {};
  const { email, password } = loginData;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email.trim() === "") {
    errors.email = "Please enter your email address";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (password.trim() === "") {
    errors.password = "Please enter your password";
  } else if (password.length < 6) {
    errors.password = "Password should be at least 6 characters";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export function exhibitorValidate(exhibitorData: ExhibitorData) {
  const errors: ExhibitorErrors = {};
  const {
    name,
    description,
    phoneNumber,
    spaceReserved,
    email,
    contactPerson,
  } = exhibitorData;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  exhibitorStringValidator(errors, name, "name");
  exhibitorStringValidator(errors, description, "description");
  exhibitorStringValidator(errors, spaceReserved, "spaceReserved");
  exhibitorStringValidator(errors, contactPerson, "contactPerson");

  if (email.trim() === "") {
    errors.email = "Please enter your email address";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (phoneNumber.trim() === "") {
    errors.phoneNumber = "Please provide your phone number";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

function exhibitorStringValidator(
  errors: ExhibitorErrors,
  value: string,
  field: keyof ExhibitorErrors
) {
  let emptyMessage = "";
  let invalidMessage = "";

  switch (field) {
    case "name":
      emptyMessage = "Please provide your company/institution name";
      invalidMessage =
        "Company/institution name should contain letters and spaces only";
      break;
    case "spaceReserved":
      emptyMessage = "Please select a space that you would like to reserve";
      invalidMessage = "Space should contain letters and spaces only";
      break;
    case "description":
      emptyMessage = "Please provide a short description of your service(s)";
      break;
    case "contactPerson":
      emptyMessage = "Please provide name of contact person";
      invalidMessage = "Name should contain letters and spaces only";
      break;
  }

  const lettersSpacesRegex = /^[a-zA-Z\s]+$/;
  if (value.trim() === "") {
    errors[field] = emptyMessage;
  } else if (!lettersSpacesRegex.test(value)) {
    errors[field] = invalidMessage;
  }
}

export function registerValidate(userData: UserData) {
  const errors: Errors = {};
  const { name, tscNumber, school, county, subCounty, email, phoneNumber } =
    userData;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  stringValidator(errors, name, "name");
  stringValidator(errors, subCounty, "subCounty");
  stringValidator(errors, county, "county");
  stringValidator(errors, school, "school");

  if (email.trim() === "") {
    errors.email = "Please enter your email address";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (tscNumber.trim() === "") {
    errors.tscNumber = "Please provide your TSC number";
  }

  if (phoneNumber.trim() === "") {
    errors.phoneNumber = "Please provide your phone number";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

function stringValidator(errors: Errors, value: string, field: keyof Errors) {
  let emptyMessage = "";
  let invalidMessage = "";

  switch (field) {
    case "name":
      emptyMessage = "Please provide your full names";
      invalidMessage = "Name should contain letters and spaces only";
      break;
    case "subCounty":
      emptyMessage = "Please provide your sub county";
      invalidMessage = "Sub county should contain letters and spaces only";
      break;
    case "county":
      emptyMessage = "Please provide your county";
      invalidMessage = "County should contain letters and spaces only";
      break;
    case "school":
      emptyMessage = "Please provide your school name";
      invalidMessage = "School name should contain letters and spaces only";
      break;
  }

  if (value.trim() === "") {
    errors[field] = emptyMessage;
  }
}
