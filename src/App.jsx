import { useState, useEffect } from "react";
import axios from "axios";
import WeatherDetails from "./components/WeatherDetails";
import Error from "./components/Error";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import cloudsunIcon from "./assets/cloud&sun.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import searchIcon from "./assets/search.png";
import stormtIcon from "./assets/storm.png";
import drizzleIcon from "./assets/drizzle.png";

const Loading = () => {
  return (
    <div className="container p-5 text-center text-secondary-emphasis">
      <p className="h3 font-monospace fst-italic text-success">Loading...</p>
    </div>
  );
};

function App() {
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(snowIcon);
  const [city, setCity] = useState(text);
  const [country, setCountry] = useState("IN");
  const [temp, setTemp] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudsunIcon,
    "02n": cloudsunIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": stormtIcon,
    "11n": stormtIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  useEffect(() => {
    ApiCall();
  }, []);

  const Search = (e) => {
    if (!e.key || e.key === "Enter") {
      ApiCall();
    }
  };

  const ApiCall = async () => {
    try {
      setLoading(true);
      const api = "8bd98f31c2397dab3489a3e20ff50e34";
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api}&units=Metric`
      );
      const data = res.data;
      const iconCode = data.weather[0].icon;
      setIcon(weatherIconMap[iconCode] || snowIcon);
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp(Math.floor(data.main.temp));
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 mt-2">
      <div className="bg-white rounded pt-4 px-2 custom-width">
        <div className="input-group">
          <input
            type="text"
            value={text}
            className="form-control"
            placeholder="Search City"
            aria-label="city"
            name="cityname"
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {
              Search(e);
            }}
          />
          <img
            src={searchIcon}
            className="input-group-text"
            alt=""
            width="60px"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              Search(e);
            }}
          />
        </div>
        {!error && !loading && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            lon={lon}
            humidity={humidity}
            wind={wind}
          />
        )}
        {loading && <Loading />}
        {error && <Error />}
      </div>
    </div>
  );
}

export default App;
