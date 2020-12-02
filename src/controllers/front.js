const { fetchData } = require('./weatherData');

const serveFront = (req, res) => {
  fetchData().then((data) => {
    res.json(data);
  });
};
module.exports = { serveFront };
