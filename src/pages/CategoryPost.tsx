import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Product } from '@common/types';
import ProductCard from '@components/home/ProductCard';
import { toCapitalize } from '@utils/toCapitalize';

export const CategoryPost: React.FC = () => {
  const { cname } = useParams<{ cname: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/category/${cname}`, {
          params: {
            page,
            limit: ITEMS_PER_PAGE
          }
        });

        const { data } = response;
        const newProducts = data.products || [];

        setProducts(newProducts);
        setHasMore(data.hasMore || false);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        setHasMore(false);
      }
    };

    setProducts([]);
    setHasMore(true);
    setLoading(true);
    fetchProducts();
  }, [cname, page]);

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

      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
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

      {products.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};