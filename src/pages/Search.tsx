import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppSelector } from '@hooks/useAppSelector';
import { Product } from '@common/types';
import { formatPrice } from '@utils/formatPrice';
import ErrorAlert from '@ui/ErrorAlert';
import { useIsMobile } from '@hooks/useIsMobile';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products } = useAppSelector((state) => state.app);
  const isMobile = useIsMobile()
  const searchTerm = searchParams.get('q') || null;
  const location = searchParams.get('location') || null;
  const searchResults:Product[] = products.filter(product => {
    const matchesSearch = searchTerm ? (
      product?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      product?.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      product?.category?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      product?.location?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    ) : true;

    const matchesLocation = location ?
      product?.location?.name?.toLowerCase().includes(location?.toLowerCase()) : true;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Listings
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Search Results
          {searchTerm && <span className="text-gray-600"> for "{searchTerm}"</span>}
          {location && <span className="text-gray-600"> in {location}</span>}
        </h1>
        <p className="text-gray-600 mt-2">
          Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link
              to={`/p/${product?.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-400 flex flex-row overflow-hidden !pr-1"
            >
              {/* Left Side - Image */}
              <div className="relative rounded-lg w-1/3">
                <div className="aspect-[5/3] w-full bg-gray-200 relative h-full">
                  <img
                    src={product?.images[0]}
                    alt={product?.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 scale-100"
                  />
                </div>
              </div>
        
              {/* Right Side - Content */}
              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product?.title?.replace(' , ', ', ')?.replace(', ', ',')?.replace(',', ', ')}
                    </h4>
                    <div className='flex justify-between w-full'>
                    <div className="font-bold text-blue-600"> {formatPrice(product?.price)} </div>
                      <div className="text-gray-500 text-sm mt-1 bg-yellow-300 rounded-md px-2">{product?.location?.name}</div>
                    </div>
                  </div>
                  {!isMobile && (
                    <p className="text-gray-600 text-xs mt-2 line-clamp-3">
                      {product?.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ErrorAlert message="No results found" />
      )}
    </div>
  );
};
