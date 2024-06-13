import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PaymentSuccess.css'; // Import your CSS file for styling

function PaymentSuccess() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic if needed
    navigate('/');
  };

  return (
    <div className="payment-success">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction was completed successfully.</p>
      <button onClick={handleLogout}>Logout</button>
      <div className="navigation-links">
        <Link className="nav-link" to="/Input1">Go to Input Page</Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
