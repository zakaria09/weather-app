import {useEffect, useState} from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import {useQuery} from '@tanstack/react-query';
import {getCoordinates, getWeather} from './api/weather';
import {isSameDay, parseISO} from 'date-fns';
import {
  CityForecast,
  DisplayForecast,
  coordinates,
} from './types/weather.types';
import Weather from './components/Weather';
import WeeklyForecast from './components/Forecast';

const getWeatherForecast = async (city: string) => {
  const coord: coordinates[] = await getCoordinates(city);
  console.log(coord);
  if (!coord.length) return;
  const [coordinates] = coord;
  return getWeather({lat: coordinates.lat, lon: coordinates.lon});
};

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

  console.log('city', city, 'weather', weather);

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
