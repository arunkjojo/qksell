import React, { useEffect } from 'react';
import CategorySection from '@components/home/CategorySection';
import FeaturedListings from '@components/home/FeaturedListings';
import HowItWorks from '@components/home/HowItWorks';
import Testimonials from '@components/home/Testimonials';
import CtaSection from '@components/home/CtaSection';
import { useAppDispatch } from '@common/hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { fetchCategories, fetchLatestPost } from '@api/index';
import { setCategoryList, setProductList } from '@store/appSlice';
import { useLoading } from '@hooks/useLoading';
import { getCookie } from '@common/utils/getCookie';
// import { categories } from '@common/data/categories';
// import { products } from '@common/data/products';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, setLoading } = useLoading();
  const { categories, products } = useAppSelector((state) => state.app);
  const locationId = parseInt(getCookie('LocationId') || '0', 10);
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const category = await fetchCategories();
      dispatch(setCategoryList(category?.data));
      setLoading(false);
    };

    const fetchAllLatestPosts = async () => {
      setLoading(true);
      const allPosts = [];
      let isLocation = false;
      if (locationId && locationId !== 0) {
        isLocation = true;
      }
      for (const cat of categories) {
        try {
          const post = await fetchLatestPost(Number(cat?.id), isLocation ? locationId : null);
          if (post?.data) {
            allPosts.push(...post.data);
          }
        } catch (error) {
          console.error(`Failed to fetch posts for category ${cat.id}:`, error);
        }
      }

      dispatch(setProductList(allPosts));
      setLoading(false);
    };
    if ((categories?.length > 0 && (!products || products?.length === 0)) && !isLoading) {
      fetchAllLatestPosts();
    }
    if ((!categories || categories?.length === 0) && !isLoading) {
      loadCategories();
    }
  }, [categories, dispatch, products, setLoading, isLoading, locationId]);
  return (
    <div>
      <CategorySection />
      <FeaturedListings />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </div>
  );
};