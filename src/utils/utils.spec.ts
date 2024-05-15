import {Response2Forecast} from '../tests/mockForecast';
import {OpenWeatherMap} from '../types/openWeather.types';
import {formatWeather} from './utils';

describe('utils.ts', () => {
  it('should shape the data into a more useable format', () => {
    const rawWeather: OpenWeatherMap = {
      city: {
        country: 'US',
        id: 234234,
        name: 'LA',
        population: 1312312,
        coord: {lat: 21, lon: 123},
        sunrise: 3223,
        sunset: 32423,
      },
      cnt: 1,
      cod: 1,
      list: Response2Forecast,
    };
    const weather = formatWeather(rawWeather);
    expect(weather).toEqual([
      {
        dateTime: new Date('2024-05-14T17:00:00.000Z'),
        temp: 17,
        weather: {icon: 'Clouds', description: 'Light rain'},
      },
    ]);
  });
});
