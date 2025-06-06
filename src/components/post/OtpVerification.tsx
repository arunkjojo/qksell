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
                dispatch(setCompleteStep(APP_PATH.OTP));
            }
        }
    };

    const handleResendOTP = () => sendOtp();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {!status && (
                <OTPForm
                    onSubmit={handleOTPSubmit}
                    resendOTP={handleResendOTP}
                    phoneNumber={userMobile ? `${userMobile}` : ''}
                />
            )}
        </div>
    );
}