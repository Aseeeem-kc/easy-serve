import React, { useState, useEffect, type JSX } from "react";
import { User, Building2, Globe, Settings, Clock, Languages, FileText, CheckCircle, AlertCircle, Crown, Calendar, Sparkles, Edit2, Save, X, Target } from "lucide-react";
import { tokenStore } from "../../auth/tokenStore";

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
  primary_usecase: string;
  business_goals: string;
}


interface EditableFields {
  industry: string;
  company_size: string;
  website_url: string;
  primary_usecase: string;
  business_goals: string;
  timezone: string;
  language: string;
}


const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditableFields>({
    industry: "",
    company_size: "",
    website_url: "",
    primary_usecase: "",
    business_goals: "",
    timezone: "",
    language: ""
  });
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

      if (res.status === 401) {
        tokenStore.clear();
        return fetchProfileData();
      }

      if (!res.ok) throw new Error("Failed to load profile data");

      const result = await res.json();
      setProfile(result);
      setEditedData({
        industry: result.industry || "",
        company_size: result.company_size || "",
        website_url: result.website_url || "",
        primary_usecase: result.primary_usecase || "",
        business_goals: result.business_goals || "",
        timezone: result.timezone || "",
        language: result.language || "",
      });
      setError(null);
    } catch (err: any) {
      console.error("Profile fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
    
  const handleEditToggle = () => {
    if (isEditing && profile) {
      // Cancel editing - restore original values
      setEditedData({
        industry: profile.industry || "",
        company_size: profile.company_size || "",
        website_url: profile.website_url || "",
        primary_usecase: profile.primary_usecase || "",
        business_goals: profile.business_goals || "",
        timezone: profile.timezone || "",
        language: profile.language || ""
      });
    }
    
    setIsEditing(!isEditing);
    setSuccessMessage(null);
  };

  const handleInputChange = (field: keyof EditableFields, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  

  
  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    console.log("Edited Data:", editedData);

    try {
      let accessToken = tokenStore.get();

      if (!accessToken) {
        const refreshRes = await fetch(`/api/auth/refresh`, { method: "POST", credentials: "include" });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          tokenStore.set(refreshData.access_token);
          accessToken = refreshData.access_token;
        } else {
          window.location.href = "/signin";
          return;
        }
      }
      
      // Convert empty strings ("") to null
const cleanData = Object.fromEntries(
  Object.entries(editedData).map(([key, value]) => [
    key,
    value === "" ? null : value
  ])
);

const res = await fetch(`/api/profile/edit`, {
  method: "PATCH",
  headers: {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  },
  credentials: "include",
  body: JSON.stringify(cleanData)
});


      if (res.status === 401) {
        tokenStore.clear();
        return handleSaveProfile();
      }
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to update profile");
      }


      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error("Profile update error:", err.message);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  console.log(profile?.company_size);
  console.log(profile?.primary_usecase);


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


  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
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

  if (!profile) return null;

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

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

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
                {!isEditing ? (
                  <button
                    onClick={handleEditToggle}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="text-sm bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:from-gray-800 hover:to-gray-700 transition-all disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={handleEditToggle}
                      disabled={saving}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Industry */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Industry</span>
                  </div>
                  {isEditing ? (
                    <select
                      value={editedData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full ml-8 border-2 border-gray-300 rounded-lg p-2 focus:border-gray-900 focus:outline-none"
                    >
                      <option value="technology">Technology</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="real_estate">Real Estate</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-lg font-medium text-gray-900 capitalize ml-8">
                      {profile.industry}
                    </p>
                  )}
                </div>

                {/* Company Size */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Company Size</span>
                  </div>
                  {isEditing ? (
                    <select
                      value={editedData.company_size}
                      onChange={(e) => handleInputChange('company_size', e.target.value)}
                      className="w-full ml-8 border-2 border-gray-300 rounded-lg p-2 focus:border-gray-900 focus:outline-none"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1001+">1001+ employees</option>
                    </select>
                  ) : (
                    <p className="text-lg font-medium text-gray-900 ml-8">
                      {profile.company_size} employees
                    </p>
                  )}
                </div>

                {/* Website */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Website</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedData.website_url}
                      onChange={(e) => handleInputChange('website_url', e.target.value)}
                      placeholder="https://example.com"
                      className="w-full ml-8 border-2 border-gray-300 rounded-lg p-2 focus:border-gray-900 focus:outline-none"
                    />
                  ) : (
                    <a 
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-blue-600 hover:text-blue-700 ml-8 break-all"
                    >
                      {profile.website_url}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Business Goals */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-gray-700" />
                Business Information
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {/* Primary Use Case */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Primary Use Case</span>
                  </div>
                  {isEditing ? (
                    <select
                      value={editedData.primary_usecase}
                      onChange={(e) => handleInputChange('primary_usecase', e.target.value)}
                      className="w-full ml-8 border-2 border-gray-300 rounded-lg p-2 focus:border-gray-900 focus:outline-none"
                    >
                      <option value="">Select primary use case</option>
                      <option value="customer_support">Customer Support Automation</option>
                      <option value="lead_generation">Lead Generation</option>
                      <option value="sales_assistance">Sales Assistance</option>
                      <option value="internal_helpdesk">Internal Helpdesk</option>
                      <option value="e-commerce_support">E-commerce Support</option>
                      <option value="booking_reservations">Booking & Reservations</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-lg font-medium text-gray-900 capitalize ml-8">
                      {profile.primary_usecase?.replace(/_/g, ' ') || 'Not specified'}
                    </p>
                  )}
                </div>


                {/* Business Goals */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Business Goals</span>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editedData.business_goals}
                      onChange={(e) => handleInputChange('business_goals', e.target.value)}
                      placeholder="Describe your business goals..."
                      rows={4}
                      className="w-full ml-8 border-2 border-gray-300 rounded-lg p-2 focus:border-gray-900 focus:outline-none resize-none"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900 ml-8">
                      {profile.business_goals || 'Not specified'}
                    </p>
                  )}
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
                {/* Timezone */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Timezone</span>
                  </div>
                  {isEditing ? (
                    <select
                      value={editedData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full ml-8 border-2 border-gray-300 rounded-lg p-2 focus:border-gray-900 focus:outline-none"
                    >
                      <option value="Asia/Kathmandu">Asia/Kathmandu (UTC+5:45)</option>
                      <option value="America/New_York">America/New York (UTC-5)</option>
                      <option value="America/Los_Angeles">America/Los Angeles (UTC-8)</option>
                      <option value="Europe/London">Europe/London (UTC+0)</option>
                      <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                      <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                      <option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</option>
                      <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
                      <option value="Australia/Sydney">Australia/Sydney (UTC+10)</option>
                    </select>
                  ) : (
                    <p className="text-lg font-medium text-gray-900 ml-8">
                      {profile.timezone}
                    </p>
                  )}
                </div>

                {/* Language */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Languages className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Language</span>
                  </div>
                  {isEditing ? (
                    <select
                      value={editedData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full ml-8 border-2 border-gray-300 rounded-lg p-2 focus:border-gray-900 focus:outline-none"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                      <option value="ja">Japanese</option>
                      <option value="ar">Arabic</option>
                      <option value="hi">Hindi</option>
                      <option value="pt">Portuguese</option>
                    </select>
                  ) : (
                    <p className="text-lg font-medium text-gray-900 ml-8 uppercase">
                      {profile.language}
                    </p>
                  )}
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
            onClick={fetchProfileData}
            className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;