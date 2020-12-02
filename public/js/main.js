import cardMouseMoveEffect from './card.js';
import { debounce } from './utilites.js';
import {
  renderResultSearchCard,
  fetchWeather,
  searchResult,
} from './render.js';

const search = document.getElementById('search');

if (!localStorage.get('weather')) {
  localStorage.set('weather', 'gaza');
}

document.addEventListener('DOMContentLoaded', () => {
  // search.value = localStorage.getItem('weather');
  cardMouseMoveEffect();
  let resultCards;
  search.addEventListener(
    'input',
    debounce((e) => {
      e.preventDefault();
      fetch(`/weather?address=${e.target.value || localStorage.get('weather')}`).then((res) => {
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
