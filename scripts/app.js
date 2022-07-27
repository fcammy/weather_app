const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const icon = document.querySelector(".icon img");
const time = document.querySelector("img.time");

const updateUI = (data) => {
  const { cityDets, weather } = data;

  // update details template

  details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
            </div>`;

  // remove the d-none class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  // update day and night images and weather icon

  let timeSrc = weather.IsDayTime ? "/img/day.svg" : "/img/night.svg";

  time.setAttribute("src", timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // prevent default behavior
  e.preventDefault();
  // get city input value
  const city = cityForm.city.value.trim();
  // reset input value
  cityForm.reset();

  // update UI with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
