import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { Product } from '@common/types';
import ProductCard from '@components/home/ProductCard';
import { toCapitalize } from '@utils/toCapitalize';
import { getPostListByCategory } from '@common/api';


export const CategoryPost: React.FC = () => {
  const navigate = useNavigate();
  const { cname } = useParams<{ cname: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 40;

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const response = await getPostListByCategory({
        cname: cname || '',
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
      const paginatedArray = response.data[0] || [];
      const newProducts = paginatedArray.data;

      // Append new products to the existing list without duplicates
      setProducts((prev) => {
        const existingIds = new Set(prev.map(p => p.id));
        const filteredNew = newProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...filteredNew];
      });
      // Check if there are more products to load
      setHasMore(paginatedArray.hasMore);
    };

    setHasMore(false);
    setLoading(true);
    if (cname && cname !== '' && page) fetchProductsByCategory();
    else {
      setLoading(false);
      navigate('/');
    }
  }, [cname, page, navigate]);

  const loadMore = () => {
    setPage(prev => prev + 1);
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
        {cname && (
          <h1 className="text-2xl font-bold text-gray-900">
            {toCapitalize(cname?.replace('-', ' & ')?.toLowerCase())}
          </h1>
        )}
        <p className="text-gray-600 mt-2">
          Browse all listings in this category
        </p>
      </div>

      {/* <InfiniteScroll
        dataLength={products.length}
        next={() => loadMore()}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      > */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      {/* </InfiniteScroll> */}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
      {products.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};