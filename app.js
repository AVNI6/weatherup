const API_KEY = '5d9df266fc93febbfdd0ccfd98cc8649'; 

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const errorDiv = document.getElementById('error');
const weatherInfo = document.getElementById('weather-info');
const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temp');
const conditionEl = document.getElementById('condition');
const windEl = document.getElementById('wind');
const humidityEl = document.getElementById('humidity');

form.addEventListener('submit', e => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  errorDiv.textContent = '';
  weatherInfo.classList.add('hidden');
  document.body.className = ''; // reset background

  try {
    const response = await fetch(
      `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
    );

    const data = await response.json();

    if (!data.current) {
      throw new Error(data.error?.info || 'Unable to fetch weather data');
    }

    const { temperature, weather_descriptions, wind_speed, humidity, weather_code } = data.current;

    locationEl.textContent = `${data.location.name}, ${data.location.country}`;
    tempEl.textContent = temperature;
    conditionEl.textContent = weather_descriptions[0];
    windEl.textContent = wind_speed;
    humidityEl.textContent = humidity;

    setBackground(weather_descriptions[0]);

    weatherInfo.classList.remove('hidden');
  } catch (err) {
    errorDiv.textContent = err.message;
  }
}

function setBackground(description) {
  const desc = description.toLowerCase();
  document.body.classList.remove('sunny', 'cloudy', 'rainy');

  if (desc.includes('sun') || desc.includes('clear')) {
    document.body.classList.add('sunny');
  } else if (desc.includes('cloud')) {
    document.body.classList.add('cloudy');
  } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('thunder')) {
    document.body.classList.add('rainy');
  }
}
