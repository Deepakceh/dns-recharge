import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { BadgeCheck } from 'lucide-react';

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
  inputMode?: 'int' | 'num' | 'alpha' | 'alphanum';
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
  onVerificationIconClick,
  inputMode
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.includes(e.key)) return;

    switch (inputMode) {
      case 'int':
        if (!/^[0-9]$/.test(e.key)) e.preventDefault();
        break;

      case 'num':
        if (!/^[0-9.]$/.test(e.key)) {
          e.preventDefault();
        } else {
          const inputValue = (e.target as HTMLInputElement).value;
          // Prevent multiple dots
          if (e.key === '.' && inputValue.includes('.')) {
            e.preventDefault();
          }
        }
        break;
      case 'alpha':
        if (!/^[a-zA-Z\s]$/.test(e.key)) e.preventDefault();
        break;
      case 'alphanum':
        if (!/^[a-zA-Z0-9]$/.test(e.key)) e.preventDefault();
        break;
      default:
        // Allow all
        break;
    }
  };

  let htmlInputMode: string | undefined;
  let pattern: string | undefined;

  switch (inputMode) {
    case 'int':
    case 'num':
      htmlInputMode = 'numeric';
      pattern = '[0-9]*';
      break;
    case 'alpha':
      pattern = '[A-Za-z]+( [A-Za-z]+)*';
      break;
    case 'alphanum':
      pattern = '[a-zA-Z0-9]*';
      break;
    default:
      htmlInputMode = undefined;
      pattern = undefined;
  }



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
        id={name} // ✅ Make label clickable
        name={name}
        type={type}
        as={Input}
        maxLength={maxLength}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputMode={htmlInputMode}
        pattern={pattern}
        disabled={disabled}
        className={`peer w-full border border-gray-300 rounded px-3 pr-10 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none ${heightClass} ${className}`} // ✅ Added peer
      />

      {labelType === "floating" && (
        <label
          htmlFor={name} // ✅ Match input ID
          className="absolute left-3 top-1 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700"
        >
          {label}
        </label>
      )}

      {showVerificationIcon && verifiedStatus !== null && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg">
          {verifiedStatus ? (
            <span className="text-green-500"><BadgeCheck /></span>
          ) : (
            <button
              type="button"
              onClick={onVerificationIconClick}
              className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
            >
              <BadgeCheck />
            </button>
          )}
        </div>
      )}

      <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
        <ErrorMessage name={name} />
      </div>
    </div>

  );
};

export default InputField;
