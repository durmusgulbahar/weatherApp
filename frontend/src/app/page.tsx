"use client";
import { useQuery } from "@tanstack/react-query";
import { WeatherForecastResponse } from "@/models/WeatherData";
import { convertKelvinToCelcius } from "@/utils/convertKelvinToCelcius";
import Container from "@/components/Container";
import { format, parseISO } from "date-fns";
import WeatherIcon from "@/components/WeatherIcon";
import { getWeather } from "./services/weather.service";
import { useEffect, useState } from "react";
import { useCity } from "./services/useCity";
export default function Home() {
  const {city, handleCity} = useCity();
  const [data, setData] = useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/${city}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: WeatherForecastResponse = await response.json();
        setData(data);
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  if (loading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  const today = data?.list[0];
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-10 w-full pb-10 pt-4">
        {/*today*/}
        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(today?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(today?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
           
            <Container className="gap-10 px-6 items-center ">
              <div className="flex flex-col px-4 items-center justify-center">
                <span className="text-4xl font-semibold">
                  {convertKelvinToCelcius(today?.main.temp)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like </span>
                  <span>
                    {convertKelvinToCelcius(today?.main.feels_like)}°C
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelcius(today?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {convertKelvinToCelcius(today?.main.temp_max ?? 0)}
                    °↑{" "}
                  </span>
                </p>
              </div>
              {/*time and weather icon*/}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between ">
                {data?.list.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(item.dt_txt), "h:mm a")}
                    </p>

                    <WeatherIcon
                      key={i}
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                      alt={"sun"}
                    />
                    <p>{convertKelvinToCelcius(item.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/*left*/}
            <Container className="w-fit  justify-center flex-col px-4 items-center ">
              <p className=" capitalize text-center">
                {today?.weather[0].description}{" "}
              </p>
              <WeatherIcon
                src={`http://openweathermap.org/img/wn/${today?.weather[0].icon}@4x.png`}
                alt={"sun"}
              />
            </Container>
            {/*right*/}


            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between">
               {today?.main.humidity}
            </Container>
          </div>
        </section>
        {/*5 days*/}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">5 Day Forecast</p>
        </section>
      </main>
    </div>
  );
}
