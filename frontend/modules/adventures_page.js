import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let city = params.get("city"); // is the string "Jonathan"
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //id, category, image (URL), name, costPerHead and duration
  adventures.forEach((key) =>{
    let ele = document.createElement("div");
    ele.setAttribute('class','col-6 col-lg-3 mb-4');
    ele.innerHTML=
    ` 
    <a href ="detail/?adventure=${key.id}" id=${key.id}>
    <div class="activity-card">
    <img class="img-responsive activity-card-img" src="${key.image}"/>
    <div class="activiity-card-text text-md-center w-100 mt-3">
    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3" style="margin: 0 20px">
    <h5 class="text-left">${key.name}</h5>
    <p>${key.costPerHead} ${key.currency}</p>
    </div>
    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3" style="margin: 0 20px">
    <h5 class="text-left">Duration</h5>
    <p>${key.duration} Hours</p>
    </div>
    </div>
    </div>
    </div>
    </a>
    `
    document.getElementById("data").append(ele);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log("In filter by duration");

  const filters = { duration: `${low}-${high}` };
  return filterFunction(list, filters);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const filters = { category: categoryList };
  return filterFunction(list, filters);
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  var filtered = [];
  var refiltered = [];
  var filterApplied = false;

  if (filters.category && filters.category.length) {
    let filteredList = list.filter((adventure) =>
      filters.category.includes(adventure.category)
    );

    filteredList.forEach((element) => filtered.push(element));
    filterApplied = true;
  } else {
    list.forEach((item) => filtered.push(item));
  }

  console.log(filters.duration);
  if (filters.duration) {
    var low = filters.duration.split("-")[0];
    var high = filters.duration.split("-")[1];
    // let  filteredList = filtered.filter(adventure => (adventure.duration>=low && adventure.duration<=high ))

    filtered.forEach((adventure) => {
      if (adventure.duration >= low && adventure.duration <= high) {
        refiltered.push(adventure);
      } else {
      }
    });
    filterApplied = true;
    return refiltered;
  }

  // Place holder for functionality to work in the Stubs

  if (filterApplied) return filtered;
  else return filtered;

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = localStorage.getItem("filters");
  return JSON.parse(filters);

  // Place holder for functionality to work in the Stubs


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters.category.forEach((filter) => {
    var node = document.getElementById("category-list");
    var newChild = document.createElement("span");
    newChild.innerText = filter;
    node.appendChild(newChild);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
