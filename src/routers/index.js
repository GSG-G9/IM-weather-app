const router = require('express').Router();
const { fetchData } = require('../controllers/weatherData');

router.get('/search?city=gaza', fetchData);

module.exports = router;
