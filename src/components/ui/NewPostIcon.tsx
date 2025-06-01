import { useIsMobile } from '@hooks/useIsMobile';
import Button from '@ui/Button';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NewPostIcon = () => {
    const isMobile = useIsMobile();
    if (isMobile) {
        return <Button
            variant="secondary"
            icon={<ShoppingBag size={20} />}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium fixed bottom-[15px] left-1/2 transform -translate-x-1/2 z-8 block list-none m-0 p-0 text-center transition-[bottom] duration-500 [transition-timing-function:cubic-bezier(0,1,.5,1)] w-fit"
        >
            <Link to="/newpost">
                Sell Now
            </Link>
        </Button>
    }
    return null;
}