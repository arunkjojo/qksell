import React from 'react'; 
import { motion } from 'framer-motion';
import SelectedButton from '@ui/SelectedButton';
import { PageHeader } from './PageHeader';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setSubCategories } from '@store/formSlice';
import { LAND_PLOT_TYPE } from '@common/constants';
import { useGoToBack } from '@utils/useGoToBack';

export const LandPlotSubCategories: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
        <div className="max-w-7xl mx-auto">
            <>
          <PageHeader title="Choose Land/Plot Type" showBack={true} onBack={goToBack} />
                <motion.div
                className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                {LAND_PLOT_TYPE?.map((item) => {
                    const selected = subCategories && subCategories?.some((data) => data?.name === 'land-plot-type' && data.value === item?.name)
                    return (
                      <SelectedButton
                        key={item.id}
                        icon={item.icon}
                        children={item.name}
                        onClick={() => handleSelect(item?.name, 'land-plot-type')}
                        isSelected={selected || false}
                    />
                    );
                })}
                </motion.div>
            </>
      </div>
    </div>
  );
};