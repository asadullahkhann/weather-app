const weatherCardDiv = document.querySelector('.weather-card');
const addressPara = document.querySelector('.address > p');
const iconImg = document.querySelector('.weather-icon');
const currTempPara = document.querySelector('p.curr-temp');
const feelsLikePara = document.querySelector('p.feels-like');
const conditionsPara = document.querySelector('p.conditions');
const descriptionPara = document.querySelector('p.desc');
const humidityPara = document.querySelector('p.humidity');
const windSpeedPara = document.querySelector('p.wind-speed'); 
const statusSpan = document.querySelector('span#status');
const forecastDiv = document.querySelector('.forecast');
const errorMsgPara = document.querySelector('p.error-msg');
const celsiusBtn = document.querySelector('#celsius-btn');

function renderWeatherInfo(weatherInfo) {
  const iconsPath = './images/visualcrossing-icons-1st-set';
  const days = weatherInfo.days;
  errorMsgPara.classList = 'error-card hide';
  weatherCardDiv.classList = 'weather-card';
  statusSpan.textContent = '';
  addressPara.textContent = weatherInfo.address;
  iconImg.src = require(`${iconsPath}/${weatherInfo.icon}.svg`);
  humidityPara.textContent = `Humidity: ${weatherInfo.humidity}%`;
  conditionsPara.textContent = weatherInfo.conditions;
  descriptionPara.textContent = weatherInfo.description;
  forecastDiv.textContent = '';
  for (let i = 0; i < 7; i++) {
    const date = new Date(days[i].datetime);
    const weekday = date.toLocaleDateString('en-US',{weekday: 'short'});
    const wrapperDiv = document.createElement('div');
    const weekdayPara = document.createElement('p');
    const iconImg = document.createElement('img');
    const tempPara = document.createElement('p');
    weekdayPara.textContent = weekday;
    iconImg.src = require(`${iconsPath}/${days[i].icon}.svg`);
    wrapperDiv.appendChild(weekdayPara);
    wrapperDiv.appendChild(iconImg);
    wrapperDiv.appendChild(tempPara);
    forecastDiv.appendChild(wrapperDiv);
  };
  if (celsiusBtn.checked) renderInCelsius(weatherInfo);
  else renderInFahrenheit(weatherInfo);
};

function renderInFahrenheit(weatherInfo) {
  const days = weatherInfo.days;
  const feelslike = weatherInfo.feelslike;
  const windspeed = weatherInfo.windspeed;
  currTempPara.textContent = `${weatherInfo.temp}°`;
  feelsLikePara.textContent = `Feels like ${feelslike}°`;
  windSpeedPara.textContent = `Wind: ${windspeed} mph`;
  forecastDiv.querySelectorAll('p:last-child').forEach((para, i) => {
    para.textContent = `${days[i].tempmax}°/${days[i].tempmin}°`;
  });
};

function renderInCelsius(weatherInfo) {
  const days = weatherInfo.days;
  const feelslike = weatherInfo.metric.feelslike;
  const windspeed = weatherInfo.metric.windspeed;
  currTempPara.textContent = `${weatherInfo.metric.temp}°`;
  feelsLikePara.textContent = `Feels like ${feelslike}°`;
  windSpeedPara.textContent = `Wind: ${windspeed} km/h`
  forecastDiv.querySelectorAll('p:last-child').forEach((para, i) => {
    const tempMax = days[i].metric.tempMax;
    const tempMin = days[i].metric.tempMin
    para.textContent = `${tempMax}°/${tempMin}°`;
  });
};

function renderError(msg) {
  weatherCardDiv.classList = 'hide';
  errorMsgPara.classList.remove('hide');
  errorMsgPara.textContent = msg;
  statusSpan.textContent = msg;
}

export { 
  renderWeatherInfo, 
  renderInCelsius, 
  renderInFahrenheit, 
  renderError
};