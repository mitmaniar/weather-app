import React, { useState } from 'react';
import axios from "axios";
import './Home.css';

import Textbox from "../../components/Textbox/Textbox";
import Weather from "../../components/Weather/Weather";
import Header from "../../components/Header/Header";

import { getDateISO } from "../../utils";

// TODO: configure as part of env variable
const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=978df16c9ea29182a3db4505fcea83b5&units=metric';

function Home() {

  const [ weatherData, setWeatherData ] = useState<any>(null);

  const aggregateWeatherData = (data: any) => {
    return {
      city: data.city,
      main: data.list.reduce((aggWeather: any, currentWeather: any) => {
        const dateISO = getDateISO(currentWeather.dt);
        aggWeather[dateISO] = aggWeather[dateISO] || { date: new Date(dateISO), list: [] }
        aggWeather[dateISO].list.push(currentWeather)
        return aggWeather;
      }, {})
    }
  }

  const onInput = (city: string) => {
    console.log(city)
    axios.get(`${apiUrl}&q=${city || ''}`).then(response => {
      setWeatherData(aggregateWeatherData(response.data));
      console.log(weatherData);
    })
  }

  return (
    <div className="home">
      <Header />
      <div className="main-content">
        <div className="search">
          <Textbox onInput={onInput} placeholder='City' />
        </div>
        <div className="search-results">
          <div className="current-weather">
            <div className="weather-city">
              {weatherData && weatherData.city.name}
            </div>
            <div></div>
          </div>
          {
            // TODO: Refine this section further into smaller components
            weatherData && Object.keys(weatherData.main).map((weatherKey, j: number) => {
              const weatherMain = weatherData.main[weatherKey];
              return (
                <div key={j} className="weather-collection">
                  <div className="weather-info">
                    <div className="weather-date">
                      {weatherMain.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="weather-list">
                    {
                      weatherMain.list.map((weather: any, i: number) => (
                        <Weather key={i} data={weather} />
                      ))
                    }
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  );
}

export default Home;
