import React from "react";
import axios from 'axios'


const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (capital) => {
    return axios.get(`${apiUrl}?q=${capital}&appid=${apiKey}&units=metric`)
    .then(response => response.data)
    .catch(error => {
        console.error("error fetching data" , error);
    });

};

export default {getWeather}