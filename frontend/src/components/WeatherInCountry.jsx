import weatherService from "../services/openweathermap.js";
import { useEffect, useState } from "react";

const loadWeatherForCountry = (country, setWeather) => {
  if (!country) {
    return () => setWeather(null);
  }
  const [lat, long] = country.capitalInfo.latlng;
  const weather = weatherService.getWeatherForCoordinates(lat, long);
  weather.then((weather) => {
    console.log(weather);
    setWeather(weather);
  });
  return () => setWeather(null);
};
export const WeatherInCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => loadWeatherForCountry(country, setWeather), [country]);

  if (!country) {
    return null;
  }
  if (weather === null) {
    return <div>Loading weather...</div>;
  }

  const city = country.capital[0];
  const district = weather.name;
  const temperature = weather.main.temp;
  const weatherIcon = weatherService.getWeatherIconUrl(weather);
  const weatherDescription = weather.weather[0].description;
  const wind = weather.wind.speed;
  const windKmh = Math.round(wind * 3.6);

  return (
    <div>
      <h2>
        Weather in {city}, {district}
      </h2>
      Temperature {temperature}&deg;C
      <br />
      <img src={weatherIcon} alt={weatherDescription} width="200" />
      <br />
      Wind {wind} m/s ({windKmh} km/h)
    </div>
  );
};
