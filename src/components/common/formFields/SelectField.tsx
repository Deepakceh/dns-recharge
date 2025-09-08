import React from "react";
import { Field, ErrorMessage, useFormikContext, FieldProps } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { id: number | string; name: string }[];
  className?: string;
  disabled?: boolean;
  labelType?: "top" | "floating";
  onCustomChange?: (value: string) => void;
  useFormik?: boolean; // ✅ default true
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
  onCustomChange,
  useFormik = true,
}) => {
  const [localValue, setLocalValue] = React.useState<string>("");

  // Always call the hook unconditionally
  let formikContext: ReturnType<typeof useFormikContext<FormValues>> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    formikContext = useFormikContext<FormValues>();
  } catch {
    formikContext = null;
  }

  const formik = useFormik ? formikContext : null;

  const selectedValue = formik ? formik.values[name] : localValue;
  const setFieldValue = formik ? formik.setFieldValue : (_: string, val: string) => setLocalValue(val);

  const finalOptions = [{ id: "", name: `Select ${label}` }, ...options];

  return (
    <div className="relative w-full">
      {labelType === "top" && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {formik ? (
        // ✅ Formik Mode (Native <select>)
        <Field name={name}>
          {({ field }: FieldProps) => (
            <select
              {...field}
              id={name}
              disabled={disabled}
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue(name, value);
                if (onCustomChange) onCustomChange(value);
              }}
              className={`h-10 w-full border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 text-black`}>
              {labelType === "floating" && (
                <option value="" disabled hidden>
                  Select {label}
                </option>
              )}
              {finalOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
        </Field>
      ) : (
        // ✅ Non-Formik Mode (Shadcn Select)
        <Select
          disabled={disabled}
          value={selectedValue}
          onValueChange={(val) => {
            setFieldValue(name, val);
            if (onCustomChange) onCustomChange(val);
          }}
        >
          <SelectTrigger className={`w-[180px] ${className}`}>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option.id} value={String(option.id)}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {/* Error message sirf Formik ke liye */}
      {formik && (
        <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default SelectField;
