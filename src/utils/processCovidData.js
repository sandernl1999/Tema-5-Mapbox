export default function processCovidData(result, country) {
  if (!result || result.length === 0) return;
  const formattedData = result.reduce((accumulator, data) => {
    const date = new Date(data.day);
    if (date.getFullYear() !== 2020) return accumulator;
    const newDeaths = data.deaths.new
      ? parseInt(data.deaths.new.replace("+", ""))
      : 0;
    if (accumulator[data.day] && newDeaths > accumulator[data.day]) {
      accumulator[data.day] = newDeaths;
    } else if (!accumulator[data.day]) {
      accumulator[data.day] = newDeaths;
    }
    return accumulator;
  }, {});
  const mappedResult = Object.keys(formattedData).reduce((accumulator, key) => {
    const date = new Date(key);
    if (accumulator[date.getMonth()]) {
      accumulator[date.getMonth()] += formattedData[key];
    } else if (!accumulator[date.getMonth()]) {
      accumulator[date.getMonth()] = formattedData[key];
    }
    return accumulator;
  }, {});
  let currentData = sessionStorage.getItem("COVID-DATA");
  currentData = !currentData ? {} : JSON.parse(currentData);
  currentData = { ...currentData, [country]: mappedResult };
  sessionStorage.setItem("COVID-DATA", JSON.stringify(currentData));
}
