import React from 'react';
import { motion } from 'framer-motion';
import SelectedButton from '@ui/SelectedButton';
import Input from '@ui/Input';
import { PageHeader } from './PageHeader';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setSubCategories } from '@store/formSlice';
import { HOUSE_TYPE, HOUSE_BD_NUM } from '@common/constants';
import { useGoToBack } from '@utils/useGoToBack';

export const HouseApartmentsSubCategories: React.FC = () => {
    const dispatch = useAppDispatch();
    const { subCategories } = useAppSelector((state) => state.form);
    const goToBack = useGoToBack();

    const handleSelect = (value: string, name: string) => {
        const data = {
            name,
            value
        }
        dispatch(setSubCategories(data));
    };

    const custructionYear = subCategories?.find((data) => data?.name === 'custr-year')?.value;

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-20">
            <div className="max-w-7xl mx-auto">
                <>
                    <PageHeader title="Choose House Type" showBack={true} onBack={goToBack} />
                    <motion.div
                        className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {HOUSE_TYPE?.map((item) => {
                            const selected = subCategories && subCategories?.some((data) => data?.name === 'house-type' && data.value === item?.name)
                            return (
                                <SelectedButton
                                    key={item.id}
                                    icon={item.icon}
                                    children={item.name}
                                    onClick={() => handleSelect(item?.name, 'house-type')}
                                    isSelected={selected || false}
                                />
                            );
                        })}
                    </motion.div>
                </>
                <>
                    <PageHeader title="Number of Bedrooms" showBack={false} extraClass="mt-6" />
                    <motion.div
                        className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {HOUSE_BD_NUM?.map((item) => {
                            const selected = subCategories && subCategories?.some((data) => data?.name === 'bd-room' && data.value === item?.name)
                            return (
                                <SelectedButton
                                    key={item.id}
                                    icon={item.icon}
                                    children={item.name}
                                    onClick={() => handleSelect(item?.name, 'bd-room')}
                                    isSelected={selected || false}
                                />
                            );
                        })}
                    </motion.div>
                </>
                <>
                    {/* <PageHeader title="Construction Year" showBack={false} extraClass="mt-6" /> */}
                    <motion.div
                        className="grid gap-4 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Input
                            id="custructionYear"
                            label="Custruction Year"
                            value={custructionYear || ''}
                            onChange={(e) => handleSelect(e.currentTarget.value, 'custr-year')}
                            onInput={(e) => handleSelect(e.currentTarget.value, 'custr-year')}
                            placeholder="Enter Custruction Year"
                            type="year"
                            min={1900}
                            max={new Date().getFullYear()}
                            minLength={4}
                            maxLength={4}
                            required
                            fullWidth
                        />
                    </motion.div>
                </>
            </div>
        </div>
    );
};