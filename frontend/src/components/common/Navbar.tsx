import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/easyservelogo.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center h-16">
            <img src={Logo} alt="EasyServe Logo" className="h-full object-contain mr-3" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/signup" className="text-gray-600 hover:text-gray-900">Sign Up</Link>
            <Link to="/signin" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Sign In
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className={`block h-0.5 bg-gray-600 ${isMenuOpen ? "rotate-45 translate-y-1" : ""}`}></span>
              <span className={`block h-0.5 bg-gray-600 mt-1 ${isMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-0.5 bg-gray-600 mt-1 ${isMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
