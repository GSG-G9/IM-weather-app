const { fetchData } = require('./weatherData');

const serveFront = (req, res) => {
  fetchData(req.query.address.split(',')[0]).then((data) => {
    res.json(data);
  });
};
module.exports = { serveFront };
