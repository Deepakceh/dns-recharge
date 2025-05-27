import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

interface SelectFieldProps {
    name: string;
    label: string;
    options: { label: string; value: string }[];
    className?: string;
    disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options,
    className = "",
    disabled = false,
}) => {
    const { setFieldValue, values } = useFormikContext<any>();

    return (
        <div className="relative w-full">
            <Field name={name}>
                {({ field }: any) => (
                    <select
                        {...field}
                        id={name}
                        disabled={disabled}
                        onChange={(e) => setFieldValue(name, e.target.value)}
                        className={`h-12 w-full border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 ${className} ${values[name] === "" ? "text-gray-400" : "text-black"
                            }`}
                    >
                        <option value="" disabled hidden>Select {label}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value} className="text-gray-700" >
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            </Field>

            <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                <ErrorMessage name={name} />
            </div>        </div>
    );
};

export default SelectField;
