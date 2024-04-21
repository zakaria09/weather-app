export interface CityForecast extends BaseForecast {
  country: string;
}

export interface BaseForecast {
  city: string;
  forecast: GroupedForecast;
}

export interface GroupedForecast {
  [date: string]: Forecast;
}

export interface Forecast {
  dateTime: Date;
  temp: number;
  weather: {
    icon: Icons;
    description: string;
  };
}

export interface DisplayForecast extends BaseForecast {
  date: string;
}

export type Icons =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Atmosphere'
  | 'Clear'
  | 'Clouds';

export interface coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
