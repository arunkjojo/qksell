import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { OTPInputProps } from '@common/types';
import { OTPDigitInput } from './OTPDigitInput';

// interface OTPRequestOptions extends CredentialRequestOptions {
//     otp: { transport: ['sms'] };
// }
// interface OTPCredential extends Credential {
//     code: string;
// }

export const OTPInput = ({
    length = 4,
    onComplete,
    autoFocus = true,
    isDisabled = false,
    isError = false,
    className = '',
    clear = false
}: OTPInputProps) => {
    const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
    const [activeInputIndex, setActiveInputIndex] = useState(0);

    useEffect(() => {
        if (clear) {
            setOTP(Array(length).fill(''));
            setActiveInputIndex(0);
        }
    }, [clear, length]);

    // useEffect(() => {
    //     if ('OTPCredential' in window && 'AbortController' in window && !isDisabled) {
    //         const abortController = new AbortController();

    //         const handleOTPReceive = async () => {
    //             try {
    //                 const credential = await navigator.credentials.get({
    //                     otp: { transport: ['sms'] },
    //                     signal: abortController.signal,
    //                 } as OTPRequestOptions);

    //                 const otp = credential as OTPCredential;

    //                 if (otp?.code) {
    //                     let otpCode = otp.code.trim();

    //                     // Optional: if extra safety needed to clean code
    //                     otpCode = otpCode.replace(/\D/g, ''); // Remove non-digit characters

    //                     if (otpCode.length >= length) {
    //                         const otpArray = otpCode.slice(0, length).split('');
    //                         setOTP(otpArray);
    //                         setActiveInputIndex(length - 1); // Focus on last box
    //                         onComplete(otpArray.join(''));
    //                     }
    //                 }
    //             } catch (error) {
    //                 console.error('OTP auto-read error or aborted:', error);
    //             }
    //         };

    //         handleOTPReceive();

    //         return () => {
    //             abortController.abort();
    //         };
    //     }
    // }, [length, onComplete, isDisabled]);

    // Auto-submit when all digits are filled manually
    useEffect(() => {
        const isComplete = otp.every(digit => digit !== '');
        if (isComplete) {
            onComplete(otp.join(''));
            setActiveInputIndex(length - 1);
        }
    }, [otp, onComplete, length]);

    const handleChange = useCallback((value: string, index: number) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        // Auto advance to next input if a value is entered
        if (value && index < length - 1) {
            setActiveInputIndex(index + 1);
        }
    }, [otp, length]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                setActiveInputIndex(index - 1);
                e.preventDefault();
            }
        } else if (e.key === 'Delete') {
            const newOTP = [...otp];
            newOTP[index] = '';
            setOTP(newOTP);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            setActiveInputIndex(index - 1);
            e.preventDefault();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            setActiveInputIndex(index + 1);
            e.preventDefault();
        }
    }, [otp, length]);

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();

        if (!/^\d+$/.test(pastedData)) {
            return;
        }

        const pastedOTP = pastedData.split('').slice(0, length);
        const newOTP = [...otp];

        pastedOTP.forEach((digit, idx) => {
            if (idx < length) {
                newOTP[idx] = digit;
            }
        });

        setOTP(newOTP);

        const nextEmptyIndex = newOTP.findIndex(digit => digit === '');
        if (nextEmptyIndex !== -1) {
            setActiveInputIndex(nextEmptyIndex);
        } else {
            setActiveInputIndex(length - 1);
            // 🎯 Add this: trigger submit if all filled
            onComplete(newOTP.join(''));
        }
    }, [otp, length, onComplete]);

    const handleInputFocus = useCallback((index: number) => {
        setActiveInputIndex(index);
    }, []);

    return (
        <motion.div
            className={`flex justify-center space-x-4 ${className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {otp.map((digit, index) => (
                <OTPDigitInput
                    key={index}
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(value) => handleChange(value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e)}
                    onFocus={() => handleInputFocus(index)}
                    isDisabled={isDisabled}
                    isError={isError}
                    isActive={activeInputIndex === index}
                    autoFocus={autoFocus && index === 0}
                />
            ))}
        </motion.div>
    );
};