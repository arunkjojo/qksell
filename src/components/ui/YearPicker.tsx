import React, { forwardRef } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface YearPickerProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    startYear?: number;
    endYear?: number;
}

const YearPicker = forwardRef<HTMLSelectElement, YearPickerProps>(({
    label,
    error,
    fullWidth = false,
    className = '',
    id,
    startYear = 1900,
    endYear = new Date().getFullYear(),
    ...props
}, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const widthClass = fullWidth ? 'w-full' : '';

    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => endYear - i
    );

    return (
        <div className={`${widthClass}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    ref={ref}
                    id={inputId}
                    className={`
            block rounded-md shadow-sm border-gray-300 
            focus:ring-blue-500 focus:border-blue-500
            text-black appearance-none
            pl-10 pr-8
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${widthClass} h-10 text-sm
            ${className}
          `}
                    {...props}
                >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown size={18} className="text-gray-400" />
                </div>
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
});

YearPicker.displayName = 'YearPicker';

export default YearPicker;