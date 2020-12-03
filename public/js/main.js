import cardMouseMoveEffect from './card.js';
import { debounce } from './utilites.js';
import {
  renderResultSearchCard,
  fetchWeather,
  searchResult,
} from './render.js';

const search = document.getElementById('search');
let placeName = '';

if (!localStorage.getItem('weatherApp')) {
  document.addEventListener('DOMContentLoaded', (e) => {
    localStorage.setItem('weatherApp', 'gaza');
    fetchWeather('gaza');
  });
} else if (localStorage.getItem('weatherApp')) {
  placeName = localStorage.getItem('weatherApp');
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
      fetch(`/weather?address=${e.target.value || localStorage.getItem('weather')}`).then((res) => {
        res.json().then((data) => {
          if (data.err) {
            console.log(data.error);
          } else {
            searchResult.classList.add('block');

            if (e.target.value === '') {
              searchResult.classList.remove('block');
            }

            renderResultSearchCard(data.locationData);
            resultCards = document.querySelectorAll('.result-card');

            resultCards.forEach((item) => {
              item.addEventListener('click', function (e) {
                fetchWeather(this.dataset.placeName);
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
