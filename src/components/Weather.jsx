import { useEffect, useRef, useState } from "react";
import clear_icon from "../assets/clear.png";
import clouds_icon from "../assets/clouds.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import search_icon from "../assets/search.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,

    "02d": clouds_icon,
    "02n": clouds_icon,
    "03d": clouds_icon,
    "03n": clouds_icon,

    "04d": drizzle_icon,
    "04n": drizzle_icon,

    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,

    "13n": snow_icon,
    "13d": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name...");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || "/clear.png";

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("Yangon");
  }, []);

  return (
    <>
      <div className="search">
        <input
          ref={inputRef}
          type="text"
          placeholder="enter city name"
          spellCheck="false"
        />
        <button onClick={() => search(inputRef.current.value)}>
          <img src={search_icon} alt="search_icon" />
        </button>
      </div>

      <div className="weather">
        <img
          src={weatherData.icon}
          className="weather-icon"
          alt="weather_icon"
        />
        <h1 className="temp">{weatherData.temperature}°c</h1>
        <h2 className="city">{weatherData.location}</h2>

        <div className="details">
          <div className="col">
            <img src={humidity_icon} alt="humidity_icon" />

            <div>
              <p className="humidity">{weatherData.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>

          <div className="col">
            <img src={wind_icon} alt="humidity_icon" />

            <div>
              <p className="wind">{weatherData.windSpeed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
