const rootElm = document.querySelector("#root");
const url = `https://restcountries.eu/rest/v2/all`;

fetch (url)
  .then (response => response.json ())
  .then (data => makePageForCountries (data))
  .catch (error => console.log (error));

function makePageForCountries (countriesData) {
  const countries = countriesData;
  for (let i = 0; i < countries.length; i++) {
    let divResponsive = document.createElement("div");
    divResponsive.className += "col-sm-12 col-md-4 col-lg-3 mb-sm-2 mb-md-2 mt-md-3 mb-lg-3 mt-lg-3 p-2";
    let countryCard = document.createElement ('div');
    countryCard.className = 'card';
    let flag = document.createElement ('img');
    flag.className = 'card-img-top';
    flag.src = countries[i].flag;
    let countriesInfo = document.createElement ('div');
    countriesInfo.className = 'card-body';
    let countryName = document.createElement ('h5');
    countryName.className = 'card-title';
    countryName.innerHTML = countries[i].name;
    let population = document.createElement ('p');
    population.className = 'card-text';
    population.innerHTML = 'Population: ' + countries[i].population;
    let region = document.createElement ('p');
    region.className = 'card-text';
    region.innerHTML = 'Region: ' + countries[i].region;
    let capital = document.createElement ('p');
    capital.className = 'card-text';
    capital.innerHTML = 'Capital: ' + countries[i].capital;
    countryCard.appendChild (flag);
    countriesInfo.appendChild (countryName);
    countriesInfo.appendChild (population);
    countriesInfo.appendChild (region);
    countriesInfo.appendChild (capital);
    countryCard.appendChild (countriesInfo);
    divResponsive.appendChild(countryCard);
    rootElm.appendChild (divResponsive);
  }
}
