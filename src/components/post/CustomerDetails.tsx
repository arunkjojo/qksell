import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAlphabetInput, useNumericInput } from '@hooks/useInputs';

import { setUserNumber, setUserName } from '@store/formSlice';

import { PageHeader } from './PageHeader';
import Input from '@ui/Input';
import { useGoToBack } from '@utils/useGoToBack';

export const CustomerDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userName, userMobile } = useAppSelector((state) => state.form);
    const goToBack = useGoToBack();

    const [name, setName] = useAlphabetInput(userName || '');
    const [mobile, setMobile] = useNumericInput(`${userMobile ? userMobile : ''}`);


    useEffect(() => {
        dispatch(setUserNumber(parseInt(mobile, 10)));
    }, [dispatch, mobile]);

    useEffect(() => {
        dispatch(setUserName(name || ''));
    }, [dispatch, name]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-20">
            <div className="max-w-7xl mx-auto">
                <PageHeader title="Customer Details" showBack={true} onBack={goToBack} />

                <motion.div
                    className="grid gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-4">
                        <Input
                            id="userName"
                            label="Name"
                            value={name}
                            onChange={setName}
                            placeholder="Enter Your Name"
                            type="text"
                            minLength={3}
                            maxLength={15}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            id="userMobile"
                            label="WhatsApp Number"
                            value={mobile}
                            onChange={setMobile}
                            placeholder="Enter WhatsApp Number"
                            type="tel"
                            min={7000000000}
                            max={9999999999}
                            minLength={10}
                            maxLength={10}
                            onInput={setMobile}
                            required
                            fullWidth
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
