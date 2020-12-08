const { geocode } = require('./geolocation');
const { fetchWeatherData } = require('./weatherData');
const { serverError } = require('./errors');

module.exports = {
  geocode,
  fetchWeatherData,
  serverError,
};
