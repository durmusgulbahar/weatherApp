'use client'
// Navbar.tsx
import React, { useState } from 'react';
import { TiWeatherWindyCloudy } from 'react-icons/ti';
import { CiLocationOn } from 'react-icons/ci';
// Adjust the path as necessary
import SearchBox from './SearchBox'; // Adjust the path as necessary
import { useCity } from '@/app/services/useCity';
import { getWeather } from '@/app/services/weather.service';
const Navbar  = () => {
  const { city, handleCity } = useCity();
  const [inputValue, setInputValue] = useState<string>(city);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update local state on input change
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCity(inputValue); // Update city state on form submit
    console.log('submitted');
  };

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center p-6">
        <div className="font-medium text-5xl flex gap-4">
          <h1 className="text-gray-500">Weather</h1>
          <TiWeatherWindyCloudy className="text-blue-500 mt-1" />
        </div>
        <section className="flex gap-4 items-center">
          <CiLocationOn className="text-2xl hover:opacity-80 cursor-pointer" />
          <p>{city}</p>
          <div>
            <SearchBox onChange={handleChange} onSubmit={handleSubmit} value={inputValue} />
          </div>
        </section>
      </div>
    </nav>
  );
};


export default Navbar;
