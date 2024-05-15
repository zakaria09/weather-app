import {isSameDay, parseISO} from 'date-fns';
import {OpenWeatherMap} from '../types/openWeather.types';
import {Forecast, GroupedForecast} from '../types/weather.types';

export const formatWeather = (weather: OpenWeatherMap) =>
  weather.list.map((data) => ({
    dateTime: parseISO(data.dt_txt.replace(' ', 'T')),
    temp: Math.round(data.main.temp),
    weather: {
      icon: data.weather[0].main,
      description: data.weather[0].description,
    },
  }));

export const groupForecasts = (weather: Forecast[]) => {
  const forecast: GroupedForecast = {};

  weather.reduce((prev, current) => {
    if (isSameDay(new Date(prev.dateTime), new Date(current.dateTime))) {
      const {dateTime}: {dateTime: Date} = current;
      const dateKey = new Date(
        dateTime.getFullYear(),
        dateTime.getMonth(),
        dateTime.getDate()
      ).toUTCString();
      forecast[dateKey] = forecast[dateKey]
        ? [...forecast[dateKey], current]
        : [current];
    }
    return current;
  });

  return forecast;
};
