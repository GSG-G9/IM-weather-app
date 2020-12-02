const router = require('express').Router();
const { fetchData } = require('../controllers/weatherData');

router.get('/search', fetchData);

module.exports = router;
