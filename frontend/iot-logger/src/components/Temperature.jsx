import React, { useState } from 'react';
import axios from 'axios';

const WeatherData = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Make a GET request to the weather API with latitude and longitude parameters
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    appid: '45c038e32cmshde523a5cfbc27cbp1b8817jsn8888714102f1'
                }
            });
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
            setError('Error fetching weather data. Please check your input and try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="latitude">Latitude:</label>
                <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                
                <label htmlFor="longitude">Longitude:</label>
                <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />

                <button type="submit">Get Weather Data</button>
            </form>

            {error && <p>{error}</p>}

            {weatherData && (
                <div>
                    <h2>Weather Data</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Temperature</td>
                                <td>{weatherData.main.temp}°C</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{weatherData.main.humidity}%</td>
                            </tr>
                            <tr>
                                <td>Wind Speed</td>
                                <td>{weatherData.wind.speed} m/s</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WeatherData;
