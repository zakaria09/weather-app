export interface CityForecast {
  city: string;
  country: string;
  forecast: {
    [date: string]: Forecast[];
  };
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
  forecast: Forecast[];
}

export type Icons =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Atmosphere'
  | 'Clear'
  | 'Clouds';
