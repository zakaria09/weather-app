import {useFormik} from 'formik';
import React, {useState} from 'react';
import {coords} from '../../types/weather.types';
import Warning from '../banners/Warning';
import LoadingSpinner from '../loaders/LoadingSpinner';

type Props = {
  onCity: (city: string) => void;
  onLocation: (location: coords) => void;
};

export default function WeatherForm({onCity, onLocation}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {city: ''},
    onSubmit: (values) => {
      const {city} = values;
      onCity(city);
    },
  });

  const getCoordinates = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        formik.setValues({city: ''});
        onLocation({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      () => {
        setError(
          'Please allow browser permission to get your location to get weather report.'
        );
        setIsLoading(false);
      }
    );
  };
  return (
    <form className='shadow-md rounded p-6' onSubmit={formik.handleSubmit}>
      <label
        className='block text-slate-700 text-sm font-bold text-left pb-2'
        htmlFor='city'
      >
        City name:
      </label>
      <div className='flex flex-col gap-4'>
        <input
          id='city'
          name='city'
          className='shadow appearance-none border round w-full py-2 px-3 leading-tight'
          data-testid='city-input'
          onChange={formik.handleChange}
          value={formik.values.city}
          placeholder='London....'
        />
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'
            type='submit'
            disabled={isLoading}
          >
            Get Weather
          </button>
          {!isLoading ? (
            <button
              className='border-2 border-solid border-blue-700 hover:border-blue-500 hover:text-blue-500 text-blue-700 font-bold py-2 px-4 rounded'
              type='button'
              onClick={getCoordinates}
            >
              Current Location
            </button>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {error && <Warning msg={error} />}
      </div>
    </form>
  );
}
