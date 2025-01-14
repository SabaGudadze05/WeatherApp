// Declaring variables using DOMl;
const search = document.querySelector("#search");
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const clouds = document.querySelector("#clouds");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const form = document.querySelector("form");
const mainSection = document.querySelector("#main_section");
const searchIcon = document.querySelector("#search_icon");

// Creating variable of Api URL and ID

let id = `8631ac54f86b981ced7efebe15520864`;
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${id}`;

// Functions to get weather data from API;

const searchWeather = () => {
    fetch(`${url}&q=${search.value}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.cod === 200) {
                city.innerHTML = `
                    <figcaption>${data.name}</figcaption>
                    <img src="https://flagsapi.com/${data.sys.country}/shiny/32.png" />
                `;
                weatherValue();
                description.innerText = data.weather[0].description;
                clouds.innerText = `${data.clouds.all}%`;
                humidity.innerText = `${data.main.humidity}%`;
                pressure.innerText = `${data.main.pressure}hPa`;
            } else {
                errorFunction();
            }
            search.value = "";
        });
};

const weatherValue = () => {
    fetch(`${url}&q=${search.value}`)
        .then((response) => response.json())
        .then((data) => {
            temperature.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${
                data.weather[0].icon
            }@4x.png"alt="" />
            <figcaption>
                <span>${Math.round(data.main.temp)}</span>
                <sup>℃</sup>
            </figcaption>
            `;
        });
};
const errorFunction = () => {
    mainSection.classList.add("error");
    setTimeout(() => {
        mainSection.classList.remove("error");
    }, 1000);
};

const allFunction = () => {
    if (search.value !== "") {
        searchWeather();
    } else {
        errorFunction();
    }
};

// Adding function to events
form.addEventListener("submit", (e) => {
    e.preventDefault();
    allFunction();
});
searchIcon.addEventListener("click", allFunction);

// Default Value
const startUpApp = () => {
    search.value = "Tbilisi";
    searchWeather();
};
startUpApp();
