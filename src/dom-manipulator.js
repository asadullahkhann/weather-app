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
const uvIndexPara = document.querySelector('.uv-index');
const precipPara = document.querySelector('.precip');

function renderWeatherInfo(weatherInfo) {
  const iconsPath = './images/visualcrossing-icons-1st-set';
  const days = weatherInfo.days;
  errorMsgPara.classList = 'error-card hide';
  weatherCardDiv.classList = 'weather-card';
  statusSpan.textContent = '';
  addressPara.textContent = weatherInfo.address;
  iconImg.src = require(`${iconsPath}/${weatherInfo.icon}.svg`);
  humidityPara.textContent = `${weatherInfo.humidity}%`
  conditionsPara.textContent = weatherInfo.conditions;
  descriptionPara.textContent = weatherInfo.description;
  uvIndexPara.textContent = weatherInfo.uvindex;
  precipPara.textContent = `${weatherInfo.precipprob}%`;
  forecastDiv.textContent = '';
  for (let i = 0; i < 7; i++) {
    const date = new Date(days[i].datetime);
    const weekday = date.toLocaleDateString('en-GB',{weekday: 'short'});
    let formattedDate = date.toLocaleDateString(
      'en-GB', 
      {day: 'numeric', month: 'short'}
    );
    if (i === 0) formattedDate += ' Today';
    else if (i === 1) formattedDate += ' Tomorrow';
    else formattedDate += ` ${weekday}`;
    const wrapperDiv = document.createElement('div');
    const weekdayPara = document.createElement('p');
    const formattedDatePara = document.createElement('p');
    const iconImg = document.createElement('img');
    const tempPara = document.createElement('p');
    weekdayPara.textContent = weekday;
    formattedDatePara.textContent = formattedDate;
    weekdayPara.classList.add('weekday', 'semi-bold');
    formattedDatePara.classList.add('formatted-date', 'semi-bold', 'hide');
    iconImg.src = require(`${iconsPath}/${days[i].icon}.svg`);
    wrapperDiv.appendChild(weekdayPara);
    wrapperDiv.appendChild(formattedDatePara);
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
  windSpeedPara.textContent = `${windspeed} mph`;
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
  windSpeedPara.textContent = `${windspeed} km/h`
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