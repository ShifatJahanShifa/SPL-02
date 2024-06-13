import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './output.css';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function Output() {
    const [logs, setLogs] = useState([]);
    const [stat, setStat] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        navigate('/');
    };

    const openHtmlCodeInBrowser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/viewError`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/html' }));
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

    const pieChartData = stat.map((innerArray) => ({
        name: innerArray[0].ruleName,
        value: innerArray[0].num
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div id="out">
            <h2>Accessibility Report:</h2>
            <table className="report-table">
                <thead>
                    <tr>
                        <th className="table-header">Rules Violations</th>
                        <th className="table-header">No of Violations</th>
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
            <div className="pie-chart-container">
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div className="button-container">
                <button onClick={openHtmlCodeInBrowser}>View HTML Code</button>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div>
            <ul>
            {logs.map((log, index) => (
                <li key={index}>
                {typeof log === 'string' ? (
                    log.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        <br />
                    </React.Fragment>
                    ))
                ) : (
                    JSON.stringify(log, null, 2).split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        <br />
                    </React.Fragment>
                    ))
                )}
                </li>
            ))}
           </ul>
            </div>
        </div>
    );
}

export default Output; 

