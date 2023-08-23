import React from 'react'
import Header from './components/Header'
import CalendarMonth from './components/CalendarMonth'
import CalendarWeek from './components/CalendarWeek'
import CalendarDay from './components/CalendarDay'
import Settings from './components/Settings'

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
        <div className="flex flex-row w-full h-[85vh] justify-center">
          <div className="w-[85vw] h-full mt-2">
            {selectDisplay(calType)}
          </div>
          <div className="w-[15vw] h-full m-y-2 pr-2 rounded-sm">
            <Settings />
          </div>
        </div>
      </div>
    </>

  )
}
