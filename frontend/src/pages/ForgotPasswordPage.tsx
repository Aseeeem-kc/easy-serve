import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Sparkles, Send } from "lucide-react";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to send reset email");
      }

      setMessage(data.message || "Password reset email sent successfully!");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <p className="text-sm text-gray-500 mb-8">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and follow the instructions.
            </p>

            <div className="space-y-3">
              <a
                href="/signin"
                className="block w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all"
              >
                Back to Sign In
              </a>
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="block w-full text-gray-600 hover:text-gray-900 py-3 font-medium"
              >
                Resend Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-md w-full relative">
        <div className="mb-4">
          <a 
            href="/signin" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" /> 
              <span className="text-sm font-semibold">Password Recovery</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">No worries! Enter your email and we'll send you reset instructions.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg p-3 pl-11 focus:border-gray-900 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3.5 rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  Send Reset Link
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;