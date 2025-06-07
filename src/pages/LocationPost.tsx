import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Product } from '@common/types';
import ProductCard from '@components/home/ProductCard';
import { toCapitalize } from '@utils/toCapitalize';
import { getPostListByLocation } from '@common/api';
import { setCookie } from '@utils/setCookie';
import Button from '@common/components/ui/Button';
import { BsWhatsapp } from 'react-icons/bs';
import { joinWhatsappGroup } from '@utils/joinWhatsAppGroup';

export const LocationPost: React.FC = () => {
  const navigate = useNavigate();
  const { location, lname } = useParams<{ location: string; lname: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 40;

  useEffect(() => {
    const fetchProductsByLocation = async () => {
      setLoading(true);
      const response = await getPostListByLocation({
        location: location || '',
        page: page,
        limit: ITEMS_PER_PAGE
      });
      if (response) {
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
      const newProducts = Object.values(response?.data[0]?.data); // Convert object to array

      setProducts((prev) => {
        const existingIds = new Set(prev.map(p => p.id));
        const filteredNew = newProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...filteredNew];
      });

      if (newProducts[0]?.location?.link) setCookie('whatsappLink', newProducts[0]?.location?.link);
      setHasMore(response?.data[0]?.hasMore);
    };

    setHasMore(false);
    if (!location || location === '') navigate('/');
    else if (location && location !== '' && page && !loading) fetchProductsByLocation();
  }, [location, page, navigate]);

  const loadMore = () => {
    if (!loading) setPage(prev => prev + 1);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        {lname && (
          <>
            <h1 className="text-md font-bold text-gray-900">
              Find all new offers in {toCapitalize(lname?.replace('-', ' ')?.toLowerCase())}
            </h1>
            <p>
              Latest direct sell listing from your nearby locations
            </p>
            <Button
              variant="primary"
              icon={<BsWhatsapp size={20} />}
              className="bg-green-900 hover:bg-green-600 text-white font-medium"
              onClick={joinWhatsappGroup}
            >
              Join Whatsapp
            </Button>
          </>
        )}
      </div>

      <InfiniteScroll
        dataLength={products.length}
        next={() => loadMore()}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </InfiniteScroll>

      {/* {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )} */}
      {products.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">No products found in this location.</p>
        </div>
      )}
    </div>
  );
};