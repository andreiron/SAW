import React from 'react'
import Header from './components/Header'
import Calendar from './components/Calendar'
import './App.css';
import ToggleLightDark from './components/ToggleLightDark';
import DisplaySelector from './components/DisplaySelector';
import { useState, useEffect } from 'react';
import NewEvent from './components/NewEvent';




export default function App() {

//TODO frame calendar
  return (
    <>

    <div className='w-screen h-screen flex flex-col'>
      <Header />
      <div className="flex justify-center">
        <DisplaySelector />
      </div>
      <div className="w-full h-full mt-2">
        <Calendar/>
      </div>
    </div>
    </>

  )
}
