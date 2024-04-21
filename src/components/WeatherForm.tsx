import {useFormik} from 'formik';
import React from 'react';

export default function WeatherForm({
  onCity,
}: {
  onCity: (city: string) => void;
}) {
  const formik = useFormik({
    initialValues: {city: ''},
    onSubmit: (values) => {
      const {city} = values;
      onCity(city);
    },
  });
  return (
    <form className="shadow-md rounded p-6" onSubmit={formik.handleSubmit}>
      <label
        className="block text-slate-700 text-sm font-bold text-left pb-2"
        htmlFor="city"
      >
        City name:
      </label>
      <div className="flex flex-col gap-4">
        <input
          id="city"
          name="city"
          className="shadow appearance-none border round w-full py-2 px-3 leading-tight"
          data-testid="city-input"
          onChange={formik.handleChange}
          value={formik.values.city}
          placeholder="London...."
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Get Weather
          </button>
        </div>
      </div>
    </form>
  );
}
