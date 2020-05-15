const search = document.querySelector("#searchInput");
const rootElm = document.querySelector("#root");
const backButton = document.querySelector("#backButton");
const url = `https://restcountries.eu/rest/v2/all`;
const modeMain = document.querySelector("#modeMain");
const modeName = document.querySelector(".modeName");
const formatNumber = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
 
// setup 
window.onload = setup;
let allData = null
function setup() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => 
    makePageForCountries(data)
    )
    .catch((error) => console.log(error));
}

//get border countries
// alphaCodes is the array of objects of countries,each object is the name and alphaCode3 of each country
const alphaCodes = [];
function getAlphaCodes(country) {
  alphaCodes.push({ name: country.name, alphaCode: country.alpha3Code });
}


// make main page
function makePageForCountries(data) {
  allData = data
  for (let i = 0; i < data.length; i++) {
    let divResponsive = document.createElement("div");
    divResponsive.className +=
      "col-7  mx-auto col-sm-9  col-md-6 col-lg-3 col-xl-3 mb-sm-2 mb-md-2 mt-md-3 mb-lg-3 mt-lg-3 p-2 page";
    let countryCard = document.createElement("div");
    countryCard.className = "card mt-4 mx-auto";
    countryCard.addEventListener("click", () => {
      displayInfo(data[i]);
    });
    getAlphaCodes(data[i]);
    let imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer"
    let flag = document.createElement("img");
    flag.className = "card-img-top";
    flag.src = data[i].flag;
    let countriesInfo = document.createElement("div");
    countriesInfo.className = "card-body";
    let countryName = document.createElement("p");
    countryName.className = "card-title font-weight-bold";
    countryName.innerHTML = data[i].name;
    let population = document.createElement("p");
    population.className = "card-text";
    population.innerHTML =
      "Population: " + formatNumber(data[i].population);
    let region = document.createElement("p");
    region.className = "card-text";
    region.innerHTML = "Region: " + data[i].region;
    let capital = document.createElement("p");
    capital.className = "card-text";
    capital.innerHTML = "Capital: " + data[i].capital;
    backButton.style.display = "none";
    imageContainer.appendChild(flag)
    countryCard.appendChild(imageContainer);
    countriesInfo.appendChild(countryName);
    countriesInfo.appendChild(population);
    countriesInfo.appendChild(region);
    countriesInfo.appendChild(capital);
    countryCard.appendChild(countriesInfo);
    divResponsive.appendChild(countryCard);
    rootElm.appendChild(divResponsive);
  }
}

// make the page Info for each country
function displayInfo(country) {
  document.querySelector("#show").style.display = "none";
  document.querySelector("#find-countries").style.display = "none";
  backButton.style.display = "block";
  document.querySelector("#info ").style.display = "block ";
  const countryInfo = document.querySelector("#info");
  const infoBody = countryInfo.querySelector("#info-body");
  const countryImage = countryInfo.querySelector("img");
  countryImage.className = "countryImg";
  countryImage.src = country.flag;
  let nameOfCountry = getNameOfCountryBorders(country);
  infoBody.innerHTML = `
        <h5 class="mt-xs-4 pt-sm-4 mt-sm-4 mt-md-3 mt-lg-3">
        ${country.name}
        </h5>
        <div class="mt-sm-5 d-flex justify-content-between">
        <div class="ml-sm-0 mr-sm-4 mr-md-1 col-sm-4 country-details" id="country-details">
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        </div>
        <div class = " d-flex flex-column  col-sm-6" >
        <p class = "d-flex">
            <strong id="details-right" class="mr-1">Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p class = " d-flex">
            <strong id="details-right">Currencies:</strong>
            ${country.currencies.map((currency) => currency.code)}
        </p>
        <p class = "d-flex">
            <strong id="details-right">Languages:</strong>
            <p class="flex-sm-column">${country.languages.map((language) => language.name)}</p>
        </p>
        </div>
        </div>
        <div class="col-12">
        <p class="d-flex d-lg-inline-flex mr-lg-0 col-lg-4 mt-sm-2 mr-sm-2 mb-sm-0"> <strong class="borders">Border Countries:</strong> </p>
        <span class="col-lg-6 mt-sm-1 mt-md-0 d-sm-flex flex-md-column flex-lg-row d-lg-inline-flex">${nameOfCountry}</span>
        </div>
    `;
}


// search Input
search.addEventListener("input", findCountry);
function findCountry() {
  const inputValue = search.value.toLowerCase();
  const pages = document.querySelectorAll(".page");
  pages.forEach((element) => {
    if (element.innerText.toLowerCase().includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}


// filter by continent
const menu = document.querySelector(".dropdown-menu");
const continents = document.querySelectorAll(".dropdown-item");
// we can use foreach for nodeLists
continents.forEach((menu) => {
  menu.addEventListener("click", () => {
    const value = menu.innerText;
    // NodeLists of the whole page,each nodeList is one country
    const countryRegion = document.querySelectorAll(".page");
    countryRegion.forEach((region) => {
      if (region.innerText.includes(value)) {
        region.style.display = "block";
      } else if (value == "All") {
        region.style.display = "block";
      } else {
        region.style.display = "none";
      }
    });
  });
});


//mode Switch
modeMain.addEventListener("click",showMode);
function showMode(){
  changeMode(modeName.textContent == "Dark Mode");
}
function changeMode(conditionOfMode) {
  if(conditionOfMode) {
    document.documentElement.className = "mode-dark navLink navbarDropdown";
    modeName.textContent = "Light Mode";
  } else {
    document.documentElement.className = "mode-light";
    modeName.textContent = "Dark Mode";
  }
}


// back button
backButton.addEventListener("click", () => {
  backButton.style.display = "none";
  document.querySelector("#info").style.display = "none";
  document.querySelector("#find-countries").style.display = "block";
  document.querySelector("#show").style.display = "block";

});


// country borders
function getNameOfCountryBorders(country) {
  let nameArr = [];
  countryBorderCodes = country.borders
  alphaCodes.forEach((element) => {
    if(countryBorderCodes.includes(element.alphaCode.toUpperCase())){
      nameArr.push(
        `<button type="button" class="mr-1 btn btn-sm btn-outline-dark" 
        onclick='showNewCountry("${element.name}")' >
        <p class="content pt-1">${element.name}</p></button>`
       );
    }
  })

  if (nameArr.length === 0) {
    return "NO BORDERS";
  }
  join = nameArr.join("");
  return join ;
} 

function showNewCountry(nameOfCountry){
  newCountry = null
   allData.forEach(element => {
    if (element.name === nameOfCountry){
      newCountry = element
    } 
  })
  
  displayInfo(newCountry)
}
