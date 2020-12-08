const router = require('express').Router();

const { serverError, fetchWeatherData, geocode } = require('../controllers/index');

router.get('/weather', fetchWeatherData);

router.get('/geolocation', geocode);

router.use(serverError);

module.exports = router;
