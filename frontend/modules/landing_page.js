import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  console.log("In fetchCities call")
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  let citiesList = fetch(config.backendEndpoint+"/cities").then((response) => response.json()).catch(error => null);

  return citiesList
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let childElem = document.createElement("div");
  childElem.className = "col-lg-3 col-md-4 col-sm-6 gy-3 my-3"
  childElem.innerHTML=
`
<a href="pages/adventures/?city=${id}" id="${id}">
<div class="tile">
<div class="tile-text text-white text-center">
<h5>${city}</h5>
<p>${description}</p>
</div>
<img src="${image}" alt="${city}">
</div>
</a>
`;
 document.getElementById("data").append(childElem)
}

export { init, fetchCities, addCityToDOM };
