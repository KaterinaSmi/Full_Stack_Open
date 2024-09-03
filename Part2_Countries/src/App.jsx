import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import countryServices from './services/countryServices';
import getWeather from './services/weatherServices'
import weatherServices from './services/weatherServices';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState(null); 

  useEffect(() => {
    countryServices.getAllCountries()
      .then(countriesData => {
        setFilteredCountries(countriesData)
        setCountries(countriesData)
      } );
    }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    if (query) {
      const filtered = countries.filter(country => 
        country.name.toLowerCase().includes(query)
      );
      setFilteredCountries(filtered);
      if (filtered.length == 1){
        const capital = filtered[0].capital
        weatherServices.getWeather(capital)
          .then(weatherData => setWeather(weatherData));

      } else{
        setWeather(null);
      }
    } else {
      setFilteredCountries(countries);
    }
  };
const getWeatherIcon = (description) => {
  if (description.includes('rain')){
    return <WaterDropIcon/>;
  } else if(description.includes('clear')){
    return <WbSunnyIcon/>
  } else if (description.includes('cloud')){
    return <CloudIcon/>
  } else if(description.includes('snow')){
    return <AcUnitIcon/>
  }
};
  const renderCountryList = () =>{
    if( filteredCountries.length == 1){
      const country = filteredCountries[0]
      const languages = country.languages ? Object.values(country.languages) : [];
      return(
        <div>
          <h3>{country.name}</h3>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Languages:</strong></p>
          <ul>
            {languages.map((lang, index)=>(
              <li key={index}> {lang}</li>
            ))}
          </ul>
          <img src={country.flag} alt={`${country.name} flag`} style={{ width: '100px' }} />
          {weather && (
            <div>
                <p><strong>Weather in </strong> {country.capital} </p>
              <p><strong>Temperature: </strong> {weather.main.temp}°C </p>
              <p><strong>Wind: </strong> {weather.wind.speed}m/s</p>
              <div> 
                {getWeatherIcon(weather.weather[0].description)}
              </div>
            </div>
          )}
        </div>
      );
    } else if (filteredCountries > 1){
      return(
        <ul>
          {filteredCountries.map((country,index) => 
          (<li key={index}> {country.name}</li> ))}
        </ul>
      );
    }else {
      return <p>No countries found</p>
    }
  }

  return (
    <div className='main'>
      <Search
        search={search}
        handleSearch={handleSearch}
      />

      {search && renderCountryList()}
    </div>
  );
}

export default App;
