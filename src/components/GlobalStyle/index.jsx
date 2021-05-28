import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

   img{
    max-width: 18em; 
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
    
   html {
    font-size: 20px; 
    line-height: 1.5; 
    } 

   *{
        box-sizing: border-box;
    }

    .weather{
        font-size:10px;
        grid-template-columns: repeat(3, 1fr);
        font-weight: 500;
        background-color: aliceblue;
        max-height: 6em;
        padding: 1px;
        display: grid;
        img, p{
            padding: 3px;
            text-align: center;
            font-size:12px;
        }

        .weather-img{
            border-radius: 70%;
            width: 4em;
        }
  
    }

    html, body {
        margin: 0 auto;
        padding: 0;
        background-color: white; 
    }

    body {
        font-family: "Georgia", sans-serif; 
    }

    .my-destination{
        cursor:pointer;
    }    

    .popup-destination{
        height: 500px;
        width: 500px;
        font-family: 'Georgia', sans-serif;
        h3{
            font-size: 14px;
            text-align: center;
            font-weight: 500;
        }
        h2{
            font-size: 16px;
            margin-bottom: -0.7em;
            text-align: center;
        }
        p{
            font-size: 12px;
        }
    
    }
    .bar-chart {
        width: 500px;
        height: 210px !important;
    }
    .bar-chart-container {
        width: 500px;
        height: 210px;
    }
    .mapboxgl-ctrl-geocoder {
        width: 50% !important;
    }
    .mapboxgl-popup-content{
        height: 500px;
        width: 520px;
        position: absolute;
        top: -140px;
    }
    .mapboxgl-popup-close-button {
        font-size: 22px;
    }
    @media screen and (max-width: 1080px) {        
        .mapboxgl-popup-content{
            left: -140px;
        }
    }
    @media screen and (max-width: 775px) {        
        .mapboxgl-popup-content{
            left: -200px;
        }
    }
    @media screen and (max-width: 743px) {
        .item-img {
            height: 70px;
        }
        .mapboxgl-popup-content{
            left: -250px;
        }
        .bar-chart {
            height: 180px !important;
        }
    }
    @media screen and (max-width: 643px) {
        .item-img {
            height: 60px;
        }        
    }
    @media screen and (max-width: 560px) {        
        .mapboxgl-popup-content{
            left: -200px;
        }
    }
    @media screen and (max-width: 500px) {
        .bar-chart {
            width: 400px !important;
            height: 170px !important;
        }
        .bar-chart-container {
            width: 400px;
            height: 170px;
        }
        .mapboxgl-popup-content{
            height: 400px;
            width: 420px;     
        }
        .popup-destination{
            height: 400px;
            width: 400px;     
        }
    }
    @media screen and (max-width: 400px) {        
        .bar-chart {
            width: 300px !important;
            height: 170px !important;
        }
        .bar-chart-container {
            width: 300px;
            height: 170px;
        }
        .mapboxgl-popup-content{
            height: 400px;
            width: 370px;     
            left: -175px;
        }
        .popup-destination{
            height: 350px;
            width: 350px;     
        }
    }


    /*mao root*/
    #root {
      z-index: -99;
    }

    /*fill the map*/
    .mapContainer {
      margin-top: -3.35em;
    }


    /*css question box*/
    .modal {
      display: block;
      position: fixed;
      z-index: 1;
      padding-top: 12em;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* Modal Content */
    .modal-content {
      font-family: sans-serif;
      background-color: #fefefe;
      margin: auto;
      padding: 30px;
      border: 1px solid black;
      border-radius: 5px;
      width: 40%;
      letter-spacing: 1px;
    }

    /* Close button */
    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    p {
      text-align: center;
    }

    @media screen and (max-width: 900px) {
      p {
        font-size: 14px !important;
      }
    }

    @media screen and (max-width: 574px) {
      p {
        font-size: 12px !important;
      }
    }

    #myBtn {
      font-size: 1.8em;
      position: absolute;
      background-color: #fff;
      border: 1px solid black;
      border-radius: 5px;
      z-index: 99;
      top: 0.3em;
      left: 0.5em;
      width: 1.2em;
      height: 0.8em;
      padding-bottom: 1.1em;
    }

    .container {
      align-items: center;
      position: fixed;
      z-index: 1;
      display: flex;
      height: 200px;
      justify-content: center;
      top: -2.5em;
      right: -4em;
      width: 360px;
    }

    @media only screen and (max-width: 400px) {
      .modal-content {
        width: 100%;
      }
    }

    @media screen and (max-width: 700px) and (min-width: 400px) {
      .modal-content {
        width: 60%;
      }
    }

    @media only screen and (max-width: 320px) {
      #myBtn {
        left: 0.2em;
      }
    }
`;

export default GlobalStyle;
