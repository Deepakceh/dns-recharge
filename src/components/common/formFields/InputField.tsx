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
    validator?: any; // You can pass custom validators (like Yup schema) here
    capitalize?: boolean; // Optional prop to handle capitalized input
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => void;

}

const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    type,
    maxLength,
    placeholder,
    className = "",
    disabled = false,
    capitalize, // If this prop is passed, we'll apply uppercase
    onChangeHandler,
}) => {
    const { setFieldValue } = useFormikContext<any>();

    return (
        <div className="relative w-full">
            <Field
                name={name}
                type={type}
                as={Input}
                maxLength={maxLength}
                placeholder={placeholder}
                capitalize={capitalize}
                onChange={(e: any) => {
                    if (onChangeHandler) {
                        onChangeHandler(e, setFieldValue);
                    } else {
                        let value = e.target.value;
                        if (capitalize) {
                            value = value.toUpperCase();
                        }
                        setFieldValue(name, value);
                    }
                }} className={`peer h-12 w-full border border-gray-300 rounded px-3 pt-5 placeholder-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none ${className}`}
                disabled={disabled}
            />
            <label
                htmlFor={name}
                className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700"
            >
                {label}
            </label>
            <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                <ErrorMessage name={name} />
            </div>
        </div>
    );
};

export default InputField;
