import cardMouseMoveEffect from './card.js';
import { debounce } from './utilites.js';
import {
  renderResultSearchCard,
  fetchWeather,
  searchResult,
} from './render.js';

const search = document.getElementById('search');
fetchWeather();
const resultData = [
  {
    center: [55, -35],
    place_name: 'Gaza',
  },
  {
    center: [55, -35],
    place_name: 'Gaza',
  },
  {
    center: [55, -35],
    place_name: 'Gaza',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  cardMouseMoveEffect();
  let resultCards;
  search.addEventListener(
    'input',
    debounce((e) => {
      e.preventDefault();
      // fetch(`/weather?address=${e.target.value}`).then((res) => {
      //   res.json().then((data) => {
      //     if (data.err) {
      //       console.log(data.error);
      //     } else {
      searchResult.classList.add('block');

      if (e.target.value === '') {
        searchResult.classList.remove('block');
      }

      renderResultSearchCard(resultData);
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
      //     }
      //   });
      // });
    }, 1000),
  );
});
