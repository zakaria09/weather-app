import { Icons } from "./weather.types";

export interface OpenWeatherMap {
  city: City;
  cnt: number;
  cod: number;
  list: OpenWeatherForecast[]
}

interface City {
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  coord: {
    lat: number;
    lon: number
  }
}

interface OpenWeatherForecast {
  dt_txt: string;
  main: {
    feels_like: number;
    temp: number;
    humidity: number;
    sea_level: number;
  };
  weather: Array<{
    description: string;
    main: Icons;
  }>;
}