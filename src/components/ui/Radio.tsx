import React, { forwardRef } from 'react';

interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
    options: RadioOption[];
    direction?: 'horizontal' | 'vertical';
}

const Radio = forwardRef<HTMLInputElement, RadioGroupProps>(({
    label,
    error,
    options,
    direction = 'vertical',
    className = '',
    name,
    ...props
}, ref) => {
    const directionClass = direction === 'horizontal' ? 'flex gap-4' : 'flex flex-col gap-2';

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className={directionClass}>
                {options.map((option, index) => (
                    <label key={option.value} className="flex items-center">
                        <input
                            ref={index === 0 ? ref : undefined}
                            type="radio"
                            name={name}
                            value={option.value}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            {...props}
                        />
                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
});

Radio.displayName = 'Radio';

export default Radio;