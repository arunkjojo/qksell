import React from 'react';
import { Link } from 'react-router-dom';
import { toCapitalize } from '@utils/toCapitalize';
import { useAppSelector } from '@hooks/useAppSelector';
import ProductCard from '@components/home/ProductCard';
import { toSlug } from '@utils/toSlug';

const FeaturedListings: React.FC = () => {
  const { categories, products } = useAppSelector((state) => state.app);

  return (
    <section className="p-4 container mx-auto bg-white">
      {categories?.map((category) => {
        const categoryProducts = products?.filter(product => product?.category === category?.name);
        if (categoryProducts.length === 0) return null;

        return (
          <div key={category?.id} className="mb-16 last:mb-0">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  {toCapitalize(category?.name?.replace('-', '&')?.toLowerCase())}
                </h4>
              </div>
              <Link
                to={`/c/${toSlug(category?.name)}`}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All
                <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {categoryProducts?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FeaturedListings;