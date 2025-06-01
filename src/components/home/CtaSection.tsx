import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@ui/Button';

const CtaSection: React.FC = () => {
  const navigate = useNavigate();
  const whatsAppMessage = (message: string = "Hello, I'm interested in posting an advertisement on qksell.in.\nAnd learn more details for posting on it.") => {
    const phoneNumber = '919995468633';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to start selling?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-lg">
                Join thousands of sellers who've successfully sold items on our marketplace. It's free, fast, and easy to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="!text-blue-800 !bg-white hover:bg-gray-100"
                  onClick={() => navigate('/newpost')}
                >
                  Create Listing
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="!text-balck !border-white hover:bg-blue-700"
                  icon={<ArrowRight size={18} />}
                  onClick={() => whatsAppMessage()}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div 
              className="flex-1 bg-cover bg-center hidden md:block"
              style={{ 
                backgroundImage: 'url(https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' 
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;