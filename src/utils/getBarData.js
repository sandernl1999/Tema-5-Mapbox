export default function getBarData(covidDeathsData) {
  const barData = [];
  for (let i = 0; i < 12; i++) {
    barData[i] = covidDeathsData[i] ? covidDeathsData[i] : 0;
  }
  return barData;
}
