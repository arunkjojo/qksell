import { motion } from 'framer-motion';
import React from 'react';
import SelectedButton from '@ui/SelectedButton';
import { PageHeader } from './PageHeader';
import { APP_PATH, LANGUAGES } from '@common/constants';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setActiveScreen } from '@store/appSlice';
import { setLanguage } from '@store/formSlice';
import { Language } from '@common/types';

export const LanguageSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { language: selectedLanguage } = useAppSelector((state) => state.form);

  const handleLanguageSelect = (language: typeof LANGUAGES[0]) => {
    dispatch(setLanguage(language));

    dispatch(setActiveScreen(APP_PATH.STATE));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Choose Your Language" showBack={false} />
        
        <motion.div
          className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {LANGUAGES.map((language: Language) => (
            <SelectedButton
              key={language.id}
              icon={language.icon}
              children={language.name}
              onClick={() => handleLanguageSelect(language)}
              isSelected={selectedLanguage?.id === language.id}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};