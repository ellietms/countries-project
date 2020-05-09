const url = `https://restcountries.eu/rest/v2/all`;
fetch (url)
  .then (response => response.json ())
  .then (data => makePageForCountries (data))
  .catch (error => console.log (error));
const rootElm = document.querySelector("#root");

function makePageForCountries (countriesData) {
  const countries = countriesData;
  for (let i = 0; i < countries.length; i++) {
    let divResponsive = document.createElement("div");
    divResponsive.className += "col-sm-12 col-md-3 mb-sm-3 mb-md-3 mb-lg-3 p-2";
    let countryCard = document.createElement ('div');
    countryCard.className = 'card card-style ml-sm-3';
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
    
    //  from top 
    // const divResponsive = document.createElement("div");
    // const divCard = document.createElement("div");
    // const divBodyCard = document.createElement("div");
    // const divCardHeader = document.createElement("div");
    // divResponsive.className += "col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-sm-3 mb-md-3 mb-lg-3 p-2";
    // divCard.className += "card col-12   p-sm-1";
    // divBodyCard.className += "card-body col-12 p-sm-1";
    // const myHeader = document.createElement("h5");
    // myHeader.className +=
    //   "card-title border col-md-12 col-lg-12  p-sm-4 shadow p-sm-3 mb-5  text-light";
    // myHeader.textContent =  countries[i].name
    // const myImage = document.createElement("img");
    // myImage.src = countries[i].flag;
    // let population = document.createElement ('p');
    // population.className = 'card-text';
    // population.innerHTML = 'Population: ' + countries[i].population;
    // let region = document.createElement ('p');
    // region.className = 'card-text';
    // region.innerHTML = 'Region: ' + countries[i].region;
    // let capital = document.createElement ('p');
    // capital.className = 'card-text';
    // capital.innerHTML = 'Capital: ' + countries[i].capital;
    // myImage.classList.add("card-img-top");
    // divCardHeader.appendChild(myImage);
    // divBodyCard.appendChild(myHeader);
    // divBodyCard.appendChild(divCardHeader);
    // divBodyCard.appendChild(population);
    // divBodyCard.appendChild(region);
    // divBodyCard.appendChild(capital);
    // divCard.appendChild(divBodyCard);
    // divResponsive.appendChild(divCard);
    // rootElm.appendChild(divResponsive);
  }
}