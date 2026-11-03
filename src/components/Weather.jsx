import { useEffect, useRef, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": "/clear.png",
    "01n": "/clear.png",

    "02d": "/clouds.png",
    "02n": "/clouds.png",
    "03d": "/clouds.png",
    "03n": "/clouds.png",

    "04d": "/drizzle.png",
    "04n": "/drizzle.png",

    "09d": "/rain.png",
    "09n": "/rain.png",
    "10d": "/rain.png",
    "10n": "/rain.png",

    "13d": "/snow.png",
    "13n": "/snow.png",
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
          <img src="/search.png" alt="search_icon" />
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
            <img src="/humidity.png" alt="humidity_icon" />

            <div>
              <p className="humidity">{weatherData.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>

          <div className="col">
            <img src="/wind.png" alt="humidity_icon" />

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
