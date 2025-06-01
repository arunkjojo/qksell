import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { fetchStates } from '@api/index';
import SelectedButton from '@common/components/ui/SelectedButton';
import { PageHeader } from './PageHeader';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setActiveScreen } from '@store/appSlice';
import { setState } from '@store/formSlice';
import type { State } from '@common/types';
import { APP_PATH } from '@common/constants';
import { useGoToBack } from '@utils/useGoToBack';

export const StateSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedState = useAppSelector((state) => state.form.state);
  const [states, setStates] = useState<State[]>([]);
  const goToBack = useGoToBack();

  const loadStates = async () => {
    const response = await fetchStates();
    setStates(response.data);
  };
  
  useEffect(() => {
    loadStates();
  }, []);
  

  const handleStateSelect = (state: State) => {
    dispatch(setState(state));

    dispatch(setActiveScreen(APP_PATH.DISTRICT));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Choose Your State" showBack={true} onBack={goToBack} />
        
        <motion.div
          className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {states?.map((state: State) => (
            <SelectedButton
              key={state.id}
              icon={state.name[0]}
              children={state.name}
              onClick={() => handleStateSelect(state)}
              isSelected={selectedState?.id === state.id}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};