import React from "react";
import { ArrowRight, CheckCircle, Users, Zap, Clock } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.15) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg">
               
              <span className="text-sm font-semibold">AI-Powered Solution</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Automate Customer Support with{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  AI-Powered Intelligence
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Transform your Business's customer support with our multi-agent AI framework. Deliver instant, accurate responses 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://calendar.app.google/9x5vBf1FhQpH4G6L9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-8 py-4 rounded-xl flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Book a Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
            </a>

            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl bg-white hover:bg-gray-50 transition-all font-semibold shadow-md hover:shadow-lg">
              ▶ Watch Demo
            </button>
          </div>


            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-gray-600">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="text-gray-600">
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="text-gray-600">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>

          {/* Right - Feature Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Instant responses in milliseconds</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 mt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-500 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">94% Accuracy</h3>
                <p className="text-gray-600 text-sm">AI-powered precision support</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-400 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multi-Agent</h3>
                <p className="text-gray-600 text-sm">Collaborative AI framework</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 mt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-300 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">24/7 Available</h3>
                <p className="text-gray-600 text-sm">Always-on support system</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl">
              ⚡ New Features
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;