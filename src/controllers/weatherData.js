const fetch = require('node-fetch');

const fetchWeatherData = (latitude, longitude) => {
  const weatherUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}?units=si&lang=ar`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((info) => {
      const hourlyWeather = info.hourly.data.map((item) => ({
        time: item.time,
        weather_status: item.summary,
        icon: item.icon,
        temperature: item.temperature,

      }));
      const dailyWeather = info.daily.data.map((item) => ({
        time: item.time,
        weather_status: item.summary,
        icon: item.icon,
        max_temperature: item.temperatureMax,
        min_temperature: item.temperatureMin,

      }));
      return [hourlyWeather, dailyWeather];
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const fetchData = () => {
  const geolocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/gaza.json?access_token=${process.env.ACCESS_TOKEN}`;

  fetch(geolocationUrl)
    .then((response) => response.json())
    .then((data) => data.features[0].center)
    .then((centerData) => {
      const [latitude, longitude] = centerData;
      fetchWeatherData(latitude, longitude);
    })
    .catch((err) => console.log(err));
};

module.exports = { fetchData };
