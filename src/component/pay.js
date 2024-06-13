import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pay() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const sendDataToBackend = async () => {
    if (Number(amount) !== 500) {
      setErrorMessage('Lifetime subscription amount is 500. Please enter 500.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, amount }),
      }).then((res) => res.json()).then((result)=>{
        window.location.replace(result.url);
        console.log(result);
      });

      if (response.ok) {
        console.log('Form data sent to the backend successfully');
        setEmail('');
        setName('');
        setAmount('');
        // Redirect to a confirmation or output page after sending data to backend
        navigate('/confirmation');
      } else {
        console.error('Failed to send form data to the backend');
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
    <div id="pay">
      <form>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        /> <br />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        /> <br />
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter the amount"
        /> <br />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="button" onClick={sendDataToBackend}>Submit</button>
      </form>
      <br />
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}

export default Pay;
