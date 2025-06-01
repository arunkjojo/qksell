import React from 'react';
import { Link } from 'react-router-dom';
import RenderIcon from '@ui/RenderIcon';
import { toSlug } from '@utils/toSlug';
import { useAppSelector } from '@hooks/useAppSelector';

const CategorySection: React.FC = () => {
  const { categories } = useAppSelector((state) => state.app);
  return (
    <section className="py-3 bg-gray-50">
      <div className="container mx-auto px-4">        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {categories?.map((category) => (
            <Link 
              key={category?.id}
              to={`/category/${toSlug(category?.name)}`}
              className="flex flex-col items-center justify-center p-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                {RenderIcon(category?.icon)}
              </div>
              <h4 className="font-medium text-gray-900">{category?.name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;