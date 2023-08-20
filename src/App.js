import React from 'react'
import Header from './components/Header'
import CalendarMonth from './components/CalendarMonth'
import CalendarWeek from './components/CalendarWeek'
import CalendarDay from './components/CalendarDay'

import './App.css';
import ToggleLightDark from './components/ToggleLightDark';
import DisplaySelector from './components/DisplaySelector';
import { useState, useEffect, useContext } from 'react';
import NewEvent from './components/NewEvent';




export default function App() {
  const [calType, setCalType] = useState('month');

  function selectDisplay() {
    switch (calType) {
      case 'month':
        return <CalendarMonth />
      case 'week':
        return <CalendarWeek />
      case 'day':
        return <CalendarDay />
      default:
        return <>month</>
    }
  }


//TODO frame calendar
  return (
    <>

    <div className='w-screen h-screen flex flex-col overflow-hidden'>
      <Header />
      <div className="flex justify-center">
        <DisplaySelector calType={calType} setCalType={setCalType} />
      </div>
      <div className="w-full h-full mt-2">
        {selectDisplay(calType)}
      </div>
    </div>
    </>

  )
}
