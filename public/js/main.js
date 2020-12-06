/* eslint-disable import/extensions */
import cardMouseMoveEffect from './card.js';
import { debounce } from './utilites.js';
import {
  renderResultSearchCard,
  fetchWeather,
  searchResult,
} from './render.js';

const search = document.getElementById('search');
let placeName = {};

if (!localStorage.getItem('weatherApp')) {
  document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem(
      'weatherApp',
      JSON.stringify({
        lat: 31.5, long: 34.4667, cityName: 'Gaza', countryName: 'Palestine',
      }),
    );
    fetchWeather(JSON.parse(localStorage.getItem('weatherApp')));
  });
} else if (localStorage.getItem('weatherApp')) {
  placeName = JSON.parse(localStorage.getItem('weatherApp'));
  fetchWeather(placeName);
}

document.addEventListener('DOMContentLoaded', () => {
  // search.value = localStorage.getItem('weather');
  cardMouseMoveEffect();
  let resultCards;
  search.addEventListener(
    'input',
    debounce((e) => {
      e.preventDefault();
      if (!e.target.value.trim()) return;
      fetch(
        `/api/v1/geolocation?address=${
          e.target.value
        }`,
      ).then((res) => {
        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            searchResult.classList.add('block');

            if (e.target.value === '') {
              searchResult.classList.remove('block');
            }

            renderResultSearchCard(data);
            resultCards = document.querySelectorAll('.result-card');

            resultCards.forEach((item) => {
              // eslint-disable-next-line func-names
              item.addEventListener('click', function (evt) {
                evt.preventDefault();
                const locationCenter = {
                  lat: this.dataset.lat,
                  long: this.dataset.long,
                  cityName: this.dataset.cityname,
                  countryName: this.dataset.countryname,
                };
                fetchWeather(locationCenter);
                search.value = '';
                if (search.value === '') {
                  searchResult.classList.remove('block');
                }
              });
            });
          }
        });
      });
    }, 500),
  );
});

window.addEventListener('offline', () => {
  document.body.innerHTML = '<h1 class="offline">No connection...</h1>';
});
