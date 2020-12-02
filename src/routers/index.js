const router = require('express').Router();
const { serveFront } = require('../controllers/front');

router.get('/frontdata', serveFront);
module.exports = router;
