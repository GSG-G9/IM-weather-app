import { days } from './utilites.js';

const searchResult = document.getElementById('search_result');
const cityName = document.querySelector('.city-name');
const countryName = document.querySelector('.country-name');
const cardClock = document.querySelector('.card--header--title_clock h2');
const dailyTempContainer = document.getElementById('card_daily_temp');
const todayTemp = document.querySelector('.card--header--temp_Value');
const weatherIconImg = document.querySelector('.card--header--temp_icon img');

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
    dayNameDiv.textContent = `${days[new Date(+`${item.time}000`).getDay()]} ${new Date(+`${item.time}000`).getDate()}`;

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
    dayMaxTemp.textContent = Math.round(item.max_temperature);
    dayMaxTemp.appendChild(supDegSympoleMax);

    dayMinTemp.setAttribute('class', 'temp_min');
    dayMinTemp.setAttribute('id', 'min-temp');
    dayMinTemp.textContent = Math.round(item.min_temperature);
    dayMinTemp.appendChild(supDegSympoleMin);
    cardContentDailTemp.append(dayIconDiv, dayMaxTemp, dayMinTemp);

    // Append All Div Element To Container
    dayContainerDiv.append(dayNameDiv, cardContentDailTemp);

    dailyTempContainer.appendChild(dayContainerDiv);
  });
}

function fetchWeather(placeName) {
  fetch(`/weather?address=${placeName}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.toDayWeather);
        cityName.classList.remove('loading');
        todayTemp.classList.remove('loadingCol');

        todayTemp.textContent = `${Math.round(data.toDayWeather.temperature)}°C`;
        cityName.textContent = data.locationData[0].place_name;
        // cityName.textContent = `${data.placeName} - `;

        weatherIconImg.setAttribute('src', `images/weathericons/${data.toDayWeather.icon}.png`);
        weatherIconImg.setAttribute('alt', data.toDayWeather.icon);
        cardClock.textContent = `${new Date(+`${Date.now()}`).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })} ${new Date(+`${Date.now()}000`).getHours() >= 12 ? 'PM' : 'AM'}`;;
        renderDailyWeather(data.dailyWeather);
      }
    });
  });
}

const renderResultSearchCard = (searchResultData) => {
  if (!searchResultData) {
    return;
  }
  searchResult.innerHTML = '';
  searchResultData.forEach((item) => {
    const resultCard = document.createElement('div');
    resultCard.setAttribute('class', 'result-card');
    resultCard.setAttribute('data-place-name', item.place_name);

    const resultCardHeader = document.createElement('div');
    resultCardHeader.setAttribute('class', 'result-card__header');
    const resultPlaceName = document.createElement('span');
    resultPlaceName.setAttribute('class', 'result-place-name');
    resultCardHeader.textContent = item.place_name;
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
