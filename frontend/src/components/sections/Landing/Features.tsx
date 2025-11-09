import React from "react";
import { Bot, LineChart, MessagesSquare, Shield, ArrowRight } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Agents",
      description: "Multiple AI agents handling different types of queries simultaneously.",
      gradient: "from-gray-900 to-gray-700",
      stats: "10+ Agents"
    },
    {
      icon: MessagesSquare,
      title: "Multi-channel Support",
      description: "Connect with your customers across chat, email, and social platforms.",
      gradient: "from-gray-800 to-gray-600",
      stats: "5+ Channels"
    },
    {
      icon: LineChart,
      title: "Analytics Dashboard",
      description: "Real-time insights into customer interactions and agent performance.",
      gradient: "from-gray-700 to-gray-500",
      stats: "Real-time Data"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption and compliance with industry standards.",
      gradient: "from-gray-600 to-gray-400",
      stats: "Bank-level"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-6 shadow-lg">
            
            <span className="text-sm font-semibold">Feature-Rich Platform</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="block mt-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Modern Support Teams
            </span>
          </h2>
          
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to automate and scale your customer support with cutting-edge AI technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Stats badge */}
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                    {feature.stats}
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <div className="flex items-center text-gray-700 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more 
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Want to see all features in action?
          </p>
          <button className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center">
            Explore All Features
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;