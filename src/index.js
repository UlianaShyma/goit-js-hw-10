import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import {
  createMarkupCountryList,
  createMarkupCountryInfo,
} from './js/templates';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

function onSearch(e) {
  const name = e.target.value.trim();
  clearCountryList();
  clearCountryInfo();

  if (!name) {
    clearCountryList();
    clearCountryInfo();
    return;
  }

  fetchCountries(name).then(renderMarkup).catch(onErrorCatch);
}

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function renderMarkup(countries) {
  clearCountryInfo();
  clearCountryList();
  if (countries.length === 1) {
    countryInfo.innerHTML = createMarkupCountryInfo(countries);
    return;
  }

  if (countries.length >= 2 && countries.length <= 10) {
    clearCountryInfo();
    countryList.innerHTML = createMarkupCountryList(countries);
    return;
  }

  if (countries.length > 10) {
    clearCountryList();
    clearCountryInfo();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
}

function clearCountryList() {
  return (countryList.innerHTML = '');
}

function clearCountryInfo() {
  return (countryInfo.innerHTML = '');
}

function onErrorCatch(err) {
  if (err.message === '404') {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}
