import React, { forwardRef } from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
    description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    error,
    description,
    className = '',
    ...props
}, ref) => {
    return (
        <div className={className}>
            <label className="flex items-start">
                <input
                    ref={ref}
                    type="checkbox"
                    className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...props}
                />
                <div className="ml-2">
                    {label && (
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                    )}
                    {description && (
                        <p className="text-sm text-gray-500">{description}</p>
                    )}
                </div>
            </label>
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;