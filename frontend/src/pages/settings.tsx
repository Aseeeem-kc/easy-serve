import React, { useEffect, useState } from "react";
import { Copy, Check, ExternalLink, Code, Eye, Sparkles, Home, AlertCircle, RefreshCw, User, Bell, Shield, CreditCard, Palette, Globe, Lock, Mail, Trash2, Download, Crown, Key } from "lucide-react";
import { tokenStore } from "../auth/tokenStore";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("widget");
  const [code, setCode] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock user data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@company.com",
    company: "Acme Inc.",
    plan: "Pro",
    billing_cycle: "Monthly",
    next_billing: "Jan 15, 2025",
    amount: "$99.00"
  });

  useEffect(() => {
    if (activeTab === "widget") {
      fetchWidgetCode();
    }
  }, [activeTab]);

  const fetchWidgetCode = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let accessToken = tokenStore.get();

      if (!accessToken) {
        const refreshRes = await fetch(`/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          tokenStore.set(refreshData.access_token);
          accessToken = refreshData.access_token;
        } else {
          window.location.href = "/signin";
          return;
        }
      }

      const profileResponse = await fetch("/api/profile/profile", {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (profileResponse.status === 401) {
        tokenStore.clear();
        return fetchWidgetCode();
      }

      if (!profileResponse.ok) {
        throw new Error("Failed to load profile");
      }

      const profileData = await profileResponse.json();
      const profileId = profileData.id;

      const widgetResponse = await fetch(`/api/users/onboarding/widget/config/${profileId}`, {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (widgetResponse.status === 401) {
        tokenStore.clear();
        return fetchWidgetCode();
      }

      if (!widgetResponse.ok) {
        throw new Error("Failed to load widget configuration");
      }

      const widgetData = await widgetResponse.json();
      
      const embedCode = `<!-- EasyServe Chat Widget -->
<script>
  (function() {
    var w = window;
    var d = document;
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://cdn.easyserve.ai/widget.js';
    s.setAttribute('data-profile-id', '${profileId}');
    var x = d.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  })();
</script>`;

      setCode(embedCode);
      setPreviewUrl(`http://localhost:8000/static/widget.html?clientId=${profileId}`);
    } catch (err: any) {
      setError(err.message || "Failed to load widget code");
      setCode("// Failed to load widget code");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "widget", label: "Chat Widget", icon: Code },
    { id: "profile", label: "Profile", icon: User },
    { id: "subscription", label: "Subscription", icon: Crown },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API Keys", icon: Key },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Header */}
      <header className="relative bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg mb-3">
               
                <span className="text-sm font-semibold">Settings & Configuration</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
              <p className="text-gray-600">Manage your account, billing, and preferences</p>
            </div>
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-lg sticky top-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all mb-2 ${
                      activeTab === tab.id
                        ? "bg-gray-900 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Widget Settings Tab */}
            {activeTab === "widget" && (
              <div className="space-y-8">
                {error && (
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-semibold">Error</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Embed Code
                      </h2>
                    </div>
                    <div className="p-6">
                      {loading ? (
                        <div className="bg-gray-100 rounded-xl p-8 text-center">
                          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-3"></div>
                          <p className="text-gray-600 text-sm">Loading...</p>
                        </div>
                      ) : (
                        <>
                          <div className="relative">
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto font-mono max-h-80">
{code}
                            </pre>
                            <button
                              onClick={copyCode}
                              className={`absolute top-3 right-3 px-3 py-2 rounded-lg font-semibold text-xs transition-all flex items-center gap-2 ${
                                copied ? "bg-green-500 text-white" : "bg-white text-gray-900 hover:bg-gray-100 border-2 border-gray-300"
                              }`}
                            >
                              {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
                            </button>
                          </div>
                          <button
                            onClick={copyCode}
                            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg flex items-center justify-center gap-2"
                          >
                            {copied ? <><Check className="w-5 h-5" />Copied!</> : <><Copy className="w-5 h-5" />Copy to Clipboard</>}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Live Preview
                      </h2>
                    </div>
                    <div className="p-6">
                      {loading ? (
                        <div className="bg-gray-100 rounded-xl p-8 text-center h-96 flex flex-col items-center justify-center">
                          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-3"></div>
                        </div>
                      ) : previewUrl ? (
                        <>
                          <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-inner bg-gray-50">
                            <iframe src={previewUrl} className="w-full h-96" title="Preview" style={{ border: 'none' }} />
                          </div>
                          <a href={previewUrl} target="_blank" rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold text-sm">
                            <ExternalLink className="w-4 h-4" />Open in new tab
                          </a>
                        </>
                      ) : (
                        <div className="bg-gray-100 rounded-xl p-8 text-center h-96 flex flex-col items-center justify-center">
                          <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-gray-600">No preview available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" value={profile.name} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" value={profile.email} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                    <input type="text" value={profile.company} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === "subscription" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
                      <p className="text-gray-600 mt-1">Manage your subscription and billing</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 border-2 border-blue-300">
                      <Crown className="w-4 h-4" />
                      <span className="font-semibold">{profile.plan} Plan</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Billing Cycle</p>
                      <p className="text-lg font-bold text-gray-900">{profile.billing_cycle}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Amount</p>
                      <p className="text-lg font-bold text-gray-900">{profile.amount}/month</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Next Billing Date</p>
                      <p className="text-lg font-bold text-gray-900">{profile.next_billing}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <span className="inline-flex items-center gap-2 text-green-600 font-bold">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Update Payment Method
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                      Change Plan
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Billing History</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <p className="font-semibold text-gray-900">Dec {i}, 2024</p>
                          <p className="text-sm text-gray-600">Pro Plan - Monthly</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-900">$99.00</span>
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { title: "Email Notifications", desc: "Receive email updates about your tickets" },
                    { title: "Ticket Updates", desc: "Get notified when tickets are resolved" },
                    { title: "Weekly Reports", desc: "Receive weekly analytics summary" },
                    { title: "Marketing Emails", desc: "Get product updates and promotions" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <input type="password" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <input type="password" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <input type="password" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                    Enable 2FA
                  </button>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Danger Zone
                  </h3>
                  <p className="text-red-700 text-sm mb-4">Once you delete your account, there is no going back.</p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === "api" && (
              <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
                    <p className="text-gray-600 mt-1">Manage your API keys for integrations</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg">
                    Generate New Key
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Production API Key", key: "sk_live_xxxxxxxxxxxxxx", created: "Dec 1, 2024" },
                    { name: "Development API Key", key: "sk_test_xxxxxxxxxxxxxx", created: "Nov 15, 2024" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600 font-mono">{item.key}</p>
                        <p className="text-xs text-gray-500 mt-1">Created: {item.created}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <strong>Important:</strong> Keep your API keys secure and never share them publicly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;