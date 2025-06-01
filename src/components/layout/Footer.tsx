import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, MessageCircleMore, Mail, MessageSquare, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const whatsAppMessage = (message: string = "Hello, I'm interested in posting an advertisement on qksell.in.\nCould you please help me through the process?") => {
    const phoneNumber = '919995468633';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap flex-col sm:flex-row gap-5">
          <div className='flex-1'>
            <h3 className="text-xl font-semibold text-white mb-4">QK Sell</h3>
            <p className="mb-4 text-sm leading-relaxed">
              QkSell.in is free marketplace advertisement website. The trusted marketplace for buying and selling products and services in your local area. You can buy and sell anything you want. Free classifieds to quickly sell your house, land, car, bike, or any vehicle! List your property or vehicle on Qk Sell and connect with buyers today. No listing fees, just fast sales.
            </p>
            <div className="flex space-x-4">
              <a onClick={() => whatsAppMessage()} className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a onClick={() => whatsAppMessage()} className="text-gray-400 hover:text-white transition-colors">
                <MessageCircleMore size={20} />
              </a>
            </div>
          </div>
          
          {/* <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/land-plot" className="hover:text-white transition-colors">Land & Plots</Link>
              </li>
              <li>
                <Link to="/category/house-apartments " className="hover:text-white transition-colors">Houses</Link>
              </li>
              <li>
                <Link to="/category/cars" className="hover:text-white transition-colors">Cars</Link>
              </li>
              <li>
                <Link to="/category/bikes" className="hover:text-white transition-colors">Bikes</Link>
              </li>
              <li>
                <Link to="/category/vehicles" className="hover:text-white transition-colors">Vehicles</Link>
              </li>
            </ul>
          </div> */}
          
          <div className='flex-1'>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start" onClick={() => whatsAppMessage()}>
                <MapPin size={18} className="mr-2 text-gray-400 mt-0.5" />
                <span>North Paravoor, Ernakulam, Kerala</span>
              </li>
              <li className="flex items-center" onClick={() => whatsAppMessage()}>
                <MessageSquare size={18} className="mr-2 text-gray-400" />
                <span>+919995468633</span>
              </li>
              <li className="flex items-center" onClick={() => whatsAppMessage()}>
                <Mail size={18} className="mr-2 text-gray-400" />
                <span>support@qksell.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} QK Sell. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4 text-sm">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;