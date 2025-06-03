import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Eye, Rocket } from 'lucide-react';
import Button from '../components/ui/Button';

interface UserPost {
    id: string;
    title: string;
    price: number;
    location: string;
    status: string;
    image?: string;
}

const Profile: React.FC = () => {
    const [userPosts, setUserPosts] = useState<UserPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get('/api/user/posts');
                setUserPosts(response.data);
            } catch (err) {
                setError('Failed to fetch posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
            </div>

            <div className="grid gap-6">
                {userPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                    >
                        <div className="flex items-center p-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 ml-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 truncate">
                                            {post.title}
                                        </h2>
                                        <div className="mt-1">
                                            <span className="font-bold text-blue-600">₹{post.price.toLocaleString()}</span>
                                        </div>
                                        <div className="mt-1 flex items-center">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                {post.location}
                                            </span>
                                            <span className="ml-2 text-sm text-gray-500">
                                                Status: {post.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={<Edit size={16} />}
                                    className="whitespace-nowrap"
                                >
                                    Edit Post
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={<Eye size={16} />}
                                    className="whitespace-nowrap"
                                >
                                    View Post
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={<Rocket size={16} />}
                                    className="whitespace-nowrap bg-green-600 hover:bg-green-700"
                                >
                                    Promote Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;