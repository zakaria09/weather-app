import {useQuery} from '@tanstack/react-query';
import {getWeatherForecast} from '../api/weather';
import {coords} from '../types/weather.types';

export function useWeather(
  location: {
    city?: string;
    coordinate?: coords;
  },
  enabled: boolean
) {
  const {
    data: weather,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['location', JSON.stringify(location)],
    queryFn: () => getWeatherForecast(location),
    enabled: enabled,
  });

  return {weather, error, isLoading};
}
