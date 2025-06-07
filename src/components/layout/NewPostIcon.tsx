import { useIsMobile } from '@hooks/useIsMobile';
import Button from '@ui/Button';
import { ShoppingBag } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { joinWhatsappGroup } from '@utils/joinWhatsAppGroup';

export const NewPostIcon = () => {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
            <div className="fixed bottom-0 right-0 z-50 h-16 py-3 w-full flex item-center justify-around shadow-lg bg-white rounded-md"> 
                <Button
                    variant="secondary"
                    icon={<ShoppingBag size={20} />}
                    className="bg-green-400 hover:bg-green-900 text-white font-medium"
                >
                    <Link to="/newpost">
                        Sell Now
                    </Link>
                </Button>

                <Button
                    variant="primary"
                    icon={<BsWhatsapp size={20} />}
                    className="bg-green-900 hover:bg-green-600 text-white font-medium"
                    onClick={joinWhatsappGroup}
                >
                    Direct Sell
                </Button>
            </div>
        )
    }
    return null;
}