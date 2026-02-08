import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_CONFIG, { apiRequest } from "../config/api";
import "../styles/sender.css";

function Sender() {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await apiRequest(API_CONFIG.ENDPOINTS.SEND, {
        method: "POST",
        body: JSON.stringify({
          receiverEmail,
          accountNo,
          cash: parseFloat(amount)
        })
      });

      if (result.ok) {
        setSuccess("Transaction completed successfully!");
        // Clear form
        setReceiverEmail("");
        setAccountNo("");
        setAmount("");
        
        // Optionally redirect to history after 2 seconds
        setTimeout(() => {
          navigate("/history");
        }, 2000);
      }
    } catch (err) {
      console.error("Send money error:", err);
      
      // Handle specific error codes from your backend
      if (err.status === 0) {
        setError("Cannot connect to server. Please ensure the backend is running.");
      } else if (err.status === 400) {
        setError("Invalid account number. Please check and try again.");
      } else if (err.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (err.status === 403) {
        setError("Self transfer is restricted. Cannot send money to your own account.");
      } else if (err.status === 409) {
        setError("Insufficient funds. Please check your balance.");
      } else if (err.status === 408) {
        setError(err.message);
      } else {
        setError(err.message || "Transaction failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sender-container">
      <div className="sender-header">
        <h2>Send Money</h2>
        <p className="sender-subtitle">Transfer funds securely and instantly</p>
      </div>

      <div className="sender-card">
        {error && (
          <div className="alert alert-error animate-slide-in">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 5h2v6H9V5zm0 8h2v2H9v-2z" fill="currentColor"/>
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success animate-slide-in">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.707-6.293a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414L10.414 11l2.293 2.293a1 1 0 0 1-1.414 1.414l-3-3z" fill="currentColor"/>
            </svg>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="sender-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="receiver-email">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.25L9 9.75L15 5.25M3 5.25V12.75C3 13.164 3.336 13.5 3.75 13.5H14.25C14.664 13.5 15 13.164 15 12.75V5.25M3 5.25C3 4.836 3.336 4.5 3.75 4.5H14.25C14.664 4.5 15 4.836 15 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Receiver Email
              </label>
              <input
                id="receiver-email"
                type="email"
                placeholder="recipient@example.com"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label htmlFor="account-no">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.25 6.75h13.5M4.5 10.5h3M2.25 13.5h13.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75H2.25a.75.75 0 0 0-.75.75v7.5c0 .414.336.75.75.75z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Account Number
              </label>
              <input
                id="account-no"
                type="text"
                placeholder="Enter account number"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                required
                disabled={loading || success}
              />
            </div>
          </div>

          <div className="form-group amount-group">
            <label htmlFor="amount">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 15.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5.25v7.5M6.75 7.5h2.625a1.125 1.125 0 1 1 0 2.25h-1.5a1.125 1.125 0 1 0 0 2.25H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Amount
            </label>
            <div className="amount-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
                disabled={loading || success}
              />
            </div>
          </div>

          <button type="submit" className="send-button" disabled={loading || success}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : success ? (
              "Redirecting to history..."
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 10l-7.5 7.5-7.5-7.5M10 2.5v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Send Money
              </>
            )}
          </button>
        </form>

        <div className="sender-info">
          <div className="info-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <h4>Secure Transactions</h4>
              <p>All transfers are encrypted and protected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sender;
