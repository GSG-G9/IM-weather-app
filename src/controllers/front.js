const { fetchData } = require('./weatherData');

const serveFront = (req, res, next) => {
  fetchData(req.query.address.split(',')[0]).then((data) => {
    res.json(data);
  }).catch(next);
};
module.exports = { serveFront };
