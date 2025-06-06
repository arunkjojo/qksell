import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { PageHeader } from './PageHeader';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useNumericInput } from '@hooks/useInputs';
import { setCommission, setOwnerAgent, setPostDescription, setPostRate, setSellRent } from '@store/formSlice';
import Input from '@ui/Input';
import Textarea from '@ui/Textarea';
import SelectedButton from '@ui/SelectedButton';
import RenderIcon from '@ui/RenderIcon';
import { numberToIndianRupees } from '@utils/numberToIndianRupees';
import { useGoToBack } from '@utils/useGoToBack';
import { OWNER_AGENT, SELL_RENT } from '@common/constants';
import { SellRent } from '@common/types';

export const PostRateAndDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const { postRate, postDescription, sellRent: selectedSellRent, ownerAgent, commission } = useAppSelector((state) => state.form);
    const goToBack = useGoToBack();

    const [rate, setRate] = useNumericInput(`${postRate ? postRate : ''}`);
    const [description, setDescription] = useState<string>(postDescription || '');
    const [commissions, setCommissions] = useState<string>(commission ? String(commission) : '1%');
    const [rateInWard, setRateInWard] = useState<string>('');

    useEffect(() => {
        dispatch(setPostRate(parseInt(rate, 10)));
        const num = Number(parseInt(rate, 10));
        if (!isNaN(num) && num > 0) setRateInWard(numberToIndianRupees(num));
        else setRateInWard('');
    }, [dispatch, rate]);

    useEffect(() => {
        dispatch(setPostDescription(description || ''));
    }, [description, dispatch]);

    useEffect(() => {
        dispatch(setCommission(commissions || '1%'));
    }, [commissions, dispatch]);

    const handleSelect = (data: SellRent, field: string) => {
        switch (field) {
            case 'sell_rent':
                dispatch(setSellRent(data))
                break;
            case 'ower_agent':
                dispatch(setOwnerAgent(data))
                break;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-20">
            <div className="max-w-7xl mx-auto">

                <PageHeader title="Post Details" showBack={true} onBack={goToBack} />
                <motion.div
                    className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {SELL_RENT.map((item) => {
                        const icon = RenderIcon(item.icon)
                        return (<SelectedButton
                            key={item.id}
                            icon={icon}
                            children={item.name}
                            onClick={() => handleSelect(item, 'sell_rent')}
                            isSelected={selectedSellRent?.name === item.name}
                        />
                        )
                    })}
                </motion.div>
                <motion.div
                    className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {OWNER_AGENT.map((item) => {
                        const icon = RenderIcon(item.icon)
                        return (<SelectedButton
                            key={item.id}
                            icon={icon}
                            children={item.name}
                            onClick={() => handleSelect(item, 'owner_agent')}
                            isSelected={ownerAgent?.name === item.name}
                        />
                        )
                    })}
                </motion.div>

                <motion.div
                    className="grid gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-4">
                        <Input
                            id="postRate"
                            label="Amount"
                            value={rate}
                            onChange={setRate}
                            placeholder="Enter post rate / amount"
                            type="number"
                            min={1}
                            minLength={1}
                            onInput={setRate}
                            required
                            fullWidth
                        />
                        {rateInWard && (
                            <p className='text-ellipsis text-md text-indigo-500'>
                                {rateInWard ? `${rateInWard} Rupees` : ''}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <Input
                            id="postCommission"
                            label="Commission"
                            value={commissions}
                            onChange={(e) => setCommissions(e.target.value)}
                            placeholder="Enter Commission"
                            type="text"
                            min={1}
                            minLength={1}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="mb-4">
                        <Textarea
                            id="postDescription"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter post description"
                            required
                            rows={8}
                            fullWidth
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
