import React from 'react';
import { useNavigate } from 'react-router-dom';

function GenerateRating() {
  const navigate = useNavigate();


  const handleLogout = () => {
    // Redirect to home page on logout
    navigate('/');
  };

  const handleInputPage = () => {
    // Redirect to Input page
    navigate('/Input1');
  };

  
  return (

    <div>
      <h1>Generate Rating Page</h1>
      <button onClick={handleInputPage}>Input Page</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );

}


export default GenerateRating;
