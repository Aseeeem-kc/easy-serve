import React from "react";
import { Check, Zap, Building2, ArrowRight } from "lucide-react";

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "$29",
      period: "/mo",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 100 conversations/month",
        "Basic analytics dashboard",
        "Email support",
        "2 AI agents",
        "Standard response time"
      ],
      highlighted: false,
      cta: "Get Started",
      gradient: "from-gray-100 to-gray-50"
    },
    {
      name: "Pro",
      price: "$99",
      period: "/mo",
      description: "Best for growing businesses",
      features: [
        "Unlimited conversations",
        "Advanced analytics & reports",
        "24/7 priority chat support",
        "10 AI agents",
        "Custom integrations",
        "API access"
      ],
      highlighted: true,
      badge: "Most Popular",
      cta: "Get Started",
      gradient: "from-gray-900 to-gray-700"
    },
    {
      name: "Enterprise",
      icon: Building2,
      price: "Custom",
      period: "",
      description: "For large-scale operations",
      features: [
        "Unlimited everything",
        "Custom AI agent training",
        "Dedicated account manager",
        "SLA guarantee",
        "Advanced security features",
        "White-label options"
      ],
      highlighted: false,
      cta: "Contact Sales",
      gradient: "from-gray-100 to-gray-50"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-6 shadow-lg">
           
            <span className="text-sm font-semibold">Flexible Pricing</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent
            <span className="block mt-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your business. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-300 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-2xl scale-105 border-2 border-gray-800' 
                    : 'bg-white border-2 border-gray-200 hover:border-gray-400 shadow-lg hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-gray-600 to-gray-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  plan.highlighted 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : `bg-gradient-to-br ${plan.gradient}`
                }`}>
                  {/* <Icon className={`w-6 h-6 ${plan.highlighted ? 'text-white' : 'text-gray-700'}`} /> */}
                </div>

                {/* Plan name */}
                <h3 className={`font-bold text-2xl mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-gray-200' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.highlighted ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-gray-700'}`} />
                      </div>
                      <span className={`ml-3 ${plan.highlighted ? 'text-gray-100' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center ${
                  plan.highlighted 
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg' 
                    : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg'
                }`}>
                  {plan.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom info */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            All plans include 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-gray-700" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-gray-700" />
              24/7 support
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-gray-700" />
              Secure payments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;