import React from "react";
import axios from 'axios'

const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const getAllCountries = () => {
    return axios.get(apiUrl)
      .then(response => {
        return response.data.map((country) => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : 'No capital',
          flag: country.flags.svg,
          languages: country.languages,
        }));

      })
      .catch(error => {
        console.error("Error fetching countries", error);
      });
    };

    export default {getAllCountries};