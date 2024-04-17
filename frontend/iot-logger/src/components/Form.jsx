import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    // State variables for start date, end date, frequency, and response data
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [responseData, setResponseData] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        debugger;
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
            setResponseData(response.data);
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
                    <option value="">Select...</option>
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                </select>

                <button type="submit">Submit</button>
            </form>

            {responseData && <div>
                <h2>Response Data:</h2>
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </div>}
        </div>
    );
};

export default Form;
