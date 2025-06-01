import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { LandPlotSubCategories } from './LandPlotSubCategories';
import { HouseApartmentsSubCategories } from './HouseApartmentsSubCategories';
import { VehiclesSubCategories } from './VehicleSubCategories';
import { CarSubCategories } from './CarSubCategories';
import { BikeSubCategories } from './BikeSubCategories';

export const SubCategorySelection: React.FC = () => {
  const { category } = useAppSelector((state) => state.form);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) {
      return;
    }
    setLoading(false);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading sub categories...</div>
      </div>
    );
  }
  
  const subCategoriesSelections = () => {
    switch (category?.name) {
      case 'Land - Plots':
        return <LandPlotSubCategories />;
      case 'House - Apartments':
        return <HouseApartmentsSubCategories />;
      case 'Car':
        return <CarSubCategories />;
      case 'Bike':
        return <BikeSubCategories />;
      case 'Vehicle':
        return <VehiclesSubCategories />;
      default:
        return null;
    }
  }

  return subCategoriesSelections();
};