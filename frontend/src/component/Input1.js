/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './input.css';

function Input1() {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [selectedOption1, setSelectedOption1] = useState('A'); // State to store the selected option for the first dropdown menu
  const [selectedOption2, setSelectedOption2] = useState('A'); // State to store the selected option for the second dropdown menu
  const navigate = useNavigate(); // Get the navigate function

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file);
  };

  const handleDropdownChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  /*const sendDataToBackend = async () => {
    try {
      //console.log('input value is here:', inputValue);
      // Create a FormData object to send both the URL and the file to the backend
      const formData = new FormData();
      formData.append('url', inputValue);
      formData.append('file', selectedFile);
      formData.append('option1', selectedOption1); // Append the selected option for the first dropdown menu to the form data
      formData.append('option2', selectedOption2); 
      // Append the selected option for the second dropdown menu to the form data

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        //console.log('formata:',formData);
        console.log('input value is here:', inputValue);
        console.log('Data sent to the backend successfully');
        setInputValue('');
        setSelectedFile(null);
        // Redirect to Output page after sending data to backend
        navigate('/output1');
      } else {
        console.error('Failed to send data to the backend');
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };*/

  /*const sendDataToBackend = async () => {
    try {
      const formData = new FormData();
      
      // Append URL if provided
      if (inputValue) {
        formData.append('url', inputValue);
      }
      
      // Append file if provided
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      
      // Append options if needed
      formData.append('option1', selectedOption1);
      formData.append('option2', selectedOption2);
  
      // Send the request to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      // Handle response
      if (response.ok) {
        console.log('Data sent to the backend successfully');
        setInputValue('');
        setSelectedFile(null);
        navigate('/output1');
      } else {
        console.error('Failed to send data to the backend');
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };
  

  const handleLogout = () => {
    // Redirect to home page on logout
    navigate('/');
  };

  return (
    <div id="input" className="input-container">
      <h2>Generate Report</h2>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a URL..."
        />
        <select value={selectedOption1} onChange={handleDropdownChange1}>
          <option value="A">A</option>
          <option value="AA">AA</option>
        </select>
      </div>
      <div className="input-group">
        <input
          type="file"
          onChange={handleFileChange}
        />
        <select value={selectedOption2} onChange={handleDropdownChange2}>
          <option value="A">A</option>
          <option value="AA">AA</option>
        </select>
      </div>
      <button onClick={sendDataToBackend}>Generate Report</button> <br /> <br />
      <button onClick={handleLogout}>Logout</button> {/* Logout button */
      /*<p>You typed: {inputValue}</p>
      <p>Selected file: {selectedFile ? selectedFile.name : 'None'}</p>
      <p>Selected option 1: {selectedOption1}</p>
      <p>Selected option 2: {selectedOption2}</p>
    </div>
  );
}

export default Input1;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './input.css';

function Input1() {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState('A');
  const [selectedOption2, setSelectedOption2] = useState('A');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDropdownChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const sendDataToBackend = async () => {
    try {
      const formData = new FormData();
     
      if (inputValue) {
        formData.append('url', inputValue);
      }
     
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
     
      formData.append('option1', selectedOption1);
      formData.append('option2', selectedOption2);
 
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
 
      if (response.ok) {
        console.log('Data sent to the backend successfully');
        setInputValue('');
        setSelectedFile(null);
        navigate('/output1');
      } else {
        console.error('Failed to send data to the backend');
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div id="input" className="input-container">
      <h3>Subscribed User</h3>
      <h2>Generate Report</h2>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a URL..."
        />
        <select value={selectedOption1} onChange={handleDropdownChange1}>
          <option value="A">A</option>
          <option value="AA">AA</option>
        </select>
      </div>
      <div className="input-group">
        <input
          type="file"
          onChange={handleFileChange}
        />
        <select value={selectedOption2} onChange={handleDropdownChange2}>
          <option value="A">A</option>
          <option value="AA">AA</option>
        </select>
      </div>
      <div className="button-group">
        <button className="generate-button" onClick={sendDataToBackend}>Generate Report</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Input1;


