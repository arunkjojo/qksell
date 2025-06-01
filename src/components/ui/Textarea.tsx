import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    label,
    error,
    fullWidth = false,
    className = '',
    id,
    rows = 4,
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
            <textarea
                ref={ref}
                id={inputId}
                rows={rows}
                className={`
          block rounded-md shadow-sm border-gray-300 
          focus:ring-blue-500 focus:border-blue-500
          text-black resize-y
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${widthClass} p-3 text-sm
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;