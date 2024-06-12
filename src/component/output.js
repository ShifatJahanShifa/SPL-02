import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './output.css';
import { useNavigate } from 'react-router-dom';

function Output() {
    const [logs, setLogs] = useState([]);
    const [stat, setStat] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/output`);
            console.log('Received Logs and Stats from backend:', response.data);
            setLogs(response.data.logs);
            setStat(response.data.stat);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching logs and stats:', error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Redirect to home page on logout
        navigate('/');
    };

    const openHtmlCodeInBrowser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/viewError`, {
                responseType: 'blob', // Tell axios to treat the response as a blob
            });

            // Create a URL for the blob object received from the backend
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/html' }));
            
            // Open the URL in a new tab
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error fetching HTML code:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (logs.length === 0 || stat.length === 0) {
        return <div>Report Loading....</div>;
    }

    return (
        <div id="out">
            <h2>Accessibility Report:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rules Violations</th>
                        <th>No of Violations</th>
                    </tr>
                </thead>
                <tbody>
                    {stat.map((innerArray, outerIndex) => (
                        innerArray.map((item, innerIndex) => (
                            <tr key={`${outerIndex}-${innerIndex}`}>
                                <td><a href="">{item.ruleName}</a></td>
                                <td>{item.num}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
            
            <button onClick={openHtmlCodeInBrowser}>View HTML Code</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Output;
