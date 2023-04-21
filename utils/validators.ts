import { counties } from "./counties";
import { Errors, UserData } from "./types";

export function registerValidate(userData: UserData) {
  const errors: Errors = {};
  const { name, tscNumber, school, county, subCounty, email, phoneNumber } =
    userData;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  stringValidator(errors, name, "name");
  stringValidator(errors, subCounty, "subCounty");
  stringValidator(errors, school, "school");

  const selectedCounty = counties.filter(
    (countyListItem) =>
      countyListItem.county_name.toLowerCase() === county.toLowerCase()
  );

  if (county.trim() === "") {
    errors.county = "Please enter your county";
  } else if (selectedCounty.length === 0) {
    errors.county = "Please provide a valid county";
  }

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
    case "school":
      emptyMessage = "Please provide your school name";
      invalidMessage = "School name should contain letters and spaces only";
      break;
  }

  const lettersSpacesRegex = /^[a-zA-Z\s]+$/;
  if (value.trim() === "") {
    errors[field] = emptyMessage;
  } else if (!lettersSpacesRegex.test(value)) {
    errors[field] = invalidMessage;
  }
}
