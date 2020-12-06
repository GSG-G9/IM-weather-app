const fetch = require('node-fetch');

const fetchWeatherData = (req, res, next) => {
  const { lat, long } = req.query;
  const weatherUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${long}?units=si&lang=ar`;

  return fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        const error = new Error();
        error.status = data.code;
        error.msg = data.error;
        throw error;
      }

      const { currently, hourly, daily } = data;

      const {
        time: todayTime,
        summary: todaySummary,
        icon: todayIcon,
        temperature: todayTemperature,
      } = currently;

      const hourlayData = hourly.data.map((element) => {
        const { time, icon, temperature } = element;
        return { time, icon, temperature };
      });

      const dailyData = daily.data.map((element) => {
        const {
          time, icon, temperatureMax, temperatureMin,
        } = element;
        return {
          time, icon, temperatureMax, temperatureMin,
        };
      });

      const d = new Date(Date.now());
      const crrHour = d.getHours();

      const subDailyHours = hourlayData.filter((item) => {
        const date = new Date(+`${item.time}000`);
        const houre = date.getHours();
        return item ? houre >= crrHour : null;
      }).splice(1, 7);

      const collectionData = {
        todayTime,
        todaySummary,
        todayIcon,
        todayTemperature,
        hourlyData: subDailyHours,
        dailyData,
      };

      res.status(200).json(collectionData);
    })
    .catch((err) => next(err));
};

module.exports = { fetchWeatherData };
