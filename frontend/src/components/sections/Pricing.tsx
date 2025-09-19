import React from "react";

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Simple Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">Choose the plan that works best for your business.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition">
            <h3 className="font-semibold text-xl mb-4 text-gray-900">Starter</h3>
            <p className="text-4xl font-bold mb-4 text-gray-900">
              $29<span className="text-lg font-normal text-gray-600">/mo</span>
            </p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li>✓ Up to 100 conversations</li>
              <li>✓ Basic analytics</li>
              <li>✓ Email support</li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">
              Get Started
            </button>
          </div>

          {/* Pro */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-700 hover:shadow-xl transition">
            <h3 className="font-semibold text-xl mb-4 text-gray-900">Pro</h3>
            <p className="text-4xl font-bold mb-4 text-gray-900">
              $99<span className="text-lg font-normal text-gray-600">/mo</span>
            </p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li>✓ Unlimited conversations</li>
              <li>✓ Advanced analytics</li>
              <li>✓ 24/7 chat support</li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">
              Get Started
            </button>
          </div>

          {/* Enterprise */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition">
            <h3 className="font-semibold text-xl mb-4 text-gray-900">Enterprise</h3>
            <p className="text-4xl font-bold mb-4 text-gray-900">Custom</p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated manager</li>
              <li>✓ SLA support</li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
