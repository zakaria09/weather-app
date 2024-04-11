import {useEffect, useState} from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import {useQuery} from '@tanstack/react-query';
import {getCoordinates, getWeather} from './api/weather';
import {isSameDay, parseISO} from 'date-fns';
import {CityForecast, DisplayForecast} from './types/weather.types';
import Weather from './components/Weather';
import WeeklyForecast from './components/Forecast';

function App() {
  const [city, setCity] = useState('');
  const [coord, setCoord] = useState({lat: 0, lon: 0, success: false});
  const [forecast, setForecast] = useState<CityForecast | undefined>();
  const [currentForecast, setCurrentForecast] = useState<
    DisplayForecast | undefined
  >();

  const {data} = useQuery({
    queryKey: ['coordinates', city],
    queryFn: () => getCoordinates(city),
    enabled: !!city,
  });

  useEffect(() => {
    if (!data?.length) return;
    const [result] = data;
    setCoord({lat: result.lat, lon: result.lon, success: true});
  }, [data]);

  const {data: weather, status} = useQuery({
    queryKey: ['weather', coord.lat, coord.lon],
    queryFn: () => getWeather({lon: coord.lon, lat: coord.lat}),
    enabled: !!coord.success,
  });

  useEffect(() => {
    if (status === 'success') {
      setCoord((prev) => ({...prev, success: false}));
    }
  }, [status]);

  useEffect(() => {
    if (!weather) return;
    const days = weather.list.map((data) => ({
      dateTime: parseISO(data.dt_txt.replace(' ', 'T')),
      temp: Math.round(data.main.temp),
      weather: {
        icon: data.weather[0].main,
        description: data.weather[0].description,
      },
    }));

    const forecast: any = {};

    days.reduce((prev, current) => {
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
