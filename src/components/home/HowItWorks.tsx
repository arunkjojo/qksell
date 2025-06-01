import React from 'react';
import { Search, MessageSquare, CheckCircle, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps: {
  icon: JSX.Element;
  title: string;
  description: string;
}[] = [
  {
    icon: <Upload size={40} className="text-blue-600" />,
    title: 'List Your Item',
    description: 'Create a free account and list your item with detailed information and high-quality photos.'
  },
  {
    icon: <Search size={40} className="text-teal-600" />,
    title: 'Connect With Buyers',
    description: 'Respond to inquiries and connect with potential buyers who are interested in your item.'
  },
  {
    icon: <MessageSquare size={40} className="text-orange-600" />,
    title: 'Communicate Safely',
    description: 'Use our secure messaging system to discuss details and arrange meetings with buyers.'
  },
  {
    icon: <CheckCircle size={40} className="text-green-600" />,
    title: 'Complete The Sale',
    description: 'Meet the buyer, complete the transaction, and enjoy your successful sale.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Selling on our QkSell is easy and secure. Follow these simple steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-50 rounded-full">
                {step.icon}
              </div>
              <div className="mb-3 inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                Step {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/newpost" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Learn more about our selling process
            <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;