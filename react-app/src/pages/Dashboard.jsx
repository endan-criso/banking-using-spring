import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_CONFIG, { apiRequest } from "../config/api";
import "../styles/dashboard.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout endpoint if you have one
      await apiRequest(API_CONFIG.ENDPOINTS.LOGOUT, {
        method: "POST"
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear session storage and redirect to login
      sessionStorage.removeItem("SESSION_ID");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userResult = await apiRequest(API_CONFIG.ENDPOINTS.PROFILE, {
          method: "GET"
        });
        
        if (userResult.ok) {
          setUserData(userResult.data);
        }

        // Fetch recent transactions
        const historyResult = await apiRequest(API_CONFIG.ENDPOINTS.HISTORY, {
          method: "GET"
        });
        
        if (historyResult.ok) {
          setRecentTransactions(historyResult.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        
        // If unauthorized, redirect to login
        if (error.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner large"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back{userData?.name ? `, ${userData.name}` : ""}!</h1>
          <p className="dashboard-subtitle">Here's what's happening with your account</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 13l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </button>
      </div>

      <div className="quick-actions">
        <Link to="/send" className="action-card action-send">
          <div className="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="action-content">
            <h3>Send Money</h3>
            <p>Transfer funds instantly</p>
          </div>
        </Link>

        <Link to="/history" className="action-card action-history">
          <div className="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="action-content">
            <h3>Transaction History</h3>
            <p>View all transactions</p>
          </div>
        </Link>

        <div className="action-card action-balance">
          <div className="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9h18M3 15h18M7.5 3v18m9-18v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="action-content">
            <h3>Account Balance</h3>
            <p className="balance-amount">${userData?.cash?.toFixed(2) || "0.00"}</p>
            {userData?.accNo && (
              <p style={{ fontSize: "1.40rem", color: "var(--color-text-muted)", marginTop: "0.25rem", fontFamily: "var(--font-mono)" }}>
                Acc: {userData.accNo}
              </p>
            )}
          </div>
        </div>
      </div>

      {recentTransactions.length > 0 && (
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <Link to="/history" className="view-all-link">
              View All
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="transaction-list">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="transaction-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="transaction-avatar">
                  {transaction.receiveAccount.charAt(0).toUpperCase()}
                </div>
                <div className="transaction-details">
                  <div className="transaction-name">{transaction.receiveAccount}</div>
                  <div className="transaction-date">
                    {new Date(transaction.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="transaction-amount">
                  ${parseFloat(transaction.cash).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info-cards">
        <div className="info-card">
          <div className="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 11V7a4 4 0 0 0-8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="info-content">
            <h4>Secure Transactions</h4>
            <p>Your data is encrypted and protected.</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="info-content">
            <h4>Instant Transfers</h4>
            <p>Send money instantly to anyone with real-time transaction processing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
