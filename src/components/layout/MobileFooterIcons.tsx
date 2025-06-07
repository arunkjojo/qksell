import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@hooks/useIsMobile';
import Button from '@ui/Button';
import { joinWhatsappGroup } from '@utils/joinWhatsAppGroup';

export const MobileFooterIcons = () => {
    const isMobile = useIsMobile();
    const { pathname } = useLocation();
    const isLocationPath = pathname?.includes('/l');
    
    if (isMobile) {
        const isActiveLinkClass = "w-12 h-12 bg-[rgb(27,135,62)] rounded-full flex items-center justify-center text-white font-bold text-lg mr-3";
        return (
            <div className="fixed bottom-0 right-0 z-50 h-14 w-full flex items-center justify-around shadow-lg bg-white rounded-md"> 
                {isLocationPath ? (
                    <Button
                        variant="primary"
                        icon={<BsWhatsapp size={20} />}
                        className="bg-green-900 hover:bg-green-600 text-white font-medium"
                        onClick={joinWhatsappGroup}
                    >
                        Join Whatsapp
                    </Button>
                ) : (
                    <>
                    <Link to="/" className={`${pathname === '/' && isActiveLinkClass}`}>
                        <Home size={20} />
                    </Link>
                    <Link to="/favorites" className={`${pathname === '/favorites' && isActiveLinkClass}`}>
                        <Heart size={20} />
                    </Link>
                    <Link to="/newpost" className={`${pathname === '/newpost' && isActiveLinkClass}`}>
                        <ShoppingBag size={20} />
                    </Link>
                    <Link to="/profile" className={`${pathname === '/profile' && isActiveLinkClass}`}>
                        <User size={20} />
                    </Link>
                    </>
                )}
            </div>
        )
    }
    return null;
}