import React from "react";
import { useState} from "react";
import { BiSearchAlt } from "react-icons/bi";
import { WiStrongWind } from "react-icons/wi";
import {WiWindy} from "react-icons/wi";
import "./style.css";

function Home() {
  const [data, setData] = useState({
    temp_c: 0,
    name: "City",
    wind_kph: '',
    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
    humidity: 0
  });
  const [name, setName] = useState("");
  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=e086a1e94e9a427495401446233005&q=${name}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setData({
            ...data,
            temp_c: data.current.temp_c,
            name: data.location.name,
            wind_kph: data.current.wind_kph,
            icon: data.current.condition.icon,
            humidity: data.current.humidity
          });
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter a City"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            <BiSearchAlt className="icon">Search</BiSearchAlt>
          </button>
        </div>
        <div className="weather-info">
          <div className="icon">
            <img src={data.icon} />
          </div>
          <h1>{data.temp_c}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <WiStrongWind className="icon" />
              <div className="wind">
                <p>{data.wind_kph} km/h</p>
                <p>wind</p>
              </div>
            </div>
            <div className="col">
              <WiWindy className="icon" />
              <div className="wind">
                <p>{data.humidity} %</p>
                <p>humidity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
