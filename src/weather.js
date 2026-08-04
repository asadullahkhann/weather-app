async function getWeather(location) {
  const key = 'MCLJCAXDNQF9KKTXDQNEC63JL';
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`);
    return response;
  }
  catch(err) {
    return err.message;
  };
};

function getRequiredWeatherInfo(weather) {
  const {address, currentConditions, description, days} = weather;
  for (const day of days) {
    day.metric = {
      tempMax: Math.ceil((day.tempmax - 32) * 5/9),
      tempMin: Math.ceil((day.tempmin - 32) * 5/9),
    };
    day.tempmax = Math.ceil(day.tempmax);
    day.tempmin = Math.ceil(day.tempmin);
  }
  let {
    conditions,
    feelslike,
    humidity,
    temp,
    windspeed,
    icon,
    uvindex,
    precipprob,
  } = currentConditions;
  conditions = conditions.replace('Partially', 'Partly');
  conditions = conditions.replace('partially', 'partly');
  temp = Math.ceil(temp);
  feelslike = Math.ceil(feelslike);
  windspeed = Math.ceil(windspeed);
  const metric = {
    temp: Math.ceil((temp - 32) * 5/9),
    feelslike: Math.ceil((feelslike - 32) * 5/9),
    windspeed: Math.ceil(windspeed * 1.60934)
  };
  return {
    address,
    days,
    description,
    icon,
    temp,
    feelslike,
    conditions,
    humidity,
    windspeed, 
    metric,
    uvindex,
    precipprob
  };
};

export { getWeather, getRequiredWeatherInfo };