export interface CityForecast {
  city: string;
  country: string;
  forecast: GroupedForecast;
}

export interface GroupedForecast {
  [date: string]: Forecast[];
}

export interface Forecast {
  dateTime: Date;
  temp: number;
  weather: {
    icon: Icons;
    description: string;
  };
}

export interface DisplayForecast {
  city: string;
  date: string;
  forecast: GroupedForecast[];
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
