import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    { 
      name: "Aashna Neupane", 
      role: "CEO",
      company: "Zenivo",
      text: "EasyServe cut our support response time in half! Our customers are happier than ever, and our team can focus on complex issues instead of repetitive questions.",
      rating: 5,
      avatar: "AN"
    },
    { 
      name: "Nabin Pyakurel", 
      role: "CFO",
      company: "Vedic Hub",
      text: "The AI is smarter than I expected. It handles context beautifully and rarely needs human intervention. The analytics dashboard is a game-changer for our team.",
      rating: 5,
      avatar: "NP"
    },
    { 
      name: "Prajen Shrestha", 
      role: "Customer Support Lead",
      company: "Food-mandu",
      text: "Integration was seamless and fast. We were up and running in less than a day. The multi-agent framework adapts perfectly to our diverse customer base.",
      rating: 5,
      avatar: "PS"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-6 shadow-lg">
            
            <span className="text-sm font-semibold">Trusted by Teams</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our
            <span className="block mt-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses transforming their customer support with EasyServe.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">10k+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">94%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">60%</div>
            <div className="text-gray-600">Cost Reduction</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-gray-400 transition-all duration-300 hover:-translate-y-2 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-gray-900" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gray-900 text-gray-900" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                  {testimonial.avatar}
                </div>
                
                {/* Name and role */}
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;