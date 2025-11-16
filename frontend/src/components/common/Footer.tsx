import React from "react";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Newsletter Section */}
        {/* <div className="py-12 border-b border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-400">
                Get the latest updates, tips, and insights delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              />
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 flex items-center">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold text-white">
                EasyServe
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered customer support automation for modern businesses. Transform your support operations with intelligent multi-agent technology.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors border border-gray-700 hover:border-gray-600"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a 
                href="https://github.com/Aseeeem-kc/easy-serve" 
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors border border-gray-700 hover:border-gray-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
              <a 
                href="https://github.com/Aseeeem-kc/easy-serve" 
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors border border-gray-700 hover:border-gray-600"
                aria-label="Github"
              >
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors border border-gray-700 hover:border-gray-600"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} EasyServe. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Built with Love</span>
              <span>by the EasyServe Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;