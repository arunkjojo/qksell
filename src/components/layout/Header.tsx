import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, MessageSquare, Menu, X, ShoppingBag, LogIn } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import Button from '@ui/Button';
import Input from '@ui/Input';
import { getCookie } from '@utils/getCookie';
import { base64Decode } from '@utils/base64Decode';
import { useIsMobile } from '@hooks/useIsMobile';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes

  const locationName = getCookie('LocationName');
  useEffect(() => {
    const authToken = parseInt(base64Decode(base64Decode(getCookie('userToken') ?? '')), 10);
    if (authToken && !isNaN(authToken)) {
      setIsLoggedIn(true)
    }
  }, []);

  useEffect(() => {
    if (locationName) {
      setSearchTerm(locationName);
    }
  }, [locationName]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toLogin = () => {
    navigate('/signin');
  };

  const toNewPost = () => {
    navigate('/newpost');
  };

  const whatsAppMessage = (message:string = "Hello, I'm interested in posting an advertisement on qksell.in.\nCould you please help me through the process?") => {
    const phoneNumber = '919995468633';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set('q', searchTerm);
    setTimeout(() => setSearchTerm(''), 300);
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-blue-600">QK</span>
              <span className="text-teal-600">Sell</span>
            </span>
          </Link>

          <div className="flex flex-1 max-w-xl mx-2">
            <div className="relative w-full">
              <Input
                placeholder="Search for posts, categories, locations..."
                icon={<Search size={18} />}
                fullWidth
                className="pr-4 py-2 bg-gray-50 border-0 focus:bg-white focus:ring-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/favorites" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Heart size={22} />
            </Link>
            <Button
              onClick={() => whatsAppMessage()}
              variant="link"
              className='text-gray-700 hover:text-blue-600 transition-colors'
            >
              <BsWhatsapp size={22} />
            </Button>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <User size={22} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={toLogin} 
                  variant="outline"
                >
                  Sign In
                </Button>
              </div>
            )}
            {!isMobile && <Button 
              variant="secondary"
              onClick={() => toNewPost()} 
              icon={<ShoppingBag size={18} />}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium"
            >
              <Link to="/newpost">
                Sell Now
              </Link>
            </Button>}
          </div>

          {/* Mobile menu button and sell button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={() => whatsAppMessage()}
              variant="link"
              className='text-gray-700 hover:text-blue-600 transition-colors'
            >
              <BsWhatsapp size={22} color='green' />
            </Button>
            <button 
              onClick={toggleMenu} 
              className="text-gray-700"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2 animate-slideDown">
          <nav className="flex flex-col space-y-3 py-2">
            <Link to="/" className="py-2 px-3 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/favorites" className="py-2 px-3 hover:bg-gray-50 rounded-md flex items-center gap-2" onClick={toggleMenu}>
              <Heart size={18} /> Favorites
            </Link>
            <Link to="/messages" className="py-2 px-3 hover:bg-gray-50 rounded-md flex items-center gap-2" onClick={toggleMenu}>
              <MessageSquare size={18} /> Messages
            </Link>
            <Link to="/profile" className="py-2 px-3 hover:bg-gray-50 rounded-md flex items-center gap-2" onClick={toggleMenu}>
              <User size={18} /> My Account
            </Link>
            <div className="pt-2 border-t border-gray-100">
              {isLoggedIn ? (
                <Button 
                  onClick={() => {
                    toggleMenu();
                  }} 
                  variant="outline"
                  fullWidth
                >
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => {
                      toLogin();
                      toggleMenu();
                    }} 
                    variant="outline"
                    icon={<LogIn size={18} />}
                    fullWidth
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;