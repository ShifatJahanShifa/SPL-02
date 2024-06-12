import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './output1.css';
import { useNavigate } from 'react-router-dom';

function Output1() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/output`);
            console.log('Received Logs from backend:', response.data);
            setLogs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Redirect to home page on logout
        navigate('/');
    };

    const handleGenerateSolution = () => {
        // Redirect to solution generation page
        navigate('/GenerateSolution');
    };

    const handleInputPage = () => {
        // Redirect to Input page
        navigate('/Input1');
    };

    const handleGenerateRating = () => {
        // Redirect to rating generation page
        navigate('/GenerateRating');
    };

    if (loading) {
        return <div className="output-container">Loading...</div>;
    }

    if (logs.length === 0) {
        return <div className="output-container">Report Loading....</div>;
    }

    return (
        <div className="output-container">
            <nav className="nav-bar">
                <button className="nav-button" onClick={handleLogout}>Logout</button>
                <button className="nav-button" onClick={handleInputPage}>Input Page</button>
                <button className="nav-button" onClick={handleGenerateSolution}>Generate Solution</button>
                <button className="nav-button" onClick={handleGenerateRating}>Generate Rating</button>
            </nav>
            <h2>Accessibility Report:</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>{log}<br /></li>
                ))}
            </ul>
        </div>
    );
}

export default Output1;
