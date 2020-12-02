const fetch = require("node-fetch");

const fetchWeatherData = (latitude, longitude) => {
  const weatherUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}?units=si&lang=en`;
  return new Promise((resolve, reject) => {
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((info) => {
        if (info) {
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
          const allData = {
            hourlyWeather,
            dailyWeather,
          };
          resolve(allData);z
        } else {
          reject(info.message);
        }
      })
      .catch((err) => console.log(err));
  });
};

module.exports = { fetchWeatherData }