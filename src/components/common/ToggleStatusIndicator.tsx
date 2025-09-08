import React from "react";
import clsx from "clsx";

interface ToggleStatusIndicatorProps {
    isOn?: boolean;
    onToggle?: () => void;
}

export const ToggleStatusIndicator: React.FC<ToggleStatusIndicatorProps> = ({
    isOn = false,
    onToggle,
}) => {
    return (
        <div className="cursor-pointer inline-flex items-center" onClick={onToggle}>
            <div
                className={clsx(
                    "relative w-12 h-6 rounded-full transition-colors duration-300 px-1 flex items-center",
                    isOn ? "bg-green-500" : "bg-gray-300"
                )}
            >
                {/* Label inside toggle, aligned left or right */}
                <span className={clsx(
                    "absolute text-[10px] font-semibold text-white transition-all duration-300 w-full px-2",
                    isOn ? "text-left" : "text-right"
                )}
                >
                    {isOn ? "ON" : "OFF"}
                </span>

                {/* Moving circle */}
                <div
                    className={clsx(
                        "w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 transform",
                        isOn ? "translate-x-6" : "translate-x-0"
                    )}
                />
            </div>
        </div>
    );
};
