import React, { useEffect, useState } from 'react';

import { useAppSelector } from '@hooks/useAppSelector';
import { MobileDetails } from '@components/auth/MobileDetails';
import { OTPForm } from '@components/auth/OTPForm';
import { AuthLoginResponse, OtpResponse, VerificationResponse } from '@common/types';
import { authLogin, sendSMS, validateOtp } from '@common/api';
import { setAuthOtpCredentials, setAuthToken } from '@common/store/authSlice';
import { SMS_RESPONSE } from '@common/constants';
import { useAppDispatch } from '@common/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@utils/setCookie';

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { authMobile, otp, authToken } = useAppSelector((state) => state.auth);
  const { id, status } = otp;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendOtp = async () => {
    if (!authMobile || authMobile?.length !== 10) {
      setError('Enter correct mobile number');
    } else {
      const otpResponse: OtpResponse | undefined = await sendSMS(`${authMobile}`);
      if (otpResponse && otpResponse?.responseCode === SMS_RESPONSE.SUCCESS) {
        dispatch(setAuthOtpCredentials({
          status: false,
          id: otpResponse.verificationId,
          timeout: otpResponse.timeout
        }))
      }
    }
  }
  const handleSendAuthCode = async () => {
    try {
      sendOtp();
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (otpValue: string) => {
    const verificationId = id || '';
    const code = otpValue;
    const mobileNumber = `${authMobile}`;
    const validateOtpCondition = code && code !== '' && verificationId && verificationId !== '' && authMobile && mobileNumber !== '';
    if (validateOtpCondition) {
      const verificationResponse: VerificationResponse | undefined = await validateOtp(verificationId, code, mobileNumber);
      if (verificationResponse && verificationResponse?.responseCode === SMS_RESPONSE.SUCCESS) {
        dispatch(setAuthOtpCredentials({
          status: true
        }));
      }
    }
  };
  const handleResendOTP = () => sendOtp();
  useEffect(() => {
    const getAuthToken = async () => {
      const loginResponse: AuthLoginResponse | undefined = await authLogin(`${authMobile}`);
      if (loginResponse && loginResponse?.token) {
        dispatch(setAuthToken(loginResponse?.token || ''));
        setCookie('userToken', loginResponse?.token, 30);
      }
    };

    if (authMobile && authToken && status && authMobile?.length === 10 && authToken !== '') {
      navigate('/profile');
    }
    if (authMobile && status && authMobile?.length === 10) {
      getAuthToken();
    }
  }, [authMobile, status, authToken, navigate, dispatch]);
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in with Phone</h2>

        {id && authMobile && authMobile?.length === 10 ? <OTPForm onSubmit={handleOTPSubmit} resendOTP={handleResendOTP} phoneNumber={authMobile} /> : <MobileDetails loading={loading} error={error} setLoading={setLoading} setError={setError} sendAuthCode={handleSendAuthCode} />}
      </div>
    </div>
  );
};