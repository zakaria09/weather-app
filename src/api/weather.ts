import axios from 'axios';
import {OpenWeatherMap} from '../types/openWeather.types';
import {coordinates, coords} from '../types/weather.types';

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCoordinates = async (cityName: string) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`
  );
  return response?.data;
};

export const fetchWeather = async (coord: coords): Promise<OpenWeatherMap> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`
  );
  return response?.data;
};

const getCoordinates = async (city: string) => {
  const coord: coordinates[] = await fetchCoordinates(city);
  if (!coord.length) return;
  const [coordinates] = coord;
  return coordinates;
};

export const getWeatherForecast = async (location: {
  city?: string;
  coordinate?: coords;
}) => {
  let coordinates;
  if (location.city) {
    coordinates = await getCoordinates(location.city);
  } else {
    coordinates = location.coordinate;
  }
  if (!coordinates) return;
  return fetchWeather({lat: coordinates.lat, lon: coordinates.lon});
};
