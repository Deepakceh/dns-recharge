import * as Yup from "yup";

// Common validation function
export const getValidationSchema = ({ isRequired = false, type = "text", minLength = 0, maxLength = 255 }: {
  isRequired?: boolean;
  type?: "text" | "email" | "number" | "phone" | "aadhar" | "pan" | "gst" | "url" | "ip";
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
      validator = validator.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address");
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
      // GSTIN: 2 digits, 5 letters, 4 digits, 1 letter, 1 alphanumeric, Z, 1 alphanumeric
      validator = validator.matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/, "Invalid GST number");
      break;
    case "number":
      validator = validator.matches(/^\d+$/, "Only numbers are allowed");
      break;
    case "url":
      validator = validator.matches(
        /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
        "Invalid URL"
      );
      break;
    case "ip":
      validator = validator.matches(
        /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
        "Invalid IP address"
      );
      break;
    default:
      break;
  }

  return validator;
};
