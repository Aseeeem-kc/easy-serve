import React from "react";
import { ArrowRight, Zap } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800">
              <Zap className="w-4 h-4 mr-2" /> AI-Powered Solution
            </div>

            <h1 className="text-5xl font-bold text-gray-900">
              Automate Customer Support with{" "}
              <span className="text-gray-800">
                AI-Powered Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-lg">
              Transform your Business's customer support with our multi-agent AI framework.
            </p>

            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-lg flex items-center">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border border-gray-300 text-gray-800 px-8 py-4 rounded-lg">
                ▶ Watch Demo
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 rotate-3 hover:rotate-0 transition-transform">
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="font-semibold mb-4">AI Customer Support Dashboard</h3>
                <div className="space-y-3">
                  <div className="flex justify-between bg-white/20 p-3 rounded-lg">
                    <span>Active Conversations</span> <span>247</span>
                  </div>
                  <div className="flex justify-between bg-white/20 p-3 rounded-lg">
                    <span>Resolution Rate</span> <span>94%</span>
                  </div>
                  <div className="flex justify-between bg-white/20 p-3 rounded-lg">
                    <span>Avg Response Time</span> <span>12s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
