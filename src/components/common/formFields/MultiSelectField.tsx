import React, { useState, useRef, useEffect } from "react";
import { Field, ErrorMessage, useFormikContext, FieldProps } from "formik";

type Option = { id: string; name: string; };
interface MultiSelectFieldProps {
  name: string;
  label: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
  labelType?: "top" | "floating";
  onCustomChange?: (value: string[]) => void;
  useFormik?: boolean; // ✅ default true
}

interface FormValues { [key: string]: string[]; }

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  label,
  options,
  className = "",
  disabled = false,
  labelType = "top",
  onCustomChange,
  useFormik = true
}) => {
  const [localValue, setLocalValue] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Always call the hook unconditionally
  let formikContext: ReturnType<typeof useFormikContext<FormValues>> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    formikContext = useFormikContext<FormValues>();
  } catch {
    formikContext = null;
  }

  const formik = useFormik ? formikContext : null;

  const selectedValue: string[] = formik ? formik.values[name] || [] : localValue;
  const setFieldValue = formik
    ? formik.setFieldValue
    : (_: string, val: string[]) => setLocalValue(val);

  const isAllSelected = selectedValue.length === options.length;

  const toggleAll = () => {
    const newVal = isAllSelected ? [] : options.map((o) => o.id);
    setFieldValue(name, newVal);
    if (onCustomChange) onCustomChange(newVal);
  };

  const toggleOption = (id: string) => {
    const newVal = selectedValue.includes(id)
      ? selectedValue.filter((v) => v !== id)
      : [...selectedValue, id];
    setFieldValue(name, newVal);
    if (onCustomChange) onCustomChange(newVal);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const MultiSelectUI = (
    <div className="w-64 relative" ref={dropdownRef}>
      {labelType === "top" && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}

      {/* Input Box */}
      <div
        className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer min-h-[40px] flex flex-wrap gap-1 items-center overflow-hidden max-h-[60px]"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {selectedValue.length > 0 ? (
          <div className="flex flex-wrap gap-1 overflow-y-auto max-h-[50px]">
            {selectedValue.map((id) => {
              const option = options.find((o) => o.id === id);
              return (
                <span key={id} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  {option?.name}
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">
            {labelType === "floating" ? `Select ${label}` : "Select options"}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {options.length > 0 ? (
            <>
              {/* All Option */}
              <div className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={toggleAll}>
                <input type="checkbox" className="mr-2" readOnly checked={isAllSelected} />
                <span className="text-sm">All</span>
              </div>

              {/* Options */}
              {options.map((option) => (
                <div key={option.id} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => toggleOption(option.id)}>
                  <input type="checkbox" className="mr-2" readOnly checked={selectedValue.includes(option.id)} />
                  <span className="text-sm">{option.name}</span>
                </div>
              ))}
            </>
          ) : (
            <div className="px-3 py-2 text-gray-400 text-sm">No records found</div>
          )}
        </div>
      )}

    </div>
  );

  return (
    <div className={`relative w-full ${className}`}>
      {formik ? (
        <Field name={name}>
          {({ field }: FieldProps) => (
            <div {...field}>{MultiSelectUI}</div>
          )}
        </Field>
      ) : (
        MultiSelectUI
      )}

      {/* Error Message sirf Formik ke liye */}
      {formik && (
        <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default MultiSelectField;
