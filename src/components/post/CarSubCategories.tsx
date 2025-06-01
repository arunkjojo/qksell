import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SelectedButton from '@ui/SelectedButton';
import Input from '@ui/Input';
import { PageHeader } from './PageHeader';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setSubCategories } from '@store/formSlice';
import { FUEL_TYPE } from '@common/constants';
import { useGoToBack } from '@utils/useGoToBack';

export const CarSubCategories: React.FC = () => {
    const dispatch = useAppDispatch();
    const { subCategories } = useAppSelector((state) => state.form);
    const goToBack = useGoToBack();
    const noOfSeatCheck = useRef(true);

    const handleSelect = useCallback((value: string, name: string) => {
        const data = {
            name,
            value
        };
        dispatch(setSubCategories(data));
    }, [dispatch]);
    const noOfSeat = subCategories?.find((data: { name: string; }) => data?.name === 'no-of-seat')?.value || '';
    const brandName = subCategories?.find((data: { name: string; }) => data?.name === 'brand-name')?.value || '';
    const modelYear = subCategories?.find((data: { name: string; }) => data?.name === 'model-year')?.value || '';

    useEffect(() => {
        handleSelect('', 'no-of-seat');
    }, [handleSelect]);
    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-20">
            <div className="max-w-7xl mx-auto">
                <>
                    <PageHeader title="Choose Fuel Type" showBack={true} onBack={goToBack} />
                    <motion.div
                        className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {FUEL_TYPE?.map((item) => {
                            const selected = subCategories && subCategories?.some((data: { name: string; value: string; }) => data?.name === 'fuel-type' && data.value === item?.name);
                            return (
                                <SelectedButton
                                    key={item.id}
                                    icon={item.icon}
                                    children={item.name}
                                    onClick={() => handleSelect(item?.name, 'fuel-type')}
                                    isSelected={selected || false}
                                />
                            );
                        })}
                    </motion.div>
                </>
                <motion.div
                    className="grid gap-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Input
                        id="brandName"
                        label="Brand Name"
                        value={brandName || ''}
                        onChange={(e: { currentTarget: { value: string; }; }) => handleSelect(e.currentTarget.value, 'brand-name')}
                        placeholder="Enter Brand Name"
                        type="text"
                        minLength={3}
                        required
                        fullWidth
                    />
                </motion.div>
                <motion.div
                    className="grid gap-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Input
                        id="modelYear"
                        label="Model Year"
                        value={modelYear || ''}
                        onChange={(e: { currentTarget: { value: string; }; }) => handleSelect(e.currentTarget.value, 'model-year')}
                        placeholder="Enter Model Year"
                        type="year"
                        min={1900}
                        max={new Date().getFullYear()}
                        minLength={4}
                        maxLength={4}
                        required
                        fullWidth
                    />
                </motion.div>
                {noOfSeatCheck.current && (
                    <motion.div
                        className="grid gap-4 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Input
                            id="noOfSeat"
                            label="No of Seats"
                            value={noOfSeat || ''}
                            onChange={(e: { currentTarget: { value: string; }; }) => handleSelect(e.currentTarget.value, 'no-of-seat')}
                            placeholder="Enter No of Seats"
                            type="number"
                            min={4}
                            required
                            fullWidth
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};