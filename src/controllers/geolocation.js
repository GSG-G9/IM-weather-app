const fetch = require('node-fetch');

const geocode = (req, res, next) => {
  const { address } = req.query;
  const geolocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.ACCESS_TOKEN}`;
  fetch(geolocationUrl)
    .then((bulb) => bulb.json())
    .then((data) => {
      if (data.error) {
        const error = new Error();
        error.msg = data.error;
        error.status = 422;
        console.log(data.error);
        throw error;
      }
      const collectionData = data.features.map((item) => {
        const {
          id,
          text: cityName,
          place_name: placeName,
          center,
        } = item;
        return {
          id,
          cityName,
          countryName: placeName.split(', ').reverse()[0],
          center,
        };
      });

      return res.status(200).json(collectionData);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { geocode };
