import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { fetchDistricts } from '@api/index';
import SelectedButton from '@ui/SelectedButton';
import { PageHeader } from './PageHeader';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setActiveScreen } from '@store/appSlice';
import { setDistrict } from '@store/formSlice';
import type { District } from '@common/types';
import { APP_PATH } from '@common/constants';
import { useGoToBack } from '@utils/useGoToBack';
import { useNavigate } from 'react-router-dom';

export const DistrictSelection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state, district: selectedDistrict } = useAppSelector((state) => state.form);
  const goToBack = useGoToBack();

  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    const loadDistricts = async () => {
      if (!state || !state?.id) {
        navigate('/newpost/state');
      };
      const response = await fetchDistricts(`${state?.id}`);
      setDistricts(response.data);
    };
    if (state) {
      loadDistricts();
    } else {
      navigate('/newpost/state');
    }
  }, [navigate, state]);

  const handleDistrictSelect = (district: District) => {
    dispatch(setDistrict(district));
    dispatch(setActiveScreen(APP_PATH.CATEGORY));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <PageHeader title='Choose Your District' showBack={true} onBack={goToBack} />
        
        <motion.div
          className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {districts.map((district: District) => (
            <SelectedButton
              key={district.id}
              icon={district.name[0]}
              children={district.name}
              onClick={() => handleDistrictSelect(district)}
              isSelected={selectedDistrict?.id === district.id}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};