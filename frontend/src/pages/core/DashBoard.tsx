import React, { useState, useEffect } from "react";
import { LayoutDashboard, Ticket, BarChart3, Settings, Bell, User, MessageSquare, TrendingUp, Clock, Star, Eye, MoreVertical, HelpCircle, AlertCircle, LogOut } from "lucide-react";
import { tokenStore } from "../../auth/tokenStore";
import { Link } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface DashboardData {
  active_tickets: number;
  ai_resolution_rate: number;
  avg_response_time: number;
  customer_satisfaction: number;
  sentiment_positive: number;
  sentiment_neutral: number;
  sentiment_negative: number;
  ai_handled: number;
  human_handled: number;
  recent_tickets: Array<{
    id: string;
    title: string;
    priority: string;
    time: string;
  }>;
  team_performance: Array<{
    name: string;
    tickets: number;
    satisfaction: number;
  }>;
}

const SupportDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  try {
    let accessToken = tokenStore.get();

    if (!accessToken) {
      // No token > attempt refresh
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

    const response = await fetch(`/api/dashbord/data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    // Access token expired > try refresh once
    if (response.status === 401) {
      const refreshRes = await fetch(`/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        tokenStore.set(refreshData.access_token);

        // Retry original request
        return fetchDashboardData();
      }

      window.location.href = "/signin";
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to load dashboard data");
    }

    const result = await response.json();
    setData(result);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleLogout = () => {
  tokenStore.clear(); // clears memory token
  window.location.href = "/signin";
};


  const getPriorityColor = (priority: string) => {
    const p = priority.toLowerCase();
    if (p.includes("high")) return "text-red-600 bg-red-50";
    if (p.includes("medium")) return "text-orange-600 bg-orange-50";
    return "text-blue-600 bg-blue-50";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error || "Failed to load data"}</p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Active Tickets",
      value: data.active_tickets.toString(),
      change: "+12% from yesterday",
      icon: MessageSquare,
      trend: "up"
    },
    {
      title: "AI Resolution Rate",
      value: `${data.ai_resolution_rate}%`,
      change: "+3% from last week",
      icon: Eye,
      trend: "up"
    },
    {
      title: "Avg Response Time",
      value: `${data.avg_response_time}m`,
      change: "-18% improvement",
      icon: Clock,
      trend: "down"
    },
    {
      title: "Customer Satisfaction",
      value: data.customer_satisfaction.toFixed(1),
      change: "+0.2 from last month",
      icon: Star,
      trend: "up"
    }
  ];

  const sentimentData = [
    { label: "Positive", percentage: data.sentiment_positive, color: "bg-green-500" },
    { label: "Neutral", percentage: data.sentiment_neutral, color: "bg-gray-400" },
    { label: "Negative", percentage: data.sentiment_negative, color: "bg-red-500" }
  ];

  const aiVsHumanData = [
    { label: "AI Handled", percentage: data.ai_handled, color: "bg-blue-500" },
    { label: "Human Handled", percentage: data.human_handled, color: "bg-purple-500" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EasyServe</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

         <button
  onClick={() => window.location.href = "/tickets"}
  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
    window.location.pathname === "/tickets"
      ? "bg-gray-900 text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <Ticket className="w-5 h-5" />
  <span>Ticket Solver</span>
</button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "analytics"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("started")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "started"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Get Started</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-sm text-gray-900 font-medium border-b-2 border-gray-900 pb-1">Dashboard</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Tickets</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Analytics</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Settings</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchDashboardData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh data"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
             <Link to="/profile">
  <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
    <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center">
      <User className="w-4 h-4 text-white" />
    </div>
  </button>
</Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Support Dashboard</h2>
            <p className="text-gray-600">Monitor your customer support performance and AI insights</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                  <p className={`text-sm flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Customer Sentiment Analysis */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Customer Sentiment Analysis</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="text-center text-gray-400 text-sm">Sentiment Chart Visualization</div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {sentimentData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{item.percentage}%</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI vs Human Support Ratio */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">AI vs Human Support Ratio</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="text-center text-gray-400 text-sm">AI/Human Ratio Chart</div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {aiVsHumanData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{item.percentage}%</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Tickets */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Tickets</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
              </div>

              {data.recent_tickets.length > 0 ? (
                <div className="space-y-4">
                  {data.recent_tickets.map((ticket, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{ticket.id}</p>
                          <p className="text-sm text-gray-600">{ticket.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority} Priority
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{ticket.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Ticket className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No recent tickets</p>
                </div>
              )}
            </div>

            {/* Team Performance */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Team Performance</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {data.team_performance.length > 0 ? (
                <div className="space-y-4">
                  {data.team_performance.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.satisfaction}% satisfaction</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{member.tickets}</p>
                        <p className="text-xs text-gray-500">tickets</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No team data available</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center">
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SupportDashboard;