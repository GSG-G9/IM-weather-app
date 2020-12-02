const searchResult = document.getElementById('search_result');
const cityName = document.querySelector('.city-name');
const countryName = document.querySelector('.country-name');
const cardClock = document.querySelector('.card--header--title_clock h2');

const data = {
  countryName: 'Palestine',
  placeName: 'Gaza',
};

function fetchWeather(placeName) {
  // fetch(`/weather?address=${placeName}`).then((res) => {
  // res.json().then((data) => {
  // if (data.error) {
  // alertWarningData.classList.remove('temp-error');
  // alertWarningData.classList.add('block');
  // alertWarningData.textContent = data.error;
  // } else {
  // alertWarningData.classList.add('temp-error');
  // alertWarningData.classList.remove('block');
  // summary.classList.remove('loading');
  cityName.classList.remove('loading');
  // temp.classList.remove('loadingCol');

  // precipProbability.parentElement.childNodes[0].textContent = 'Precipitation: ';
  // humidity.parentElement.childNodes[0].textContent = 'Humidity: ';
  // windSpeed.parentElement.childNodes[0].textContent = 'Wind: ';

  // precipProbability.parentElement.classList.remove('loading');
  // humidity.parentElement.classList.remove('loading');
  // windSpeed.parentElement.classList.remove('loading');
  // timeClock.classList.remove('loading');
  // dayNameElmt.classList.remove('loading');

  // temp.textContent = Math.round(data.temperature);
  // supSiSympole.textContent = '°C';
  // summary.textContent = data.summary;
  // maxTemp.textContent = Math.round(data.maxTemp);
  // minTemp.textContent = Math.round(data.minTemp);
  countryName.textContent = data.countryName;
  cityName.textContent = data.placeName;
  // precipProbability.textContent = `${Math.round(
  //   data.precipProbability * 100,
  // )}%`;
  // humidity.textContent = `${Math.round(data.humidity * 100)}%`;

  // weatherIconImg.setAttribute('src', `img/weathericons/${data.icon}.png`);
  // weatherIconImg.setAttribute('alt', data.icon);

  // windSpeed.textContent = data.windSpeed;

  // dayNameElmt.textContent = `${
  //   days[new Date(data.timeNow * 1000).getDay()]
  // }`;
  cardClock.textContent = `${new Date(
    +`${Date.now()}`,
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${
    new Date(+`${Date.now()}000`).getHours() >= 12 ? 'PM' : 'AM'
  }`;
  // cardClock.textContent = 'dfdfdfdf';

  // let loading = false;
  // console.log(typeof data.daily);
  // if (!data.daily) {
  //   loading = true;
  //   const loadingImg = document.createElement("img");
  //   loadingImg.setAttribute("src", `img/loadingimg/loading.webp`);
  //   dailyTempContainer.appendChild(loadingImg);
  // }
  // renderDailyWeather(data.daily.splice(0, 6));
  // }
  // });
  // });
}

const renderResultSearchCard = (searchResultData) => {
  if (!searchResultData) {
    return;
  }

  while (searchResult.hasChildNodes()) {
    searchResult.removeChild(searchResult.lastChild);
  }

  searchResultData.forEach((item) => {
    const resultCard = document.createElement('div');
    resultCard.setAttribute('class', 'result-card');
    resultCard.setAttribute('data-place-name', item.place);

    const resultCardHeader = document.createElement('div');
    resultCardHeader.setAttribute('class', 'result-card__header');
    const resultPlaceName = document.createElement('span');
    resultPlaceName.setAttribute('class', 'result-place-name');
    resultPlaceName.textContent = item.place_name;
    resultCardHeader.appendChild(resultPlaceName);

    const resultCardDetails = document.createElement('div');
    resultCardDetails.setAttribute('class', 'result-card--details');
    const placeIcon = document.createElement('i');
    placeIcon.setAttribute('class', 'fas fa-map-marker-alt');
    const lat = document.createElement('span');
    const long = document.createElement('span');
    lat.setAttribute('class', 'result-card--details__lat');
    lat.textContent = "lat: " + item.center[0];
    long.setAttribute('class', 'result-card--details__long');
    long.textContent = "long: " + item.center[1];
    
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
