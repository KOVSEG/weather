import _ from 'lodash';

document.getElementById('get-weather-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  getWeather(city);
});


async function getWeather(city) {
  const searchUrl = `https://api.weatherapi.com/v1/current.json?key=1504f27287db4bfd8b3203323240906&q=${city}&aqi=no`;

  try {
    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const searchData = await searchResponse.json();
    if (searchData.length === 0) {
      throw new Error('City not found');
    }

    showResult(searchData);

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

function showResult(getData) {
  let weatherResult = document.getElementById('weather-result');
  let city = document.createElement('div');
  let time = document.createElement('div');
  let temperature = document.createElement('div');
  let wind = document.createElement('div');

  city.innerText = 'City: ' + getData['location']['name'];
  time.innerText = 'Date&Time: ' + getData['location']['localtime'];
  temperature.innerText = 'Temperature, C: ' + getData['current']['temp_c'];
  wind.innerText = 'Wind, kph: ' + getData['current']['wind_kph'];

  weatherResult.appendChild(city);
  weatherResult.appendChild(time);
  weatherResult.appendChild(temperature);
  weatherResult.appendChild(wind);

  return weatherResult;
};