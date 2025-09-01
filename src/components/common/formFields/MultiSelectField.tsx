import React, { useState, useRef, useEffect } from "react";

type Option = {
  id: string;
  name: string;
};

type MultiSelectProps = {
  label: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const isAllSelected = value.length === options.length;

  const toggleAll = () => {
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange(options.map((o) => o.id));
    }
  };

  const toggleOption = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="w-64 relative" ref={dropdownRef}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {/* Input Box */}
      <div
        className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer min-h-[40px] flex flex-wrap gap-1 items-center overflow-hidden max-h-[60px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-1 overflow-y-auto max-h-[50px]">
            {value.map((id) => {
              const option = options.find((o) => o.id === id);
              return (
                <span key={id} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  {option?.name}
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Select options</span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {/* All Option */}
          <div
            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={toggleAll}
          >
            <input type="checkbox" className="mr-2" readOnly checked={isAllSelected} />
            <span className="text-sm">All</span>
          </div>

          {/* Options */}
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleOption(option.id)}
            >
              <input type="checkbox" className="mr-2" readOnly checked={value.includes(option.id)} />
              <span className="text-sm">{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
