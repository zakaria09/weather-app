import axios from 'axios';
import { OpenWeatherMap } from '../types/openWeather.types';
import { coordinates } from '../types/weather.types';

const API_KEY = import.meta.env.VITE_API_KEY;

export const getCoordinates = async (cityName: string) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`
  );
  return response?.data;
};

export const getWeather = async (coord: {
  lon: number;
  lat: number;
}): Promise<OpenWeatherMap> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`
  );
  return response?.data;
};

export const getWeatherForecast = async (city: string) => {
  const coord: coordinates[] = await getCoordinates(city);
  if (!coord.length) return;
  const [coordinates] = coord;
  return getWeather({ lat: coordinates.lat, lon: coordinates.lon });
};