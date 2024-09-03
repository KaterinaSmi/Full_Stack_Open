import React from "react";
import axios from 'axios'


const apiKey = '09d8a2f896b15149a42abca2aabd354b'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (capital) => {
    return axios.get(`${apiUrl}?q=${capital}&appid=${apiKey}&units=metric`)
    .then(response => response.data)
    .catch(error => {
        console.error("error fetching data" , error);
    });

};

export default {getWeather}