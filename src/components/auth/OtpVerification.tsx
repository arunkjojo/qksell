import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';

import { setOtpCredentials } from '@store/formSlice';
import { setCompleteStep } from '@store/appSlice';

import { sendSMS, validateOtp } from '@api/index';

import { APP_PATH, SMS_RESPONSE } from '@common/constants';
import { OtpResponse, VerificationResponse } from '@common/types';

import { OTPForm } from './OTPForm';

export const OtpVerification = () => {
    const dispatch = useAppDispatch();
    const { otpVerification, userMobile } = useAppSelector((state) => state.form);

    const { status, id } = otpVerification;

    const sendOtp = async () => {
        const otpResponse : OtpResponse | undefined = await sendSMS(`${userMobile}`);
        if (otpResponse && otpResponse?.responseCode === SMS_RESPONSE.SUCCESS) {
          dispatch(setOtpCredentials({
            status: false,
            id: otpResponse.verificationId,
            timeout: otpResponse.timeout
          }))
        }
      }

    const handleOTPSubmit = async (otp: string) => {
        const verificationId = id || '';
        const code = otp;
        const mobileNumber = `${userMobile}`;
        const validateOtpCondition = code && code !== '' && verificationId && verificationId !== '' && userMobile && mobileNumber !== '';
        if (validateOtpCondition) {
            const verificationResponse: VerificationResponse | undefined = await validateOtp(verificationId, code, mobileNumber);
            if (verificationResponse && verificationResponse?.responseCode === SMS_RESPONSE.SUCCESS) {
                dispatch(setOtpCredentials({
                    status: true
                }));
            }
        }
    };

    const handleResendOTP = () => sendOtp();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {status ? (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Successful!</h2>
                    <p className="text-gray-600 mb-6">Your identity has been verified successfully.</p>
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => {
                            dispatch(setCompleteStep(APP_PATH.OTP));
                        }}
                    >
                        Create New Post
                    </button>
                </div>
            ) : (
                <OTPForm
                    onSubmit={handleOTPSubmit}
                    resendOTP={handleResendOTP}
                    phoneNumber={userMobile ? `${userMobile}` : ''}
                />
            )}
        </div>
    );
}