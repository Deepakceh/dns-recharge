import React from "react";
import {
  Field,
  ErrorMessage,
  useFormikContext,
  FieldProps,
} from "formik";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  className?: string;
  disabled?: boolean;
  labelType?: "top" | "floating";
}

interface FormValues {
  [key: string]: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  className = "",
  disabled = false,
  labelType = "top", // default
}) => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const selectedValue = values[name];
  const heightClass = labelType === "top" ? "h-9" : "h-12";

  return (
    <div className="relative w-full">
      {/* Show top label only when labelType is 'top' */}
      {labelType === "top" && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <Field name={name}>
        {({ field }: FieldProps) => (
          <select
            {...field}
            id={name}
            disabled={disabled}
            onChange={(e) => setFieldValue(name, e.target.value)}
            className={`${heightClass} w-full border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 ${className} ${!selectedValue ? "text-gray-400" : "text-black"}`}
          >
            {/* Floating label becomes placeholder */}
            {labelType === "floating" && (
              <option value="" disabled hidden>
                Select {label}
              </option>
            )}

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-gray-700"
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default SelectField;
