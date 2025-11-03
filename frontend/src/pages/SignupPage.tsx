import React, { useState } from "react";
import { Mail, Lock, User, Building2, MapPin, CreditCard, Phone, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    company_name: "",
    location: "",
    pan_number: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Signup failed");
      }

      setSuccess("Account created successfully! You can now sign in.");
      setFormData({
        username: "",
        company_name: "",
        location: "",
        pan_number: "",
        email: "",
        phone_number: "",
        password: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-md w-full relative">
        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" /> 
              <span className="text-sm font-semibold">Join EasyServe</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Start your 14-day free trial today</p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="company_name"
                  placeholder="Acme Inc."
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  placeholder="New York, USA"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* PAN Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PAN Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="pan_number"
                  placeholder="ABCDE1234F"
                  value={formData.pan_number}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="phone_number"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3.5 rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-gray-900 font-semibold hover:underline">
              Sign In
            </a>
          </p>

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                14-day free trial
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;