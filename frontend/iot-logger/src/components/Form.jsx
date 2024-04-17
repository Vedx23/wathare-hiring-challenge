import React, { useState } from 'react';
import axios from 'axios';
import StatsTable from './StatsTable';
import HorizontalBarChart from './HorizontalBarChart';

const Form = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [stats, setStats] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/data', null, {
                params: {
                    start: startDate,
                    end: endDate,
                    frequency: frequency
                }
            });
            setResponseData(response.data.machine_data);
            setStats(response.data.stats);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container'>
            <div className='flex items-center justify-between flex-col'>
                <div>
                    <h1 className="text-3xl m-4">Enter Details</h1>
                    <form onSubmit={handleSubmit} className='form-control'>
                        <label htmlFor="startDate" className='badge badge-accent badge-lg '>Start Date:</label>
                        <br />
                        <input type="datetime-local" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='input-md border-2 rounded-md border-black' />
                        <br />
                        <label htmlFor="endDate" className='badge badge-accent badge-lg '>End Date:</label>
                        <br />
                        <input type="datetime-local" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='input-md border-2 rounded-md border-black' />
                        <br />
                        <label htmlFor="frequency" className='badge badge-accent badge-lg '>Frequency:</label>
                        <br />
                        <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} className='select-md border-2 rounded-md border-black'>
                            <option value="seconds">Seconds</option>
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                        </select>
                        <br />
                        <button type="submit" className='btn btn-accent border-2 rounded-md hover:border-2 hover:rounded-md '>Submit</button>
                    </form>
                </div>
                <div className='container'>
                    {stats && <StatsTable stats={stats} />}
                </div>
            </div>

            {responseData &&
                <div className='container'>
                    <HorizontalBarChart data={responseData} />
                </div>}

        </div>
    );
};

export default Form;
