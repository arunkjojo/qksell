import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@components/home/ProductCard';
import { getUserId } from '@utils/auth';
import { fetchPostByUser } from '@common/api';
import { Product } from '@common/types';

export const ProfilePost: React.FC = () => {
    const navigate = useNavigate()
    const [userPosts, setUserPosts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const userId = getUserId();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 40;

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true);
            const response = await fetchPostByUser({
                userId: Number(userId),
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
            const newProducts = Object.values(response?.data[0]?.data);

            setUserPosts((prev) => {
                const existingIds = new Set(prev.map(p => p.id));
                const filteredNew = newProducts.filter(p => !existingIds.has(p.id));
                return [...prev, ...filteredNew];
            });

            setHasMore(response?.data[0]?.hasMore);
        };

        setHasMore(false);
        if (!userId || userId === '') navigate('/signin');
        else if (userId && userId !== '' && page && !loading) fetchProductsByCategory();
    }, [userId, page, navigate]);

    const loadMore = () => {
        if (!loading) setPage(prev => prev + 1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-8 pb-16">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
            </div>

            <InfiniteScroll
                dataLength={userPosts.length}
                next={() => loadMore()}
                hasMore={hasMore}
                loader={
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {userPosts.map((post) => (
                        <div key={post.id} className="bg-white overflow-hidden">
                            <div className="flex items-center p-1">
                                <ProductCard key={post?.id} product={post} isUser={true} />
                            </div>
                        </div>
                    ))}
                </div>
            
            </InfiniteScroll>
        </div>
    );
};