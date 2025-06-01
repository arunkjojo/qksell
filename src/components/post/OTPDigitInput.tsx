import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { OTPDigitInputProps } from '@common/types';

export const OTPDigitInput = ({
    value,
    onChange,
    onKeyDown,
    onPaste,
    onFocus,
    id,
    isDisabled = false,
    isError = false,
    isActive,
    autoFocus = false,
}: OTPDigitInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isActive && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isActive]);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digit = e.target.value;
        // Only allow single digit
        if (/^\d{0,1}$/.test(digit)) {
            onChange(digit);
        }
    };

    const getInputBorderColor = () => {
        if (isError) return 'border-red-500';
        if (isActive) return 'border-blue-500';
        if (value) return 'border-gray-400';
        return 'border-gray-300';
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: Number(id) * 0.05 }}
            className="relative w-14 h-16 sm:w-16 sm:h-20"
        >
            <motion.input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                id={id}
                name={id}
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                onPaste={onPaste}
                onFocus={onFocus}
                disabled={isDisabled}
                className={`w-full h-full text-center text-2xl font-medium rounded-lg border-2 ${getInputBorderColor()} 
          focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 bg-white`}
                whileFocus={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            />
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                    scaleX: isActive ? 1 : 0
                }}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 origin-left"
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
};