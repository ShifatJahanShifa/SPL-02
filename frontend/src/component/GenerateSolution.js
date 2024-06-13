import React from 'react';
import { useNavigate } from 'react-router-dom';
import './gener.css';

function GenerateSolution() {
  const navigate = useNavigate();

  

  const handleLogout = () => {
    // Redirect to home page on logout
    navigate('/');
  };

  const handleInputPage = () => {
    // Redirect to Input page
    navigate('/Input1');
  };

  const handleDownloadFile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'updatedSourcecode.html');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <h1>Generate Solution Page</h1>
      
      <button onClick={handleInputPage}>Input Page</button>
      <button onClick={handleDownloadFile}>Download Updated Source Code</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default GenerateSolution;
