import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { fetchCategories } from '@api/index';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';

import { setActiveScreen } from '@store/appSlice';
import { setCategory } from '@store/formSlice';

import type { Category } from '@common/types';
import { APP_PATH } from '@common/constants';

import { useGoToBack } from '@utils/useGoToBack';

import SelectedButton from '@ui/SelectedButton';
import RenderIcon from '@ui/RenderIcon';
import { PageHeader } from './PageHeader';

export const CategorySelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.form.category);
  const goToBack = useGoToBack();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetchCategories();
      setCategories(response.data);
    };
    loadCategories();
  }, []);

  const handleCategorySelect = (category: Category) => {
    dispatch(setCategory(category));
    dispatch(setActiveScreen(APP_PATH.SUB_CATEGORY));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Choose Your Category" showBack={true} onBack={goToBack} />
        
        <motion.div
          className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category: Category) => {
            const icon = RenderIcon(category.icon || category.name[0])
            return (
              <SelectedButton
                key={category.id}
                icon={icon}
                children={category.name}
                onClick={() => handleCategorySelect(category)}
                isSelected={selectedCategory?.id === category.id}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};