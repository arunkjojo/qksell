import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@common/types';
import { formatPrice } from '@utils/formatPrice';
import { useIsMobile } from '@hooks/useIsMobile';

interface ProductCardProps {
  product: Product;
  extraChild?: React.JSX.Element;
  isUser?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isUser = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Link
      to={isUser ? `/pm/${product?.id}` : `/p/${product?.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-400 flex flex-row overflow-hidden !pr-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-lg w-1/3">
        <div className="aspect-[5/3] w-full bg-gray-200 relative h-full">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className={`w-full h-full object-cover transform transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h5 className="font-medium text-[0.75rem] text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {product?.title?.replace(' , ', ', ')?.replace(', ', ',')?.replace(',', ', ')}
            </h5>
            <h6 className="font-medium text-gray-700 line-clamp-2 text-[0.7rem] local_lang">
              {product?.local_title?.replace(' , ', ', ')?.replace(', ', ',')?.replace(',', ', ')}
            </h6>
            <div className='flex justify-between w-full'>
            <div className="font-bold text-blue-600"> {formatPrice(product?.price)} </div>
              <div className="text-black text-sm mt-1 bg-yellow-300 rounded-md px-2">{product?.location?.name}</div>
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
  );
};

export default ProductCard;