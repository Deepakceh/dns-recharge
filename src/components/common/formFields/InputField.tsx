import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  maxLength?: number;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  validator?: unknown;
  capitalize?: boolean;
  onChangeHandler?: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => void;
  labelType?: "floating" | "top";
  showVerificationIcon?: boolean;
  verifiedStatus?: boolean | null;
  onVerificationIconClick?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  maxLength,
  placeholder,
  className = "",
  disabled = false,
  capitalize,
  onChangeHandler,
  labelType = "top",
  showVerificationIcon,
  verifiedStatus,
  onVerificationIconClick
}) => {
  const { setFieldValue } = useFormikContext<Record<string, unknown>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (capitalize) value = value.toUpperCase();

    if (onChangeHandler) {
      onChangeHandler(e, setFieldValue);
    } else {
      setFieldValue(name, value);
    }
  };

  // Conditionally apply height
  const heightClass = labelType === "top" ? "h-9" : "h-12 pt-4 peer placeholder-transparent";

  return (
    <div className="relative w-full">
      {labelType === "top" && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <Field
        name={name}
        type={type}
        as={Input}
        maxLength={maxLength}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full border border-gray-300 rounded px-3 pr-10 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none ${heightClass} ${className}`}
      />

      {/* ✅ Floating Label */}
      {labelType === "floating" && (
        <label
          htmlFor={name}
          className="absolute left-3 top-1 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700"
        >
          {label}
        </label>
      )}

      {/* ✅ Verification Icon */}
      {showVerificationIcon && verifiedStatus !== null && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg">
          {verifiedStatus ? (
            <span className="text-green-500">✔️</span>
          ) : (
            <button
              type="button"
              onClick={onVerificationIconClick}
              className="text-red-500 focus:outline-none"
            >
              ❌
            </button>
          )}
        </div>
      )}

      {/* ✅ Error Message */}
      <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
        <ErrorMessage name={name} />
      </div>
    </div>

  );
};

export default InputField;
