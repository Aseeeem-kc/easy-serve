import React, { useState } from "react";
import { Home, TrendingUp, TrendingDown, BarChart3, PieChart, MessageSquare, Clock, Star, Users, Calendar, Download, Filter, RefreshCw, ArrowUpRight, ArrowDownRight } from "lucide-react";

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Mock data for charts
  const weeklyData = [
    { day: "Mon", queries: 145, resolved: 128, avgTime: 12 },
    { day: "Tue", queries: 168, resolved: 152, avgTime: 11 },
    { day: "Wed", queries: 192, resolved: 178, avgTime: 10 },
    { day: "Thu", queries: 157, resolved: 143, avgTime: 13 },
    { day: "Fri", queries: 203, resolved: 189, avgTime: 9 },
    { day: "Sat", queries: 134, resolved: 125, avgTime: 14 },
    { day: "Sun", queries: 112, resolved: 108, avgTime: 15 },
  ];

  const categoryData = [
    { name: "Payment Issues", value: 35, color: "bg-blue-500" },
    { name: "Account Problems", value: 28, color: "bg-purple-500" },
    { name: "Technical Support", value: 22, color: "bg-green-500" },
    { name: "Product Questions", value: 15, color: "bg-yellow-500" },
  ];

  const sentimentData = [
    { label: "Positive", percentage: 68, color: "bg-green-500" },
    { label: "Neutral", percentage: 22, color: "bg-gray-400" },
    { name: "Negative", percentage: 10, color: "bg-red-500" },
  ];

  const teamPerformance = [
    { name: "Sarah Johnson", tickets: 47, satisfaction: 92, avgTime: "8m" },
    { name: "Mike Chen", tickets: 35, satisfaction: 88, avgTime: "11m" },
    { name: "Emma Davis", tickets: 52, satisfaction: 95, avgTime: "7m" },
    { name: "Alex Kumar", tickets: 41, satisfaction: 90, avgTime: "9m" },
  ];

  const maxQueries = Math.max(...weeklyData.map(d => d.queries));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Header */}
      <header className="relative bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive insights into your customer support performance</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-900"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-900"
              >
                <option value="all">All Metrics</option>
                <option value="queries">Queries Only</option>
                <option value="satisfaction">Satisfaction</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Queries */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Queries</p>
                <h3 className="text-4xl font-bold text-gray-900">1,247</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="font-semibold">+12.5%</span>
              <span className="text-gray-500 ml-2">from last week</span>
            </div>
          </div>

          {/* Resolution Rate */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolution Rate</p>
                <h3 className="text-4xl font-bold text-gray-900">94%</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="font-semibold">+3.2%</span>
              <span className="text-gray-500 ml-2">from last week</span>
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
                <h3 className="text-4xl font-bold text-gray-900">2.3m</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              <span className="font-semibold">-18%</span>
              <span className="text-gray-500 ml-2">improvement</span>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Satisfaction Score</p>
                <h3 className="text-4xl font-bold text-gray-900">4.7</h3>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="font-semibold">+0.2</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Query Volume Trend */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-gray-700" />
                  Query Volume Trend
                </h3>
                <p className="text-sm text-gray-600 mt-1">Daily query distribution over the past week</p>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="space-y-4">
              {weeklyData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.day}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{data.queries} queries</span>
                      <span className="text-sm text-green-600 font-semibold">{data.resolved} resolved</span>
                    </div>
                  </div>
                  <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg"
                      style={{ width: `${(data.queries / maxQueries) * 100}%` }}
                    ></div>
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 rounded-lg"
                      style={{ width: `${(data.resolved / maxQueries) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded"></div>
                <span className="text-sm text-gray-600">Total Queries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
                <span className="text-sm text-gray-600">Resolved</span>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-gray-700" />
                  Query Categories
                </h3>
                <p className="text-sm text-gray-600 mt-1">Distribution by support category</p>
              </div>
            </div>

            {/* Category Bars */}
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-semibold text-gray-900">{category.value}%</span>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 ${category.color} rounded-full transition-all duration-500`}
                      style={{ width: `${category.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Total Categories</span>
                <span className="text-2xl font-bold text-gray-900">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI vs Human Support */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI vs Human Support Ratio</h3>
                <p className="text-sm text-gray-600 mt-1">Automated vs manual query handling</p>
              </div>
            </div>

            {/* Large Percentage Display */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <div className="text-6xl font-bold text-gray-900 mb-2">84%</div>
                <div className="text-sm text-gray-600">AI Handled</div>
              </div>
            </div>

            {/* Visual Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">AI Handled</span>
                  <span className="text-sm font-bold text-blue-600">84% (1,047)</span>
                </div>
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: "84%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Human Handled</span>
                  <span className="text-sm font-bold text-purple-600">16% (200)</span>
                </div>
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: "16%" }}></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2.1m</div>
                <div className="text-xs text-gray-600">Avg AI Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">8.5m</div>
                <div className="text-xs text-gray-600">Avg Human Response</div>
              </div>
            </div>
          </div>

          {/* Customer Sentiment */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Customer Sentiment Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Overall customer satisfaction breakdown</p>
              </div>
            </div>

            {/* Sentiment Circles */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${68 * 2.764} ${276.4}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">68%</span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-green-600">Positive</div>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#9ca3af"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${22 * 2.764} ${276.4}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">22%</span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-600">Neutral</div>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#ef4444"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${10 * 2.764} ${276.4}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">10%</span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-red-600">Negative</div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-green-900">Excellent Performance</p>
                  <p className="text-xs text-green-700">Customer satisfaction is 5% above target</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-700" />
                Team Performance Overview
              </h3>
              <p className="text-sm text-gray-600 mt-1">Individual agent statistics and metrics</p>
            </div>
          </div>

          {/* Team Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Agent Name</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Tickets Handled</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Satisfaction Rate</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Avg Response Time</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((member, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-semibold text-gray-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-gray-900">{member.tickets}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 max-w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                            style={{ width: `${member.satisfaction}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-green-600">{member.satisfaction}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">{member.avgTime}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        member.satisfaction >= 90 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {member.satisfaction >= 90 ? "Excellent" : "Good"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;