const router = require('express').Router();
const { serveFront } = require('../controllers/front');

router.get('/weather', serveFront);

router.use((error, req, res) => {
  const err = new Error();
  const msg = err.msg || 'something wrent!';
  const status = err.status || 500;
  res.status(status).json({ msg, status });
});

module.exports = router;
