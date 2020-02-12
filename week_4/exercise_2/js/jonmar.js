const apiUrl1 = "https://pokeapi.co/api/v2/pokemon/ditto/";
const apiUrl2 = "https://randomuser.me/api/";
const apiUrl3 = "https://api.rawg.io/api/games";

const wrapperDiv = document.querySelector(".wrapper");

const currentQueryString = document.location.search;

const giveMeQueryStrings = new URLSearchParams(currentQueryString);

let genre = giveMeQueryStrings.get("genre")
  ? giveMeQueryStrings.get("genre")
  : "action";

let pageNumber = giveMeQueryStrings.get("pageNumber")
  ? giveMeQueryStrings.get("pageNumber")
  : 1;

let pageSize = giveMeQueryStrings.get("pageSize")
  ? giveMeQueryStrings.get("pageSize")
  : 20;

const params = `?genre=${genre}&page=${pageNumber}&page_size=${pageSize}`;

const combinedApiUrl = apiUrl3 + params;

fetch(combinedApiUrl)
  .then(function(response) {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("oops error happened");
    }
  })
  .then(function(json) {
    const results = json;
    console.log(results);
    // pass in results array into function as an argument
    // getName(results);
    // getImage(results);
  })
  .catch(function(error) {
    console.log(error);
  });

// resultsArray is a parameter, waiting for
// and array to be passed in.
function getName(resultArray) {
  for (let i = 0; i < resultArray.length; i++) {
    let returnHTML = ``;
    let userFirstName = resultArray[i].name.first;
    let userLastName = resultArray[i].name.last;

    returnHTML += `${userFirstName} ${userLastName}`;

    let heading = document.createElement("h1");
    let addNameToFigure = wrapperDiv.appendChild(heading);
    addNameToFigure.innerHTML = returnHTML;
  }
}

function getImage(imageArray) {
  for (let i = 0; i < imageArray.length; i++) {
    let returnHTML = ``;
    let photo = imageArray[i].picture.large;

    returnHTML += `<img src="${photo}" />`;

    let photoDiv = document.createElement("figure");
    let addPhotoToDiv = wrapperDiv.appendChild(photoDiv);
    addPhotoToDiv.innerHTML = returnHTML;
  }
}
