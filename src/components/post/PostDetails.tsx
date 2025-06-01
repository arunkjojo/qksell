import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { PageHeader } from './PageHeader';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useNumericInput } from '@hooks/useInputs';
import { setPostDescription, setPostRate, setSellRent } from '@store/formSlice';
import Input from '@ui/Input';
import Textarea from '@ui/Textarea';
import SelectedButton from '@ui/SelectedButton';
import RenderIcon from '@ui/RenderIcon';
import { numberToIndianRupees } from '@utils/numberToIndianRupees';
import { useGoToBack } from '@utils/useGoToBack';
import { SELL_RENT } from '@common/constants';
import { SellRent } from '@common/types';

export const PostRateAndDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const { postRate, postDescription, sellRent: selectedSellRent } = useAppSelector((state) => state.form);
    const goToBack = useGoToBack();

    const [rate, setRate] = useNumericInput(`${postRate ? postRate : ''}`);
    const [description, setDescription] = useState<string>(postDescription || '');
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

    const handleSelect = (data: SellRent) => dispatch(setSellRent(data));

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-20">
            <div className="max-w-7xl mx-auto">

                <PageHeader title="Sell or Rent" showBack={true} onBack={goToBack} />
                <motion.div
                    className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
                            onClick={() => handleSelect(item)}
                            isSelected={selectedSellRent?.name === item.name}
                        />
                        )
                    })}
                </motion.div>

                <PageHeader title="Post Details" showBack={false} extraClass='mt-3' />

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
