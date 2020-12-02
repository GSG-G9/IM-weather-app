const fetch = require('node-fetch');

const fetchWeatherData = (latitude, longitude, locationData) => {
  const weatherUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}?units=si&lang=ar`;

  return fetch(weatherUrl)
    .then((response) => response.json())
    .then((info) => {
      const hourlyWeather = info.hourly.data.map((item) => ({
        time: item.time,
        weather_status: item.summary,
        icon: item.icon,
        temperature: item.temperature,

      }));
      const toDayWeather = {
        ...hourlyWeather,
        time: info.currently.time,
        icon: info.currently.icon,
        temperature: info.currently.temperature,
      }
      const dailyWeather = info.daily.data.map((item) => ({
        time: item.time,
        weather_status: item.summary,
        icon: item.icon,
        max_temperature: item.temperatureMax,
        min_temperature: item.temperatureMin,

      }));
      // return [hourlyWeather, dailyWeather];
      return { toDayWeather, dailyWeather, locationData };
    })
    .catch((err) => console.log(err));
};

const fetchData = (address = 'gaza') => {
  const geolocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.ACCESS_TOKEN}`;

  return fetch(geolocationUrl)
    .then((response) => response.json())
    .then((data) => data.features)
    .then((centerData) => {
      // console.log(centerData);
      const [latitude, longitude] = centerData[0].center;
      return fetchWeatherData(latitude, longitude, centerData).then((d) => d);
    })
    .catch((err) => console.log(err));
};

module.exports = { fetchData };
