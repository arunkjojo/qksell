import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, MapPin, Clock } from 'lucide-react';
import { fetchStates, fetchDistricts } from '@api/index';
import { District } from '@common/types';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setAllDistricts, setProductList } from '@store/appSlice';
import { fetchLatestPost } from '@api/index';
import { setCookie } from '@utils/setCookie';
import { removeCookie } from '@utils/removeCookie';

interface CitySearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCitySelect: (city: District) => void;
    currentCity?: string;
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
    isOpen,
    onClose,
    onCitySelect
}) => {
    const dispatch = useAppDispatch();
    const { categories, allDistricts } = useAppSelector((state) => state.app);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState<District[]>([]);
    const [recentCities, setRecentCities] = useState<District[]>([]);
    const [popularCities] = useState<District[]>([
        { id: 61, name: 'Ernakulam', nativeName: 'എറണാകുളം' },
        { id: 26, name: 'Thiruvananthapuram', nativeName: 'തിരുവനന്തപുരം' },
        { id: 4, name: 'Bangalore', nativeName: 'ಬೆಂಗಳೂರು' },
        { id: 78, name: 'Chennai', nativeName: 'சென்னை' },
        { id: 5, name: 'Mysore', nativeName: 'ಮೈಸೂರು' }
      ]);
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Load states and districts on component mount
    useEffect(() => {
        const loadLocationData = async () => {
            try {
                setLoading(true);
                const statesResponse = await fetchStates();
                // Load districts for all states
                const allDistrictsData: District[] = [];
                for (const state of statesResponse.data) {
                    const districtsResponse = await fetchDistricts(state.id.toString());
                    allDistrictsData.push(...districtsResponse.data);
                }
                dispatch(setAllDistricts(allDistrictsData));
                setFilteredCities(allDistrictsData.slice(0, 20)); // Show first 20 initially
            } catch (error) {
                console.error('Error loading location data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && allDistricts.length === 0 && !loading) {
            loadLocationData();
        }
    }, [isOpen, allDistricts.length, dispatch]);

    // Load recent cities from localStorage
    useEffect(() => {
        const savedRecentCities = localStorage.getItem('recentCities');
        if (savedRecentCities) {
            setRecentCities(JSON.parse(savedRecentCities));
        }
    }, []);

    // Filter cities based on search term
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredCities(allDistricts.slice(0, 20));
            return;
        }

        const filtered = allDistricts.filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.nativeName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCities(filtered.slice(0, 50)); // Limit to 50 results
    }, [searchTerm, allDistricts]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleCitySelect = async (city: District) => {
        // Save to recent cities
        const updatedRecentCities = [
            city,
            ...recentCities.filter(c => c.id !== city.id)
        ].slice(0, 5); // Keep only 5 recent cities

        setRecentCities(updatedRecentCities);
        localStorage.setItem('recentCities', JSON.stringify(updatedRecentCities));

        removeCookie('LocationId');
        removeCookie('LocationName');
        // Save to cookies
        setCookie('LocationId', String(city.id), 365);
        setCookie('LocationName', String(city.name), 365);

        // Fetch posts for selected location
        try {
            setLoading(true);
            const allPosts = [];
            for (const cat of categories) {
                try {
                    const post = await fetchLatestPost(Number(cat?.id), city.id);
                    if (post?.data) {
                        allPosts.push(...post.data);
                    }
                } catch (error) {
                    console.error(`Failed to fetch posts for category ${cat.id}:`, error);
                }
            }
            dispatch(setProductList(allPosts));
        } catch (error) {
            console.error('Error fetching posts for location:', error);
        } finally {
            setLoading(false);
        }

        onCitySelect(city);
        onClose();
    };

    const handleClose = () => {
        setSearchTerm('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-white"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Close search"
                        >
                            <X size={24} className="text-gray-600" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-900">Select Location</h1>
                        <div className="w-10" /> {/* Spacer for centering */}
                    </div>

                    {/* Search Input */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search city, area or locality"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        {loading && (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        {!loading && (
                            <>
                                {/* Recent Locations */}
                                {recentCities.length > 0 && !searchTerm && (
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                            Recent Locations
                                        </h3>
                                        {recentCities.map((city) => (
                                            <button
                                                key={`recent-${city.id}`}
                                                onClick={() => handleCitySelect(city)}
                                                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <Clock size={18} className="text-gray-400 mr-3" />
                                                <div className="text-left">
                                                    <div className="font-medium text-gray-900">{city.name}</div>
                                                    {city.nativeName && (
                                                        <div className="text-sm text-gray-500 local_lang">{city.nativeName}</div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Popular Locations */}
                                {!searchTerm && (
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                            Popular Locations
                                        </h3>
                                        {popularCities.map((city) => (
                                            <button
                                                key={`popular-${city.id}`}
                                                onClick={() => handleCitySelect(city)}
                                                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <MapPin size={18} className="text-gray-400 mr-3" />
                                                <div className="text-left">
                                                    <div className="font-medium text-gray-900">{city.name}</div>
                                                    {city.nativeName && (
                                                        <div className="text-sm text-gray-500 local_lang">{city.nativeName}</div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Search Results */}
                                {searchTerm && (
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                            Search Results ({filteredCities.length})
                                        </h3>
                                        {filteredCities.length > 0 ? (
                                            filteredCities.map((city) => (
                                                <button
                                                    key={`search-${city.id}`}
                                                    onClick={() => handleCitySelect(city)}
                                                    className="flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <MapPin size={18} className="text-gray-400 mr-3" />
                                                    <div className="text-left">
                                                        <div className="font-medium text-gray-900">{city.name}</div>
                                                        {city.nativeName && (
                                                            <div className="text-sm text-gray-500 local_lang">{city.nativeName}</div>
                                                        )}
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                No cities found matching "{searchTerm}"
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};