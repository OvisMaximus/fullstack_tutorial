import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const imgUrl = 'http://openweathermap.org/img/wn/'
const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeatherForCoordinates = (lat, lon) => {
  const url = `${baseUrl}&appid=${api_key}&lat=${lat}&lon=${lon}`
  const request = axios.get(url)
  return request.then(response => response.data)
}
const getWeatherIconUrl = (weather) => {
  const iconId = weather.weather[0].icon
  return `${imgUrl}${iconId}@2x.png`
}

export default { getWeatherForCoordinates, getWeatherIconUrl }