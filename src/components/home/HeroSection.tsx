import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import Button from '@ui/Button';
import Input from '@ui/Input';

const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set('q', searchTerm);
    if (location) searchParams.set('location', location);

    navigate(`/search?${searchParams.toString()}`);
  };
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 
          opacity: 0.4
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fadeIn">
            Buy, Sell, and Connect <br className="hidden md:block" />
            <span className="text-yellow-300">In Your Local Community</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto animate-fadeIn animation-delay-200">
            The easiest way to buy and sell items locally. Find great deals or reach thousands of potential buyers.
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-lg animate-slideUp animation-delay-400">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="What are you looking for?"
                  icon={<Search size={18} />}
                  fullWidth
                  className="h-12 bg-gray-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Location"
                  icon={<MapPin size={18} />}
                  fullWidth
                  className="h-12 bg-gray-50"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                variant="primary" 
                size="lg"
                className="min-w-24"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          
          <div className="mt-10 text-sm text-gray-200 animate-fadeIn animation-delay-600">
            <p>Popular: <span className="font-medium">Houses, Lands, Plots, Cars, Bikes, Vehicles</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;