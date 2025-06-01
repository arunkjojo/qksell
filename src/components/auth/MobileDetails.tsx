import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import Input from '@ui/Input';
import Button from '@ui/Button';
import { setAuthMobile } from '@store/authSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';

interface MobileDetailsProps {
    setError: (msg: string) => void;
    setLoading: (loading: boolean) => void;
    sendAuthCode: () => void;
    error?: string;
    loading?: boolean;
}

export const MobileDetails: React.FC<MobileDetailsProps> = (props) => {
    const {
        setError,
        setLoading,
        sendAuthCode,
        error = '',
        loading = false
    } = props;
    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] = useState('9');
    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        dispatch(setAuthMobile(phoneNumber));
        if (phoneNumber && phoneNumber?.length === 10) sendAuthCode();
        else setError('Enter the mobile number');
      };
    return (
        <form onSubmit={handleSendCode}>
            <div className="mb-4">
                <Input
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    minLength={10}
                    maxLength={10}
                    icon={<Phone size={18} />}
                    required
                    fullWidth
                    readOnly={loading}
                />
            </div>

            {error && (
                <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
            >
                Send Verification Code
            </Button>
        </form>
    );
};
