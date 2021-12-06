import './css/styles.css';
import debounce from 'lodash.debounce'
import API from './js/fetchCountries.js'
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    const searchQuery = event.target.value.trim();
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    if (searchQuery) {
        API.fetchCountry(searchQuery)
            .then(data => {
                if (data.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    return;
                };
                if (data.length === 1) { renderCountryInfo(data) }
                else { renderCountryList(data) }
            })
            .catch(error => Notiflix.Notify.failure(`${error}`))
    }
    
};

function renderCountryList(data) {
    const countries = data.map(item => `<li><img width="35px" src='${item.flags.svg}'><span>${item.name.common}</span></li>`).join('');
    countryListEl.innerHTML = countries;
 }

 function renderCountryInfo(data) {
     const countrie = `
    <p class="box"><img width="100px" src='${data[0].flags.svg}'/><span class="header">${data[0].name.official}</span></p>
    <p class="box">Capital:<span>${data[0].capital}</span></p>
    <p class="box">Population:<span>${data[0].population}</span></p>
    <p class="box">Languages:<span>${Object.values(data[0].languages)}</span></p>
    `;
    countryInfoEl.innerHTML = countrie;
 }