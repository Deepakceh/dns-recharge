import React from "react";
import { Field, ErrorMessage, useFormikContext, FieldProps } from "formik";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { id: number; name: string }[];
  className?: string;
  disabled?: boolean;
  labelType?: "top" | "floating";
  onCustomChange?: (value: string) => void; // ✅ NEW PROP
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
  labelType = "top",
  onCustomChange, // ✅ destructure here
}) => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const selectedValue = values[name];
  const heightClass = labelType === "top" ? "h-9" : "h-12";
  const finalOptions = [{ id: '', name: `Select ${label}` }, ...options];

  return (
    <div className="relative w-full">
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
            onChange={(e) => {
              const value = e.target.value;
              setFieldValue(name, value); // ✅ Formik update
              if (onCustomChange) {
                onCustomChange(value); // ✅ Call custom method
              }
            }}
            className={`${heightClass} w-full border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 ${className} ${!selectedValue ? "text-gray-400" : "text-black"}`}
          >
            {labelType === "floating" && (
              <option value="" disabled hidden>
                Select {label}
              </option>
            )}

            {finalOptions?.map((option) => (
              <option key={option.id} value={option.id} className="text-gray-700">
                {option.name}
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
