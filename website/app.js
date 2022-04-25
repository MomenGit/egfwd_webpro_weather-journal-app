/* Global Variables */
// API URL
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
function constructUrl(base, zipCode, apiKey) {
  return base + zipCode + "&appid=" + apiKey;
}
// Personal API Key for OpenWeatherMap API
const apiKey = "6fcd533809c2f68547ee198c553aaae3&units=metric";

// Create a new date instance dynamically with JS
function getDate() {
  let d = new Date();
  let now = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  return now;
}
// Add eventlisteneres
document.getElementById("generate").addEventListener("click", generateData);

// fetch data from Weather API
const getWeatherData = async (url) => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const data = await request.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`${error}`);
    // appropriately handle the error
  }
};

// Async POST
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(`${error}`);
  }
};
// Async update UI
const updateUI = async () => {
  const request = await fetch("http://localhost:8080/all");
  try {
    const data = await request.json();
    console.log(data);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = `Temperature: ${Math.round(
      data.temp
    )} degrees`;
    document.getElementById("content").innerHTML = `Feelings: ${data.feelings}`;
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
  } catch (error) {
    console.log(`${error}`);
  }
};
// Chain async functions to fetch data from weather api then POST data to server then GET the resulting data
const postGet = async (url) => {
  await getWeatherData(url)
    .then((data = {}) => {
      postData("http://localhost:8080/uploadData", {
        temp: data.main.temp,
        date: getDate(),
        feelings: document.getElementById("feelings").value,
      });
    })
    .then(updateUI);
};
// Async function to generate data on click event
async function generateData() {
  let zipCode = document.getElementById("zip").value;
  console.log("Presssed");
  try {
    if (zipCode) {
      await postGet(constructUrl(baseURL, zipCode, apiKey));
    } else {
      alert("Enter a zip code");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}
