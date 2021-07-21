import React from 'react';
import './Weather.css';
import imgCloud from "../../assets/cloud.png";
import imgGif from "../../assets/rain.png";

import { getMeridiemTime } from "../../utils";

function Weather({ data }: {data: any}) {
  let weatherImage = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  // switch (data.weather[0].main) {
  //   case 'Clouds':
  //     weatherImage = imgCloud;
  //     break;
  //   case 'Rain':
  //     weatherImage = imgGif;
  //     break;
  //   default:
  //     weatherImage = imgCloud;
  //     break;
  // }
  return (
    <div className="weather-holder">
      <div className="time">
        { getMeridiemTime(new Date(data.dt*1000).getHours()) }
      </div>
      <div className="temp">{ data.main.temp.toFixed() } &#x2103;</div>
      <div className="weather">
        <img src={weatherImage} alt="" />
        
      </div>
      
    </div>
  );
}

export default Weather;
