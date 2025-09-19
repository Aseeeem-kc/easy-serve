import React from "react";
import { Bot, LineChart, MessagesSquare, Shield } from "lucide-react";

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Powerful Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to automate and scale your customer support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <Bot className="w-10 h-10 text-gray-800 mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">AI Agents</h3>
            <p className="text-gray-600">
              Multiple AI agents handling different types of queries simultaneously.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <MessagesSquare className="w-10 h-10 text-gray-800 mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Multi-channel Support</h3>
            <p className="text-gray-600">
              Connect with your customers across chat, email, and social platforms.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <LineChart className="w-10 h-10 text-gray-800 mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Real-time insights into customer interactions and agent performance.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <Shield className="w-10 h-10 text-gray-800 mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Enterprise Security</h3>
            <p className="text-gray-600">
              End-to-end encryption and compliance with industry standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
