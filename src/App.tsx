import {useEffect, useState} from 'react';
import './App.css';
import WeatherForm from './components/weatherForm/WeatherForm';
import {CityForecast, DisplayForecast, coords} from './types/weather.types';
import Weather from './components/weatherList/WeatherList';
import {formatWeather, groupForecasts} from './utils/utils';
import {useWeather} from './hooks/useWeather';
import Warning from './components/banners/Warning';
import LoadingSpinner from './components/loaders/LoadingSpinner';
import WeeklyForecast from './components/forecast/Forecast';

function App() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState<CityForecast | undefined>();
  const [currentForecast, setCurrentForecast] = useState<
    DisplayForecast | undefined
  >();
  const [coords, setCoords] = useState<coords | undefined>();

  const {weather, error, isLoading} = useWeather(
    {city, coordinate: {lon: coords?.lon, lat: coords?.lat}},
    Boolean(city || coords)
  );

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

  const handlePosition = (position: coords) => {
    setCity('');
    setCoords(position);
  };

  const renderForecast = () => {
    if (error) return <Warning msg='Oops somethin went wrong!' />;
    else if (isLoading)
      return (
        <div className='px-8'>
          <LoadingSpinner />
        </div>
      );
    else
      return (
        <div className='w-full flex flex-col md:flex-row'>
          <div className='basis-3/12'>
            {forecast && (
              <Weather forecast={setCurrentForecast} weather={forecast} />
            )}
          </div>
          <div className='basis-9/12 px-6'>
            {currentForecast ? <WeeklyForecast data={currentForecast} /> : null}
          </div>
        </div>
      );
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='max-w-lg'>
        <WeatherForm
          onCity={setCity}
          onLocation={(pos) => handlePosition(pos)}
        />
      </div>
      <div className='my-10'>{renderForecast()}</div>
    </div>
  );
}

export default App;
