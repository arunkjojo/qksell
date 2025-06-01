import React, { forwardRef } from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
    label,
    error,
    fullWidth = false,
    className = '',
    id,
    ...props
}, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const widthClass = fullWidth ? 'w-full' : '';

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
                <input
                    ref={ref}
                    type="date"
                    id={inputId}
                    className={`
            block rounded-md shadow-sm border-gray-300 
            focus:ring-blue-500 focus:border-blue-500
            text-black
            pl-10
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${widthClass} h-10 text-sm
            ${className}
          `}
                    {...props}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                </div>
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;