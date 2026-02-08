import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_CONFIG, { apiRequest } from "../config/api";
import "../styles/history.css";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await apiRequest(API_CONFIG.ENDPOINTS.HISTORY, {
          method: "GET"
        });

        if (result.ok) {
          setHistory(result.data);
        }
      } catch (err) {
        console.error("History fetch error:", err);
        
        if (err.status === 0) {
          setError("Cannot connect to server. Please ensure the backend is running.");
        } else if (err.status === 401) {
          setError("Session expired. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(err.message || "Failed to fetch transaction history");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "status-success";
      case "pending":
        return "status-pending";
      case "failed":
      case "rejected":
        return "status-failed";
      default:
        return "status-default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "pending":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 4v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case "failed":
      case "rejected":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesFilter = filter === "all" || item.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      item.senderAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiveAccount.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const calculateStats = () => {
    const total = history.length;
    const completed = history.filter(h => h.status.toLowerCase() === "completed" || h.status.toLowerCase() === "success").length;
    const pending = history.filter(h => h.status.toLowerCase() === "pending").length;
    const failed = history.filter(h => h.status.toLowerCase() === "failed" || h.status.toLowerCase() === "rejected").length;
    const totalAmount = history.reduce((sum, item) => sum + (parseFloat(item.cash) || 0), 0);

    return { total, completed, pending, failed, totalAmount };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="history-container">
        <div className="loading-state">
          <div className="loading-spinner large"></div>
          <p>Loading transaction history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-container">
        <div className="error-state">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
            <path d="M24 14v12M24 30v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h3>Failed to load history</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <div className="header-content">
          <h2>Transaction History</h2>
          <p className="header-subtitle">View and manage all your transactions</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-total">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Transactions</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-pending">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-amount">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">${stats.totalAmount.toFixed(2)}</div>
            <div className="stat-label">Total Amount</div>
          </div>
        </div>
      </div>

      <div className="history-controls">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by account..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === "failed" ? "active" : ""}`}
            onClick={() => setFilter("failed")}
          >
            Failed
          </button>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 56c13.255 0 24-10.745 24-24S45.255 8 32 8 8 18.745 8 32s10.745 24 24 24z" stroke="currentColor" strokeWidth="2"/>
            <path d="M20 32h24M32 20v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h3>No transactions found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <tr key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>
                    <div className="account-cell">
                      <div className="account-avatar">
                        {item.senderAccount.charAt(0).toUpperCase()}
                      </div>
                      <span className="account-text">{item.senderAccount}</span>
                    </div>
                  </td>
                  <td>
                    <div className="account-cell">
                      <div className="account-avatar">
                        {item.receiveAccount.charAt(0).toUpperCase()}
                      </div>
                      <span className="account-text">{item.receiveAccount}</span>
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">
                      <span className="amount-value">${parseFloat(item.cash).toFixed(2)}</span>
                    </div>
                  </td>
                  <td>
                    <div className={`status-badge ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span>{item.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <span className="date-text">
                        {new Date(item.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="time-text">
                        {new Date(item.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;
