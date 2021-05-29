export default function setWeatherToPopup(country) {
  const weatherData = JSON.parse(sessionStorage.getItem("WEATHER-DATA"));
  const weather = weatherData.filter((p) => p.slug === country)[0];
  setTimeout(() => {
    document.getElementById(
      `${country}-stop-temperature`
    ).innerHTML = `${weather?.current?.temperature}°c`;
    document.getElementById(
      `${country}-stop-weather-icon`
    ).innerHTML = `${weather?.current?.weather_icons}`;
    document.getElementById(
      `${country}-stop-weather-desc`
    ).innerHTML = `${weather?.current?.weather_descriptions}`;
  }, 1000);
}
