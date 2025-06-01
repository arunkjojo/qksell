import React, { useState, useEffect } from 'react';
import { testimonials } from '@common/data/testimonials';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="mt-2 text-blue-100 max-w-2xl mx-auto">
            Thousands of users have had great experiences using our QkSell
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`
                  transition-opacity duration-500 absolute w-full
                  ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                `}
              >
                <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
                  <svg className="w-12 h-12 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-2.209 0-4 1.791-4 4v10c0 2.209 1.791 4 4 4h10c2.209 0 4-1.791 4-4v-10c0-2.209-1.791-4-4-4h-10zM9.477 18.890c0-1.435 1.165-2.598 2.598-2.598s2.598 1.165 2.598 2.598-1.165 2.598-2.598 2.598-2.598-1.165-2.598-2.598zM17.333 18.890c0-1.435 1.165-2.598 2.598-2.598s2.598 1.165 2.598 2.598-1.165 2.598-2.598 2.598-2.598-1.165-2.598-2.598zM10 13.110c0-1.434 1.164-2.598 2.599-2.598s2.599 1.164 2.599 2.598c0 1.435-1.164 2.599-2.599 2.599s-2.599-1.164-2.599-2.599zM17.333 13.110c0-1.434 1.164-2.598 2.599-2.598s2.599 1.164 2.599 2.598c0 1.435-1.164 2.599-2.599 2.599s-2.599-1.164-2.599-2.599z" />
                  </svg>
                  <p className="text-lg leading-relaxed mb-6">{testimonial.content}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* This div takes up space to prevent layout shift */}
            <div className="opacity-0 pointer-events-none">
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg leading-relaxed mb-6">
                  {testimonials[0].content}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Placeholder</h4>
                    <p className="text-sm">Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === activeIndex ? 'bg-white' : 'bg-white bg-opacity-30'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;