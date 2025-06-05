import { useIsMobile } from '@hooks/useIsMobile';
import Button from '@ui/Button';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NewPostIcon = () => {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
        <div className="fixed bottom-0 right-0 z-50 h-14 w-full flex item-center justify-center shadow-lg bg-white rounded-md"> 
        <Button
            variant="secondary"
            icon={<ShoppingBag size={20} />}
            className="bg-green-400 hover:bg-green-900 text-white font-medium fixed bottom-[8px] left-1/2 transform -translate-x-1/2 z-8 block list-none m-0 p-0 text-center transition-[bottom] duration-500 [transition-timing-function:cubic-bezier(0,1,.5,1)] w-fit"
        >
            <Link to="/newpost">
                Sell Now
            </Link>
        </Button>
        </div>
        )
    }
    return null;
}