import React from 'react';
import {Icons} from '../types/weather.types';
import rainy from '../assets/icons/rainy-7.svg';
import drizzle from '../assets/icons/rainy-drizzle.svg';
import clouds from '../assets/icons/cloudy.svg';
import snow from '../assets/icons/snowy-6.svg';
import sun from '../assets/icons/sunny.svg';
import thunder from '../assets/icons/thunder.svg';
import {FaSmog} from 'react-icons/fa';
import {BiSolidMessageAltError} from 'react-icons/bi';

export default function WeatherIcons({weather}: {weather: Icons}) {
  if (weather === 'Rain') return <img className='w-24' src={rainy} />;
  else if (weather === 'Drizzle') return <img className='w-24' src={drizzle} />;
  else if (weather === 'Clouds') return <img className='w-24' src={clouds} />;
  else if (weather === 'Clear') return <img className='w-24' src={sun} />;
  else if (weather === 'Snow') return <img className='w-24' src={snow} />;
  else if (weather === 'Thunderstorm')
    return <img className='w-24' src={thunder} />;
  else if (weather === 'Atmosphere') return <FaSmog />;
  else return <BiSolidMessageAltError />;
}
