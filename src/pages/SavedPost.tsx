import { useEffect, useState } from 'react';
import ProductCard from '@components/home/ProductCard';
import { Product } from '@common/types';
import ErrorAlert from '@ui/ErrorAlert';
import { fetchPostById } from '@api/index';

export const SavedPost = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fav = localStorage.getItem('favItems') || '[]';
        let favoritesItems: number[] = [];
        try {
            favoritesItems = JSON.parse(fav);
        } catch {
            favoritesItems = [];
        }
        if (favoritesItems.length === 0) {
            setProducts([]);
            setLoading(false);
            return;
        }
        const fetchAll = async () => {
            setLoading(true);
            const prods: Product[] = [];
            for (const id of favoritesItems) {
                const res = await fetchPostById(Number(id));
                if (res?.data && res.data[0]) prods.push(res.data[0]);
            }
            setProducts(prods);
            setLoading(false);
        };
        fetchAll();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (products.length === 0) return <ErrorAlert message='No saved posts found.' />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
