import React, { useState, useEffect } from "react";
import { Lock, CheckCircle, AlertCircle, Sparkles, Eye, EyeOff } from "lucide-react";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    // Extract token from URL - supports both formats
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = urlParams.get('token');
    
    // Or get from path if using /reset-password/token format
    const pathSegments = window.location.pathname.split('/');
    const tokenFromPath = pathSegments[pathSegments.length - 1];
    
    // Use query param first, then path, exclude "reset-password" itself
    const extractedToken = tokenFromQuery || (tokenFromPath !== 'reset-password' ? tokenFromPath : null);
    
    console.log("Extracted token:", extractedToken);
    
    if (extractedToken) {
      setToken(extractedToken);
    } else {
      setTokenError(true);
      setError("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, []);

  const validatePassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Sending reset request with token:", token);
      
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to reset password");
      }

      setSuccess(true);
      
      // Redirect to signin after 3 seconds
      setTimeout(() => {
        window.location.href = "/signin";
      }, 3000);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If token is invalid, show error screen
  if (tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>

        <div className="max-w-md w-full relative">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-200 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Please request a new password reset link to continue.
            </p>

            <div className="space-y-3">
              <a
                href="/forgot-password"
                className="block w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all"
              >
                Request New Link
              </a>
              <a
                href="/signin"
                className="block w-full text-gray-600 hover:text-gray-900 py-3 font-medium"
              >
                Back to Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>

        <div className="max-w-md w-full relative">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-200 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Password Reset Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your password has been updated. You can now sign in with your new password.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Redirecting to sign in page in 3 seconds...
            </p>

            <a
              href="/signin"
              className="block w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg"
            >
              Sign In Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main reset password form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-md w-full relative">
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" /> 
              <span className="text-sm font-semibold">Reset Password</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h2>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 pr-11 focus:border-gray-900 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 pr-11 focus:border-gray-900 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700">Password Strength</div>
                <div className="flex gap-1">
                  <div className={`h-2 flex-1 rounded ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  <div className={`h-2 flex-1 rounded ${password.length >= 12 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  <div className={`h-2 flex-1 rounded ${/[A-Z]/.test(password) && /[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                </div>
                <div className="text-xs text-gray-500">
                  {password.length < 8 && "• At least 8 characters"}
                  {password.length >= 8 && password.length < 12 && "• Good strength"}
                  {password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && "• Strong password!"}
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !password || !confirmPassword || !token}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3.5 rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting Password...
                </span>
              ) : (
                <>
                  Reset Password
                  <CheckCircle className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <a href="/signin" className="text-gray-900 font-semibold hover:underline">
                Sign In
              </a>
            </p>
          </div>

          {/* Debug info (remove in production) */}
          {token && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
              <strong>Token detected:</strong> {token.substring(0, 20)}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;