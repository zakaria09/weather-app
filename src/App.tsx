import {useEffect, useState} from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import {useQuery} from '@tanstack/react-query';
import {
  CityForecast,
  DisplayForecast,
} from './types/weather.types';
import Weather from './components/Weather';
import WeeklyForecast from './components/Forecast';
import { formatWeather, groupForecasts } from './utils/utils';
import { getWeatherForecast } from './api/weather';

function App() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState<CityForecast | undefined>();
  const [currentForecast, setCurrentForecast] = useState<
    DisplayForecast | undefined
  >();

  const {data: weather} = useQuery({
    queryKey: ['city', city],
    queryFn: () => getWeatherForecast(city),
    enabled: Boolean(city),
  });

  useEffect(() => {
    if (!weather) return;
    const days = formatWeather(weather);

    const forecast = groupForecasts(days);

    const cityForecast: CityForecast = {
      city: weather.city.name,
      country: weather.city.country,
      forecast: forecast,
    };

    setForecast(cityForecast);
  }, [weather]);

  return (
    <>
      <div className='max-w-lg'>
        <WeatherForm onCity={setCity} />
      </div>
      <div className='my-10'>
        <div className='w-full flex flex-col md:flex-row'>
          <div className='basis-3/12'>
            {forecast && (
              <Weather forecast={setCurrentForecast} weather={forecast} />
            )}
          </div>
          <div className='basis-9/12 px-6'>
            {currentForecast && <WeeklyForecast forecast={currentForecast} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
