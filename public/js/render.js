// eslint-disable-next-line import/extensions
import { days } from './utilites.js';

const searchResult = document.getElementById('search_result');
const cityName = document.querySelector('.city-name');
const cardClock = document.querySelector('.card--header--title_clock h2');
const dailyTempContainer = document.getElementById('card_daily_temp');
const todayTemp = document.querySelector('.card--header--temp_Value');
const weatherIconImg = document.querySelector('.card--header--temp_icon img');
const errorEl = document.querySelector('.error');
const overlay = document.querySelector('.overlay');
const hourlyWeather = document.getElementById('hourly-weather');

cardClock.parentElement.classList.add('loading');
cityName.parentElement.classList.add('loading');

// Render Daily Temp To DOM
function renderDailyWeather(dailyWeatherArray) {
  while (dailyTempContainer.hasChildNodes()) {
    dailyTempContainer.removeChild(dailyTempContainer.lastChild);
  }
  dailyWeatherArray.forEach((item) => {
    // Div Element Container For All Daily Temp Element
    const dayContainerDiv = document.createElement('div');
    dayContainerDiv.setAttribute('class', 'card--content--daily');

    // Div Element To Day Name Text
    const dayNameDiv = document.createElement('div');
    dayNameDiv.setAttribute('class', 'card--content--daily_date');
    dayNameDiv.textContent = `${
      days[new Date(+`${item.time}000`).getDay()]
    } ${new Date(+`${item.time}000`).getDate()}`;

    // Div Element To Max And Min In Each Day
    const cardContentDailTemp = document.createElement('div');
    cardContentDailTemp.setAttribute('class', 'card--content--daily_temp');

    // Div Element For Icon Image
    const dayIconDiv = document.createElement('div');
    dayIconDiv.setAttribute('class', '');
    const dayIconImg = document.createElement('img');
    dayIconImg.setAttribute('src', `images/weathericons/${item.icon}.png`);
    dayIconDiv.appendChild(dayIconImg);
    const dayMaxTemp = document.createElement('span');
    const dayMinTemp = document.createElement('span');

    const supDegSympoleMin = document.createElement('sup');
    supDegSympoleMin.innerHTML = '&deg;';
    const supDegSympoleMax = document.createElement('sup');
    supDegSympoleMax.innerHTML = '&deg;';

    dayMaxTemp.setAttribute('class', 'temp_max');
    dayMaxTemp.setAttribute('id', 'max-temp');
    dayMaxTemp.textContent = Math.round(item.temperatureMax);
    dayMaxTemp.appendChild(supDegSympoleMax);

    dayMinTemp.setAttribute('class', 'temp_min');
    dayMinTemp.setAttribute('id', 'min-temp');
    dayMinTemp.textContent = Math.round(item.temperatureMin);
    dayMinTemp.appendChild(supDegSympoleMin);
    cardContentDailTemp.append(dayIconDiv, dayMaxTemp, dayMinTemp);

    // Append All Div Element To Container
    dayContainerDiv.append(dayNameDiv, cardContentDailTemp);

    dailyTempContainer.appendChild(dayContainerDiv);
  });
}

const renderHourlyWeather = (data) => {
  console.log(data);
  while (hourlyWeather.hasChildNodes()) {
    hourlyWeather.removeChild(hourlyWeather.lastChild);
  }
  data.forEach((element) => {
    const hourlyWeatherSubCard = document.createElement('div');
    hourlyWeatherSubCard.className = 'sub-card';

    const subCardHour = document.createElement('span');
    subCardHour.className = 'sub-card--hour';
    subCardHour.textContent = `${new Date(+`+${element.time}000`).toLocaleTimeString(
      [],
      {
        hour: '2-digit',
      },
    )} ${new Date(+`${element.time}000`).getHours() >= 12 ? 'PM' : 'AM'}`;

    const subCardTemp = document.createElement('span');
    subCardTemp.className = 'sub-card_temp';
    subCardTemp.innerHTML = `${Math.round(element.temperature)}<sup>&deg;</sup>`;

    const hourlyWeatherIconImg = document.createElement('img');
    hourlyWeatherIconImg.setAttribute(
      'src',
      `images/weathericons/${element.icon}.png`,
    );
    hourlyWeatherIconImg.setAttribute('alt', element.icon);

    hourlyWeatherSubCard.append(subCardHour, hourlyWeatherIconImg, subCardTemp);
    hourlyWeather.append(hourlyWeatherSubCard);
  });
};

function fetchWeather({
  lat, long, cityName: city, countryName,
}) {
  fetch(`/api/v1/weather?lat=${lat}&long=${long}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        errorEl.classList.remove('hidden');
        errorEl.classList.add('block');
      } else {
        overlay.remove();
        cardClock.parentElement.classList.remove('loading');
        cityName.parentElement.classList.remove('loading');

        errorEl.classList.remove('block');
        errorEl.classList.add('hidden');
        cityName.classList.remove('loading');
        todayTemp.classList.remove('loadingCol');

        todayTemp.textContent = `${Math.round(data.todayTemperature)}°C`;
        cityName.textContent = `${city} - ${countryName}`;
        weatherIconImg.setAttribute(
          'src',
          `images/weathericons/${data.todayIcon}.png`,
        );
        weatherIconImg.setAttribute('alt', data.todayIcon);
        cardClock.textContent = `${new Date(
          +`${Date.now()}`,
        ).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })} ${new Date(+`${Date.now()}000`).getHours() >= 12 ? 'PM' : 'AM'}`;
        renderDailyWeather(data.dailyData);
        renderHourlyWeather(data.hourlyData);
      }
    });
}

const renderResultSearchCard = (searchResultData) => {
  if (!searchResultData) {
    return;
  }
  // searchResult.innerHTML = '';
  while (searchResult.hasChildNodes()) {
    searchResult.removeChild(searchResult.lastChild);
  }
  searchResultData.forEach((item) => {
    const resultCard = document.createElement('div');
    resultCard.setAttribute('class', 'result-card');
    resultCard.setAttribute('data-lat', item.center[1]);
    resultCard.setAttribute('data-long', item.center[0]);
    resultCard.setAttribute('data-cityName', item.cityName);
    resultCard.setAttribute('data-countryName', item.countryName);

    const resultCardHeader = document.createElement('div');
    resultCardHeader.setAttribute('class', 'result-card__header');
    const resultPlaceName = document.createElement('span');
    resultPlaceName.setAttribute('class', 'result-place-name');
    resultCardHeader.textContent = `${item.cityName} ${
      item.countryName ? ` - ${item.countryName}` : ''
    }`;
    resultCardHeader.appendChild(resultPlaceName);

    const resultCardDetails = document.createElement('div');
    const placeIcon = document.createElement('i');
    placeIcon.setAttribute('class', 'fas fa-map-marker-alt');
    const lat = document.createElement('span');
    const long = document.createElement('span');
    lat.setAttribute('class', 'result-card--details__lat');
    lat.textContent = `lat: ${item.center[0]}`;
    long.setAttribute('class', 'result-card--details__long');
    long.textContent = `long: ${item.center[1]}`;

    resultCardDetails.append(placeIcon, lat, long);
    resultCard.append(resultCardHeader, resultCardDetails);
    searchResult.append(resultCard);
  });
};

export { renderResultSearchCard, fetchWeather, searchResult };
