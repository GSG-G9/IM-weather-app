import { days } from './utilites.js';

const searchResult = document.getElementById('search_result');
const cityName = document.querySelector('.city-name');
const countryName = document.querySelector('.country-name');
const cardClock = document.querySelector('.card--header--title_clock h2');
const dailyTempContainer = document.getElementById('card_daily_temp');
const todayTemp = document.querySelector('.card--header--temp_Value');
const weatherIconImg = document.querySelector('.card--header--temp_icon img');

const data = {
  countryName: 'Palestine',
  placeName: 'Gaza',
  temperature: '20',
  icon: 'fog',
};

const dataDaily = [
  {
    time: 15556565656565,
    temperatureMax: 20.555,
    temperatureMin: 15.25556,
    icon: 'sunny',
  }, {
    time: 15556565656565,
    temperatureMax: 20.555,
    temperatureMin: 15.25556,
    icon: 'sunny',
  }, {
    time: 15556565656565,
    temperatureMax: 20.555,
    temperatureMin: 15.25556,
    icon: 'sunny',
  }, {
    time: 15556565656565,
    temperatureMax: 20.555,
    temperatureMin: 15.25556,
    icon: 'sunny',
  },
];

function fetchWeather(placeName) {
  // fetch(`/weather?address=${placeName}`).then((res) => {
  //   res.json().then((data) => {
  //     if (data.error) {
  // alertWarningData.classList.remove('temp-error');
  // alertWarningData.classList.add('block');
  // alertWarningData.textContent = data.error;
  // } else {
  // alertWarningData.classList.add('temp-error');
  // alertWarningData.classList.remove('block');
  // summary.classList.remove('loading');
  cityName.classList.remove('loading');
  todayTemp.classList.remove('loadingCol');

  // precipProbability.parentElement.childNodes[0].textContent = 'Precipitation: ';
  // humidity.parentElement.childNodes[0].textContent = 'Humidity: ';
  // windSpeed.parentElement.childNodes[0].textContent = 'Wind: ';

  // precipProbability.parentElement.classList.remove('loading');
  // humidity.parentElement.classList.remove('loading');
  // windSpeed.parentElement.classList.remove('loading');
  // timeClock.classList.remove('loading');
  // dayNameElmt.classList.remove('loading');

  todayTemp.textContent = `${Math.round(data.temperature)}°C`;
  // summary.textContent = data.summary;
  // maxTemp.textContent = Math.round(data.maxTemp);
  // minTemp.textContent = Math.round(data.minTemp);
  countryName.textContent = data.countryName;
  cityName.textContent = `${data.placeName} - `;
  // precipProbability.textContent = `${Math.round(
  //   data.precipProbability * 100,
  // )}%`;
  // humidity.textContent = `${Math.round(data.humidity * 100)}%`;

  weatherIconImg.setAttribute('src', `images/weathericons/${data.icon}.png`);
  weatherIconImg.setAttribute('alt', data.icon);

  // windSpeed.textContent = data.windSpeed;

  // dayNameElmt.textContent = `${
  //   days[new Date(data.timeNow * 1000).getDay()]
  // }`;
  cardClock.textContent = `${new Date(+`${Date.now()}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })} ${new Date(+`${Date.now()}000`).getHours() >= 12 ? 'PM' : 'AM'}`;
  // cardClock.textContent = 'dfdfdfdf';

  // let loading = false;
  // console.log(typeof data.daily);
  if (!dataDaily) {
    // loading = true;
    // const loadingImg = document.createElement("img");
    // loadingImg.setAttribute("src", `img/loadingimg/loading.webp`);
    // dailyTempContainer.appendChild(loadingImg);
  }
  renderDailyWeather(dataDaily);
  //     }
  //   });
  // });
}

// Render Daily Temp To DOM
function renderDailyWeather(dailyWeatherArray) {
  while (dailyTempContainer.hasChildNodes()) {
    dailyTempContainer.removeChild(dailyTempContainer.lastChild);
  }
  //   const a = `
  //   <div class="card--content--daily">
  //   <div class="card--content--daily_date">Saturday 30</div>
  //   <div class="card--content--daily_temp">
  //     <span class="icon"
  //       ><img
  //         src="./images/weathericons/partly-cloudy-day.png"
  //         alt=""
  //     /></span>
  //     <span class="temp_max">30<sup>&deg;</sup></span>
  //     <span class="temp_min">15<sup>&deg;</sup></span>
  //   </div>
  // </div>
  //   `;
  dailyWeatherArray.forEach((item) => {
    console.log(item);
    // Div Element Container For All Daily Temp Element
    const dayContainerDiv = document.createElement('div');
    dayContainerDiv.setAttribute('class', 'card--content--daily');

    // Div Element To Day Name Text
    const dayNameDiv = document.createElement('div');
    dayNameDiv.setAttribute('class', 'card--content--daily_date');
    dayNameDiv.textContent = `${days[new Date(+`${Date.now()}`).getDay()]} ${new Date(+`${Date.now()}`).getDate()}`;

    // Div Element To Max And Min In Each Day
    const cardContentDailTemp = document.createElement('div');
    cardContentDailTemp.setAttribute('class', 'card--content--daily_temp');

    // Div Element For Icon Image
    const dayIconDiv = document.createElement('div');
    dayIconDiv.setAttribute('class', '');
    const dayIconImg = document.createElement('img');
    dayIconImg.setAttribute('src', `img/weathericons/${item.icon}.png`);
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

    //   searchResult.innerHTML += `<div class="result-card p-1 px-3" data-place-name="${
    //     item.place_name.split(', ')[0]
    //   }" data-lat="${item.center[1]}" data-long="${item.center[0]}" data-id="${
    //     item.id
    //   }">
    //     <div class="result-card__header py-1">
    //       <span class="result-place-name">${item.place_name}</span>
    //     </div>
    //     <div class="result-card--details py-1">
    //       <i class="fas fa-map-marker-alt"></i>
    //       Lat: <span class="result-card--details__lat">${item.center[1].toFixed(
    //   3,
    // )}</span>
    //       Long: <span class="result-card--details__long">${item.center[0].toFixed(
    //   3,
    // )}</span>
    //     </div>
    //   </div>`;
  });
};

export { renderResultSearchCard, fetchWeather, searchResult };
