// import {WEATHER_API_KEY} from '@env';
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_API_BASE = 'http://api.openweathermap.org/geo/1.0/direct';

export const getWeatherAtUSLocation = async (city: string, state: string, country: string) => {    
    const res = await fetch(
      WEATHER_API_BASE +
        "?" +
        `q=${city},${state},${country}` +
        '&units=imperial' +
        `&APPID=6e23bb410fd2cb1b42ff27a6b65fa832`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error("City not found");
};


export const getWeatherAtOtherLocation = async (
  city: string,
  country: string
) => {
  const res = await fetch(
    WEATHER_API_BASE +
      "?" +
      `q=${city},${country}` +
      "&units=imperial" +
      `&APPID=6e23bb410fd2cb1b42ff27a6b65fa832`
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
    throw new Error("City not found");
};