import React from 'react';
import { PacmanLoader } from 'react-spinners';

export const Loading = () => (
  <div className="flex flex-col w-screen h-screen justify-center items-center">
    <PacmanLoader color="#00A5E9" />
    <h1 className="text-lg text-emerald-800 font-semibold">Beep Boop Beep...</h1>
  </div>
);
