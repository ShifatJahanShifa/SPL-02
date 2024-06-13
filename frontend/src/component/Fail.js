import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Fail.css'; // Make sure to create a CSS file for styling

function Fail() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/pay'); // Adjust the path to the payment page
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="fail-container">
      <h1>Payment Failed</h1>
      <p>Unfortunately, your payment could not be processed. Please try again.</p>
      <button onClick={handleRetry} className="retry-button">Retry Payment</button>
      <button onClick={handleHome} className="home-button">Go to Home</button>
    </div>
  );
}

export default Fail;
