const router = require('express').Router();
const { serveFront } = require('../controllers/front');

router.get('/weather', serveFront);
module.exports = router;
