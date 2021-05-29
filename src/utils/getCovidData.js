import processCovidData from "./processCovidData";

export default function getCovidData(country) {
  fetch(`https://covid-193.p.rapidapi.com/history?country=${country}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      useQueryString: true,
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        processCovidData(result.response, country);
      },
      (error) => console.log("COVID", error)
    );
}
