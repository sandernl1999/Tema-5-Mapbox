import React, { useState, useEffect, useRef } from "react";
import Cosmic from "cosmicjs";
import Mapbox from "mapbox-gl";
import SkeletonContainer from "../SkeletonContainer";
import HomeContent from "../../components/HomeContent";
import PageTitle from "../../components/PageTitle";
import Container from "../../components/Container";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import getCovidData from "../../utils/getCovidData";
import setWeatherToPopup from "../../utils/setWeatherToPopup";
import setVisualization from "../../utils/setVisualization";

let map = null;
let marker = null;
let weatherKey = process.env.WEATHERSTACK_API_KEY;
function HomeContainer() {
  const mapElement = useRef(null);
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  const [style, setStyle] = useState(
    "mapbox://styles/sandernl/ckkxyzmis0jua17qidgsr1fu7"
  );
  const [mapMarkersState, setMapMarkersState] = useState([]);
  const [infoContent, setInfoContent] = useState(null);
  const [stop, setStop] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [isWeatherData, setIsWeatherData] = useState(false);

  // Loads Data from Cosmicjs
  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY,
    });

    bucket
      .getObject({
        slug: "verdens-syv-nye-underverk",
        props: "slug,title,content,metadata",
      })

      .then((data) => {
        setPageData(data.object);
        console.log("Page Data from Cosmic", data);
      })
      .catch((error) => {});

    bucket
      .getObjects({
        type: "underverkene",
        props: "slug,title,content,metadata",
      })

      .then((data) => {
        setMapMarkersState(data.objects);
        console.log("Marker Data from Cosmic", data.objects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Creates a Map
  useEffect(() => {
    if (pageData !== null) {
      map = new Mapbox.Map({
        container: mapElement.current,
        center: [10.381198, 28.748947],
        zoom: 1.5,
        style: style,
      });
      map.addControl(new Mapbox.NavigationControl(), "bottom-right");
      map.addControl(
        new MapboxGeocoder({
          accessToken: process.env.MAPBOX_API_KEY, // mapboxgl.accessToken,
          mapboxgl: Mapbox,
        })
      );
    }
  }, [pageData]);

  // Create Markers on the map

  useEffect(() => {
    console.log("useEffect MapMarker IsWhetherData.... ", isWeatherData);
    if (
      !mapMarkersState ||
      !map ||
      !sessionStorage.getItem("WEATHER-DATA") ||
      JSON.parse(sessionStorage.getItem("WEATHER-DATA")).length === 0
    ) {
      return;
    } else {
      mapMarkersState.map((item, index) => {
        let el = document.createElement("div");

        el.className = "my-destination";
        el.setAttribute("data-name", `${item.title}`);
        el.setAttribute("stop-country", `${item.slug}`);
        el.style.display = "block";
        el.style.height = "50px";
        el.style.width = "50px";
        el.style.pointer = "clicker";
        el.style.backgroundImage = `url('${item.metadata.contentimage.imgix_url}')`;
        el.style.backgroundSize = "50px 50px";

        el.addEventListener("keydown", function (event) {
          if (event.key !== "Enter") return;
          let selectedStop = el.getAttribute("data-name");
          let country = el.getAttribute("stop-country");
          let stopToPass = mapMarkersState.find(
            (el) => el.title === selectedStop
          );
          console.log(selectedStop);
          setStop(stopToPass);
          map.flyTo({
            center: [item.metadata.longitude, item.metadata.latitude],
            zoom: 4,
          });
          setVisualization(country, map);
          setWeatherToPopup(country);
        });

        el.addEventListener("click", function () {
          let selectedStop = el.getAttribute("data-name");
          let country = el.getAttribute("stop-country");
          let stopToPass = mapMarkersState.find(
            (el) => el.title === selectedStop
          );
          console.log(selectedStop);
          setStop(stopToPass);
          map.flyTo({
            center: [item.metadata.longitude, item.metadata.latitude],
            zoom: 4,
          });
          setVisualization(country, map);
        });

        setInfoContent(item.content);

        const weatherData = JSON.parse(sessionStorage.getItem("WEATHER-DATA"));
        var weather = weatherData.filter((p) => p.slug === item.slug)[0];

        let popUpCard = `
					<div class="popup-destination">
            <button id="demo">x</button>
            <h2>${item.title}</h2>
            <p>${item.content}</p>
            <img class="item-img" src=${item.metadata.infoimage.imgix_url} alt=${item.metadata.infoimagealt}>
            <h3>Værmelding (${weather?.location?.name})</h3>

            <div class="weather">
              <p class="weather-temp" id="${item.slug}-stop-temperature">${weather?.current?.temperature}°c</p>
              <img class="weather-img" id="${item.slug}-stop-weather-icon" src=${weather?.current?.weather_icons}>
              <p class="weather-desc" id="${item.slug}-stop-weather-desc">${weather?.current?.weather_descriptions}</p>
            </div>
            <div class="bar-chart-container">
              <canvas id="chart" class="bar-chart"></canvas>              
            </div>       
          </div>`;

        let popUp = new Mapbox.Popup({ closeButton: false });
        popUp.setHTML(popUpCard);

        new Mapbox.Marker(el, {
          anchor: "top",
        })
          .setLngLat([item.metadata.longitude, item.metadata.latitude])
          .setPopup(popUp)
          .addTo(map);
      });
    }
  }, [mapMarkersState, isWeatherData]);

  // Original Fetch Weather Data
  useEffect(() => {
    //
    if (!mapMarkersState) {
      return;
    }
    console.log(mapMarkersState);
    mapMarkersState.map((i) => {
      fetch(
        `http://api.weatherstack.com/forecast?access_key=${weatherKey}&query=${i.metadata.weatherquery}`
      )
        .then((response) => response.json())
        .then((data) => {
          data.slug = i.slug;
          if (sessionStorage.getItem("WEATHER-DATA")) {
            const currentData = JSON.parse(
              sessionStorage.getItem("WEATHER-DATA")
            );
            currentData.push(data);
            console.log("currrentData", currentData.length);
            sessionStorage.setItem("WEATHER-DATA", JSON.stringify(currentData));
            if (currentData.length >= 8) {
              setIsWeatherData(true);
            }
          } else {
            sessionStorage.setItem("WEATHER-DATA", JSON.stringify([data]));
          }
        });
      getCovidData(i.slug);
    });
    if (sessionStorage.getItem("COVID-DATA")) {
      console.log("Accessing Covid data from fetch weather useeffect");
    }
  }, [mapMarkersState, sessionStorage]);

  // Trying Fetch Weather Data

  function renderSkeleton() {
    return <SkeletonContainer />;
  }

  function renderPage() {
    return (
      <Container as="main">
        <PageTitle></PageTitle>
        <HomeContent dangerouslySetInnerHTML={{ __html: pageData.content }} />
        <div
          className="mapContainer"
          style={{ height: "100vh", width: "100vw" }}
          ref={mapElement}
        ></div>
      </Container>
    );
  }

  return <>{pageData === null ? renderSkeleton() : renderPage()}</>;
}

export default HomeContainer;
