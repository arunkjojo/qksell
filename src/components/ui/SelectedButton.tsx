import React from 'react';

interface SelectedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode | string;
    fullWidth?: boolean;
    isLoading?: boolean;
    isSelected?: boolean; // <-- New prop
    subLabel?: string
}

const SelectedButton: React.FC<SelectedButtonProps> = ({
    children,
    variant = 'primary',
    size = 'lg',
    // icon,
    fullWidth = false,
    isLoading = false,
    isSelected = false, // <-- Default value
    className = '',
    disabled,
    subLabel = null,
    ...props
}) => {
    const baseClasses =
        'flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:!text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        secondary: 'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
        link: 'bg-transparent text-blue-600 hover:underline focus-visible:ring-transparent',
    };

    const sizeClasses = {
        sm: 'h-2 px-3 text-xs',
        md: 'h-14 px-4 text-sm',
        lg: 'h-18 px-6 text-base',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const selectedClasses = isSelected
        ? '!bg-indigo-600 !text-white border-2 border-indigo-700'
        : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${selectedClasses} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {/* <div className="w-12 h-12 flex items-center justify-center mb-3 bg-blue-100 rounded-full transition-colors">
                {icon && !isLoading && <span className="mx-auto">{icon}</span>}
            </div> */}
            <h3 className={`font-medium text-gray-900 ${isSelected && 'text-white'}`}>{children}</h3>
            {subLabel && <span className="text-sm text-gray-500 mt-1">{subLabel}</span>}
        </button>
    );
};

export default SelectedButton;
