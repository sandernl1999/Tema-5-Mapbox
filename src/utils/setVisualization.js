import getBarData from "./getBarData";

export default function setVisualization(country, map) {
  let currentData = sessionStorage.getItem("COVID-DATA");
  currentData = !currentData ? {} : JSON.parse(currentData);

  if (!currentData[country]) return;

  setTimeout(() => {
    if (document.getElementById("popup-destination-close-button")) {
      let popUpCloseButton = document.getElementById(
        "popup-destination-close-button"
      );

      const popUpElement =
        popUpCloseButton.parentElement.parentElement.parentElement;

      popUpCloseButton.onclick = function () {
        popUpElement.remove();

        map.flyTo({
          center: [10.381198, 28.748947],
          zoom: 1.5,
        });
        map.click();
      };
    }
  }, 1000);

  setTimeout(() => {
    const ctx = document.getElementById("chart");
    const data = getBarData(currentData[country]);
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mars",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Des",
        ],
        datasets: [
          {
            label: "COVID Dødsfall i 2020",
            data: data,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 0.2)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [
            {
              ticks: {
                maxRotation: 90,
                minRotation: 80,
              },
              gridLines: {
                offsetGridLines: true,
              },
            },
            {
              position: "top",
              ticks: {
                maxRotation: 90,
                minRotation: 80,
              },
              gridLines: {
                offsetGridLines: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, 1000);
}
