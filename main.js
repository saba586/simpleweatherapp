const containerApp = document.querySelector(".app");
const searchInput = document.querySelector(".weatherInput");
const clickButton = document.querySelector(".weatherButton");

const apiKey = "d0029f82094e340c711644502299789c";

const fetchData = async () => {
  const newInput = searchInput.value.trim();

  if (newInput === "") {
    alert("Please enter a city");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${newInput}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        alert("City not found");
      } else {
        alert("Something went wrong. Please try again.");
      }
      return;
    }

    const data = await response.json();

    const weatherCity = data.name;
    const weatherTemperature = data.main.temp;
    const weatherCountry = data.sys.country;
    const weatherDescription = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    document.querySelector(
      ".weatherCity"
    ).innerHTML = `City: ${weatherCity} <sup>${weatherCountry}</sup>`;
    document.querySelector(
      ".weatherTemp"
    ).textContent = `Temperature: ${weatherTemperature}°C`;
    document.querySelector(
      ".weatherDescription"
    ).textContent = `Description: ${weatherDescription}`;

    const weatherImgIcon = document.querySelector(".weatherIcon");
    weatherImgIcon.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  } catch (err) {
    console.log("Error: ", err); 
  }
};


clickButton.addEventListener("click", fetchData);
