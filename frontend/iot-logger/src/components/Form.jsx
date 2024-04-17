import React, { useState } from 'react';
import axios from 'axios';
import StatsTable from './StatsTable';
import HorizontalBarChart from './HorizontalBarChart'; // Import the HorizontalBarChart component

const Form = () => {
    // State variables for start date, end date, frequency, and response data
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [stats, setStats] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Make a POST request with query parameters
            const response = await axios.post('http://localhost:9000/data', null, {
                params: {
                    start: startDate,
                    end: endDate,
                    frequency: frequency
                }
            });
            setResponseData(response.data.machine_data);
            setStats(response.data.stats);
            // Handle response data as needed
        } catch (error) {
            console.error('Error:', error);
            // Handle error as needed
        }
    };

    return (
        <div>
            <h1>Enter Details:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="startDate">Start Date:</label>
                <input type="datetime-local" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                <label htmlFor="endDate">End Date:</label>
                <input type="datetime-local" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <label htmlFor="frequency">Frequency:</label>
                <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                </select>

                <button type="submit">Submit</button>
            </form>

            <div className='statstable' >
                <h2>Statistics</h2>
                {stats && <StatsTable stats={stats} />}
            </div>

            {responseData && <div>
                <h2>Horizontal Bar Chart:</h2>
                <HorizontalBarChart data={responseData} />
            </div>}

        </div>
    );
};

export default Form;
