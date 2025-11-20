import React, { useState, useEffect } from "react";
import { Search, Send, AlertCircle, CheckCircle, Clock, User, Brain, Loader, RefreshCw, Home } from "lucide-react";
import { tokenStore } from "../../auth/tokenStore";

interface Ticket {
  id: number;
  subject: string;
  description: string;
  customer_email: string;
  customer_name?: string;
  customer_phone?: string;
  status: string;
  priority: string;
  category: string;
  created_at: string;
  assigned_to_user_id?: number;
  ai_confidence?: number;
  agent_notes?: string;
  resolved_at?: string;
}

const TicketSolverPage: React.FC = () => {

const [viewMode, setViewMode] = useState<"list" | "table">("list"); 
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [statusFilter, priorityFilter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
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

      let url = `/api/tickets/`;
      const params = new URLSearchParams();
      
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (priorityFilter !== "all") params.append("priority", priorityFilter);
      
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (response.status === 401) {
        tokenStore.clear();
        return fetchTickets();
      }

      if (!response.ok) throw new Error("Failed to fetch tickets");

      const data = await response.json();
      setTickets(data);
      
      // Auto-select first ticket if none selected
      if (data.length > 0 && !selectedTicket) {
        fetchTicketDetails(data[0].id);
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketDetails = async (ticketId: number) => {
    try {
      let accessToken = tokenStore.get();

      const response = await fetch(`/api/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch ticket details");

      const data = await response.json();
      setSelectedTicket(data);
    } catch (err: any) {
      console.error("Error fetching ticket details:", err);
    }
  };

  const updateTicketStatus = async (status: string) => {
    if (!selectedTicket) return;

    try {
      setUpdating(true);
      let accessToken = tokenStore.get();

      const response = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update ticket");

      const updatedTicket = await response.json();
      setSelectedTicket(updatedTicket);
      
      // Refresh ticket list
      fetchTickets();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const escalateToHuman = async () => {
    if (!selectedTicket) return;

    try {
      setUpdating(true);
      let accessToken = tokenStore.get();

      const response = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ 
          status: "in_progress",
          priority: "high"
        }),
      });

      if (!response.ok) throw new Error("Failed to escalate ticket");

      const updatedTicket = await response.json();
      setSelectedTicket(updatedTicket);
      fetchTickets();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "text-red-600";
      case "medium": return "text-orange-600";
      case "low": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      open: { color: "bg-blue-100 text-blue-800", label: "Open" },
      in_progress: { color: "bg-yellow-100 text-yellow-800", label: "In Progress" },
      resolved: { color: "bg-green-100 text-green-800", label: "Resolved" },
      closed: { color: "bg-gray-100 text-gray-800", label: "Closed" },
    };
    const badge = statusMap[status.toLowerCase()] || statusMap.open;
    return <span className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>{badge.label}</span>;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toString().includes(searchQuery)
  );

  if (loading && tickets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-16 h-16 text-gray-900 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
            
          {/* Sidebar - Ticket List */}
          <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <button onClick={() => window.location.href = "/dashboard"}
                className="w-full mb-4 px-4 py-2 border-2 border-t-0 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Back to Dashboard
            </button>
    
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  Active Tickets
                  <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {filteredTickets.length}
                  </span>
                </h2>
                <button
                  onClick={fetchTickets}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="flex gap-2 mb-3">
                <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    viewMode === "list" 
                        ? "bg-gray-900 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    List View
                </button>
                <button
                    onClick={() => setViewMode("table")}
                    className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    viewMode === "table" 
                        ? "bg-gray-900 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Table View
                </button>
                </div>

              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                />
              </div>
    
              {/* Filters */}
              <div className="flex gap-2">
                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
    
            {/* Ticket List */}
            <div className="flex-1 overflow-y-auto">
              {filteredTickets.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No tickets found</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => fetchTicketDetails(ticket.id)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedTicket?.id === ticket.id ? "bg-gray-100 border-l-4 border-l-gray-900" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        ● {ticket.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{formatDateTime(ticket.created_at)}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{ticket.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">#{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
          {/* Ticket List */}
<div className="flex-1 overflow-y-auto">
  {viewMode === "list" ? (
    // Your existing list view code goes here
    <div>
      {/* Add your existing list view JSX here */}

        {/* Main Content */}
              {selectedTicket ? (
                <main className="flex-1 flex flex-col">
                  {/* Ticket Header */}
                  <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-2xl font-bold text-gray-900">{selectedTicket.subject}</h1>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(selectedTicket.priority)} ${
                            selectedTicket.priority === "high" ? "bg-red-50" : "bg-orange-50"
                          }`}>
                            ● {selectedTicket.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span><strong>Ticket ID:</strong> #{selectedTicket.id}</span>
                          <span><strong>Customer:</strong> {selectedTicket.customer_email}</span>
                          <span><strong>Created:</strong> {new Date(selectedTicket.created_at).toLocaleString()}</span>
                          <span><strong>Status:</strong> {selectedTicket.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={escalateToHuman}
                          disabled={updating}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          <User className="w-4 h-4" />
                          {updating ? "Escalating..." : "Escalate to Human"}
                        </button>
                        <button 
                          onClick={() => updateTicketStatus("resolved")}
                          disabled={updating || selectedTicket.status === "resolved"}
                          className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  </header>
        
                  {/* Ticket Details */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Ticket Details</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700">Description</label>
                          <p className="text-gray-900 mt-1 leading-relaxed">{selectedTicket.description}</p>
                        </div>
        
                        {selectedTicket.customer_name && (
                          <div>
                            <label className="text-sm font-semibold text-gray-700">Customer Name</label>
                            <p className="text-gray-900 mt-1">{selectedTicket.customer_name}</p>
                          </div>
                        )}
        
                        {selectedTicket.customer_phone && (
                          <div>
                            <label className="text-sm font-semibold text-gray-700">Phone</label>
                            <p className="text-gray-900 mt-1">{selectedTicket.customer_phone}</p>
                          </div>
                        )}
        
                        <div>
                          <label className="text-sm font-semibold text-gray-700">Category</label>
                          <p className="text-gray-900 mt-1 capitalize">{selectedTicket.category}</p>
                        </div>
        
                        {selectedTicket.agent_notes && (
                          <div>
                            <label className="text-sm font-semibold text-gray-700">Agent Notes</label>
                            <p className="text-gray-900 mt-1">{selectedTicket.agent_notes}</p>
                          </div>
                        )}
        
                        {selectedTicket.resolved_at && (
                          <div>
                            <label className="text-sm font-semibold text-gray-700">Resolved At</label>
                            <p className="text-gray-900 mt-1">{new Date(selectedTicket.resolved_at).toLocaleString()}</p>
                          </div>
                        )}
                      </div>
                    </div>
        
                    {/* Message Input */}
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Add Note or Response</h3>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type your response..."
                          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        />
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </main>
              ) : (
                <main className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Select a ticket to view details</p>
                  </div>
                </main>
              )}
        
              

      {/* 
    //   
    
    
    
    
    
    
    
    
    
    */}
    </div>
  ) : (
    /* Tickets Table View */
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No tickets found</p>
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => fetchTicketDetails(ticket.id)}
                >
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    #{ticket.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900 max-w-xs truncate">
                      {ticket.subject}
                    </div>
                    <div className="text-xs text-gray-500 max-w-xs truncate">
                      {ticket.description}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {ticket.customer_name || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {ticket.customer_email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(ticket.status)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                      ● {ticket.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900 capitalize">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-900">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(ticket.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchTicketDetails(ticket.id);
                        }}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        title="View Details"
                      >
                        <AlertCircle className="w-4 h-4 text-gray-600" />
                      </button>
                      {ticket.status !== "resolved" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTicket(ticket);
                            updateTicketStatus("resolved");
                          }}
                          className="p-1.5 hover:bg-green-100 rounded transition-colors"
                          title="Mark Resolved"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Optional) */}
      {filteredTickets.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-semibold">{filteredTickets.length}</span> tickets
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )}
  {/* Back to Dashboard Button */}
        <button
          onClick={() => window.location.href = "/dashboard"}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center"
        >
          <Home className="w-5 h-5" />
        </button>
  
        {/* Error Message */}
        {error && (
          <div className="fixed top-4 right-4 bg-red-50 border-2 border-red-200 rounded-xl p-4 shadow-lg max-w-md">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        
</div>
{/* Right Sidebar - AI Analysis & Customer Info */}
              {selectedTicket && (
                <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
                  {/* AI Analysis */}
                  {selectedTicket.ai_confidence !== null && (
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        AI Analysis
                      </h3>
        
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">AI Confidence</span>
                          <span className="text-sm font-semibold text-gray-900">{selectedTicket.ai_confidence}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Category</span>
                          <span className="text-sm font-semibold text-gray-900 capitalize">{selectedTicket.category}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Priority</span>
                          <span className={`text-sm font-semibold ${getPriorityColor(selectedTicket.priority)}`}>
                            {selectedTicket.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
        
                  {/* Customer Info */}
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Info</h3>
        
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-600 block mb-1">Email</span>
                        <span className="text-sm font-semibold text-gray-900 break-all">{selectedTicket.customer_email}</span>
                      </div>
                      {selectedTicket.customer_name && (
                        <div>
                          <span className="text-xs text-gray-600 block mb-1">Name</span>
                          <span className="text-sm font-semibold text-gray-900">{selectedTicket.customer_name}</span>
                        </div>
                      )}
                      {selectedTicket.customer_phone && (
                        <div>
                          <span className="text-xs text-gray-600 block mb-1">Phone</span>
                          <span className="text-sm font-semibold text-gray-900">{selectedTicket.customer_phone}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-xs text-gray-600 block mb-1">Created</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {new Date(selectedTicket.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
        
                  {/* Quick Actions */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        
                    <div className="space-y-2">
                      <button 
                        onClick={() => updateTicketStatus("in_progress")}
                        disabled={updating || selectedTicket.status === "in_progress"}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-start gap-3 disabled:opacity-50"
                      >
                        <Clock className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Mark In Progress</span>
                      </button>
                      <button 
                        onClick={() => updateTicketStatus("resolved")}
                        disabled={updating || selectedTicket.status === "resolved"}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-start gap-3 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Mark Resolved</span>
                      </button>
                      <button 
                        onClick={() => updateTicketStatus("closed")}
                        disabled={updating || selectedTicket.status === "closed"}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-start gap-3 disabled:opacity-50"
                      >
                        <AlertCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Close Ticket</span>
                      </button>
                    </div>
                  </div>
                </aside>
              )}
</div>

    );  
};


export default TicketSolverPage;
