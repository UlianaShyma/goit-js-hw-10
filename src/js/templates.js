export const createMarkupCountryList = countries => {
  return countries
    .map(({ flags, name }) => {
      return `<li><img src="${flags.svg}" alt="Flag of ${name.official}" width="60" height="40" <span>${name.official}</span></li>`;
    })
    .join('');
};

export const createMarkupCountryInfo = countries => {
  return countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<div>
      <img src="${flags.svg}" alt="flag of ${
        name.official
      }" width="60" height="40">
      <h2><b>${name.official}</b></h2></div>
     <p><b>Capital</b>: ${capital}</p>
     <p><b>Population</b>: ${population}</p>
     <p><b>Languages</b>: ${Object.values(languages).join(', ')}</p>`;
    })
    .join('');
};
