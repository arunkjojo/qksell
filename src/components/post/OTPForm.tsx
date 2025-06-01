import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { OTPFormProps, VerificationState } from '@common/types';
import { useAppSelector } from '@hooks/useAppSelector';
import { useGoToBack } from '@utils/useGoToBack';
import { PageHeader } from './PageHeader';
import { OTPInput } from './OTPInput';
import { OTPVerificationStatus } from './OTPVerificationStatus';

export const OTPForm = ({
    onSubmit,
    length = 4,
    resendOTP,
    phoneNumber,
}: OTPFormProps) => {
    
    const { otpVerification } = useAppSelector((state) => state.form);
    const goToBack = useGoToBack();

    const { timeout, status } = otpVerification;
    const [resendCountdown, setResendCountdown] = useState(0);
    const [resendOtp, setResendOtp] = useState(false);
    const [verificationState, setVerificationState] = useState<VerificationState>({
        status: 'idle',
        message: '',
    });
    
    useEffect(() => {
        let countdown = timeout ? parseInt(timeout, 10) : 60;
        setResendCountdown(countdown);

        const timer = setInterval(() => {
            countdown -= 1;
            setResendCountdown(countdown);

            if (countdown <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }, [timeout]);
    useEffect(() => {
        if (status) {
            setVerificationState({
                status: 'success',
                message: 'Verification successful!',
            });
        } else if (resendCountdown > 0) {
            setVerificationState({
                status: 'idle',
                message: '',
            });
        } else {
            setVerificationState({
                status: 'error',
                message: 'OTP Timeout',
            });
        }
    }, [status, resendCountdown]);

    const handleComplete = useCallback(async (otp: string) => {
        try {
            setVerificationState({
                status: 'loading',
                message: 'Verifying your code...',
            });
            await onSubmit(otp);
        } catch (error) {
            setVerificationState({
                status: 'error',
                message: error instanceof Error ? error.message : 'Verification failed. Please try again.',
            });
        }
    }, [onSubmit]);

    const resendOTPHandler = useCallback(() => {
        setResendOtp(true);
        setVerificationState({
            status: 'loading',
            message: 'Resending OTP...',
        });
        resendOTP?.();
        setTimeout(() => {
            setResendOtp(false);
            setVerificationState({
                status: 'idle',
                message: '',
            });
        }, 2000);
    }, [resendOTP]);

    return (
        <div className="w-full max-w-md mx-auto py-8">
            <PageHeader title="OTP Verification" showBack={true} onBack={goToBack} />
            <motion.div
                className="bg-white shadow-lg rounded-xl p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Verification Code</h2>
                    <p className="text-gray-600 mt-2">
                        {phoneNumber ? (
                            <>Enter the code sent to <span className="font-medium">{phoneNumber}</span></>
                        ) : (
                            <>Enter the verification code</>
                        )}
                    </p>
                </div>

                <OTPInput
                    length={length}
                    onComplete={handleComplete}
                    autoFocus
                    isDisabled={verificationState.status === 'loading' || verificationState.status === 'success'}
                    isError={verificationState.status === 'error'}
                    className="mb-6"
                    clear={resendOtp}
                />

                <OTPVerificationStatus state={verificationState} />

                {resendOTP && (
                    <motion.div
                        className="mt-6 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            type="button"
                            onClick={resendOTPHandler}
                            disabled={resendCountdown > 0 || verificationState.status === 'loading'}
                            className={`flex items-center text-sm font-medium transition-colors 
                ${resendCountdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                        >
                            <RefreshCw size={16} className="mr-1" />
                            {resendCountdown > 0
                                ? `Resend code in ${resendCountdown}s`
                                : 'Resend verification code'}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};