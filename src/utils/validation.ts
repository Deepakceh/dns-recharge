import * as Yup from "yup";

// Common validation function
export const getValidationSchema = ({
  isRequired = false,
  type = "text",
  minLength = 0,
  maxLength = 255,
}: {
  isRequired?: boolean;
  type?: "text" | "email" | "number" | "phone" | "aadhar" | "pan" | "gst";
  minLength?: number;
  maxLength?: number;
}) => {
  let validator = Yup.string()
    .min(minLength, `Minimum length is ${minLength} characters`)
    .max(maxLength, `Maximum length is ${maxLength} characters`);

  // Adding required validation if needed
  if (isRequired) {
    validator = validator.required("This field is required");
  }

  // Adding specific type validations
  switch (type) {
    case "email":
      validator = validator.email("Invalid email address");
      break;
    case "phone":
      validator = validator.matches(/^\d{10}$/, "Invalid phone number");
      break;
    case "aadhar":
      validator = validator.matches(/^\d{12}$/, "Invalid Aadhar number");
      break;
    case "pan":
      validator = validator.matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number");
      break;
    case "gst":
      validator = validator.matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid GST number");
      break;
    case "number":
      validator = validator.matches(/^\d+$/, "Only numbers are allowed");
      break;
    default:
      break;
  }

  return validator;
};
