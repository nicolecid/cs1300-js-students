var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=gWcgTiVGEg0JdFsJ8KATBwED4Pt5k3W_olkfhmv68bE";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
        let data = JSON.parse(request.response);
        console.log(data);
        let addToPage = "";
        data.data.forEach(function (plant) {
            console.log(plant);
            addToPage += `<div class="plant">
                    <h1>${plant.common_name}</h1>
                    <h3>Scientific Name:${plant.scientific_name}</h3>
                    <h3>Family: ${plant.family}</h3>
                    <h3>Common Name: ${plant.family_common_name}</h3>
                    <h3>Genus: ${plant.genus}</h3>
                </div>`;
        });
        document.getElementById("body").innerHTML = addToPage;
    })
);