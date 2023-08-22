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

  const selectDisplay = () => {
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


  //TODO div per dimensione variabile
  return (
    <>
      <div className='w-screen h-screen flex flex-col overflow-hidden'>
        <div className='w-full h-[10vh] '>
          <Header />
        </div>
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
