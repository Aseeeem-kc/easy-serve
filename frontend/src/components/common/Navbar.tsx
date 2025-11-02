import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/easyservelogo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center h-16">
              <img src={Logo} alt="EasyServe Logo" className="h-full object-contain mr-3" />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#pricing" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group"
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#faq" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group"
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="/signup" 
                className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
              >
                Sign Up
              </a>
              <a 
                href="/signin" 
                className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Sign In
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-3 bg-white border-t border-gray-200">
            <a 
              href="#features" 
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="pt-3 space-y-2 border-t border-gray-200">
              <a 
                href="/signup" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </a>
              <a 
                href="/signin" 
                className="block px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold text-center shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;