import React from 'react';
import {CityForecast, DisplayForecast} from '../types/weather.types';
import {format} from 'date-fns';

type Props = {
  weather: CityForecast;
  forecast: (forecast: DisplayForecast) => void;
};

export default function Weather({weather, forecast}: Props) {
  const showForecast = (date: string) => {
    forecast({
      city: weather.city,
      date: date,
      forecast: {[date]: weather.forecast[date]},
    });
  };
  return (
    <div className='shadow rounded p-8 max-w-md'>
      <div className='flex flex-col items-start'>
        <h1 data-testid='city' className='text-2xl font-semibold'>
          {weather.city}
        </h1>
        <span
          data-testid='country'
          className='text-md font-semibold text-gray-600'
        >
          {weather.country}
        </span>
      </div>
      <ul className='flex flex-col items-start py-6'>
        {Object.keys(weather.forecast).map((date, ind) => (
          <li key={ind}>
            <button
              type='button'
              className='cursor-pointer text-blue-900 hover:text-blue-600 mb-2 hover:underline'
              onClick={() => showForecast(date)}
            >
              {format(new Date(date), 'EEEE')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
