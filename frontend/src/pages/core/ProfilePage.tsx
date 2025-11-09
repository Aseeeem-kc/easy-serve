import React, { useState, useEffect, type JSX } from "react";
import { User, Building2, Globe, Settings, Clock, Languages, FileText, CheckCircle, AlertCircle, Crown, Calendar, Sparkles, Edit2, Save, X, FerrisWheel } from "lucide-react";
import { tokenStore } from "../../auth/tokenStore";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProfileData {
  id: number;
  industry: string;
  company_size: string;
  website_url: string;
  timezone: string;
  language: string;
  knowledge_base_status: string;
  documents_uploaded_count: number;
  kb_processing_status: string;
  subscription_plan: string;
  is_onboarded: boolean;
  created_at: string;
  updated_at: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
  try {
    let accessToken = tokenStore.get();

    if (!accessToken) {
      const refreshRes = await fetch(`/api/auth/refresh`, { method: "POST", credentials: "include" });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        tokenStore.set(refreshData.access_token);
        accessToken = refreshData.access_token;
        console.log("Token refreshed successfully");
        console.log("New Access Token:", accessToken);
      } else {
        window.location.href = "/signin";
        return;
      }
    }

    const res = await fetch(`/api/profile/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    console.log("Profile fetch response status:", res);

    if (res.status === 401) {
      // Retry once
      tokenStore.clear();
      return fetchProfileData();
    }

    if (!res.ok) throw new Error("Failed to load profile data");

    const result = await res.json();
    setLoading(false);
    setProfile(result);
    setError(null);
    console.log(result); 
  } catch (err: any) {
    console.error("Profile fetch error:", err.message);
  }
};


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-300", text: "Pending" },
      completed: { color: "bg-green-100 text-green-800 border-green-300", text: "Completed" },
      processing: { color: "bg-blue-100 text-blue-800 border-blue-300", text: "Processing" },
      idle: { color: "bg-gray-100 text-gray-800 border-gray-300", text: "Idle" },
      failed: { color: "bg-red-100 text-red-800 border-red-300", text: "Failed" }
    };
    
    const badge = statusMap[status] || statusMap.idle;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const getPlanBadge = (plan: string) => {
    const planMap: Record<string, { color: string; icon: JSX.Element }> = {
      basic: { color: "bg-gray-100 text-gray-800 border-gray-300", icon: <User className="w-4 h-4" /> },
      pro: { color: "bg-blue-100 text-blue-800 border-blue-300", icon: <Sparkles className="w-4 h-4" /> },
      enterprise: { color: "bg-purple-100 text-purple-800 border-purple-300", icon: <Crown className="w-4 h-4" /> }
    };
    
    const badge = planMap[plan.toLowerCase()] || planMap.basic;
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${badge.color}`}>
        {badge.icon}
        {plan.charAt(0).toUpperCase() + plan.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error || "Failed to load profile"}</p>
          <button
            onClick={fetchProfileData}
            className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">Manage your account information and preferences</p>
            </div>
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden mb-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Account Profile</h2>
                  <p className="text-gray-200">ID: #{profile.id}</p>
                </div>
              </div>
              <div>
                {getPlanBadge(profile.subscription_plan)}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Onboarding Status Banner */}
            {!profile.is_onboarded && (
              <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-semibold">Complete Your Onboarding</p>
                  <p className="text-yellow-700 text-sm">Finish setting up your profile to unlock all features.</p>
                </div>
              </div>
            )}

            {/* Company Information */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-gray-700" />
                  Company Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Industry</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 capitalize ml-8">
                    {profile.industry}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Company Size</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 ml-8">
                    {profile.company_size} employees
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Website</span>
                  </div>
                  <a 
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-600 hover:text-blue-700 ml-8 break-all"
                  >
                    {profile.website_url}
                  </a>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Settings className="w-6 h-6 text-gray-700" />
                Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Timezone</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 ml-8">
                    {profile.timezone}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Languages className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Language</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 ml-8 uppercase">
                    {profile.language}
                  </p>
                </div>
              </div>
            </div>

            {/* Knowledge Base Status */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-gray-700" />
                Knowledge Base
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Status</span>
                  </div>
                  <div className="ml-8">
                    {getStatusBadge(profile.knowledge_base_status)}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Documents</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 ml-8">
                    {profile.documents_uploaded_count} uploaded
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Processing</span>
                  </div>
                  <div className="ml-8">
                    {getStatusBadge(profile.kb_processing_status)}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-gray-700" />
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Created</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 ml-8">
                    {formatDate(profile.created_at)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Last Updated</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 ml-8">
                    {formatDate(profile.updated_at)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Onboarding Status</span>
                  </div>
                  <div className="ml-8">
                    {profile.is_onboarded ? (
                      <span className="inline-flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Completed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-yellow-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">Incomplete</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Crown className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Subscription</span>
                  </div>
                  <div className="ml-8">
                    {getPlanBadge(profile.subscription_plan)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = "/onboarding"}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl"
          >
            Update Profile
          </button>
          <button
            onClick={fetchProfileData}
            className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;