import React, { useEffect, useState } from 'react'
import './App.css'
import Loading from './Loading';

function Weather() {
  const [cityname, setCityname] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setCityname(e.target.value);
  };

  const handleSubmit = () => {
    const trimmed = cityname.trim();
    if (!trimmed) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setQuery(trimmed);
  };

  useEffect(() => {
    if (!query) return;
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=6dae0c680675edcbd02e5e03d95b8a81&units=metric`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        setWeather(data);
        setIcon(iconUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather()
  }, [query]);

  return (
    <section className='main'>
      <div className='Heading'>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <h1>Weather Report</h1>
        </div>
        <div className='container'>

          <input
            type="text"
            value={cityname}
            onChange={handleInput}
            placeholder="Enter city name"
          />
          <button type='submit' onClick={handleSubmit}  >
            {loading ? <Loading /> : "Check Weather"}
          </button>

        </div>
        {error && <div style={{ color: "red", fontSize: "18px" }}>{error}</div>}
        {weather && (
          <div className='weatherdata'>
            <p className='report'>{weather.name}</p>
            <p className='report'>{weather.main?.temp}°C</p>
            <p className='report'> {weather.weather?.[0]?.description}<img src={icon} alt='Weather icon' style={{ width: "80px", height: "80px" }} /></p>
            <p className='report'>Humidity: {weather.main?.humidity}%</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Weather;