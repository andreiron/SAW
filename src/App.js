import React from 'react'
import Header from './Header'
import Calendar from './Calendar'
import './App.css';
import ToggleLightDark from './ToggleLightDark';



export default function App() {

  return (
    <div className='w-screen h-screen flex flex-col'>
      <Header />
      <div className="w-full h-full flex flex-row">
        <Calendar />
        <ToggleLightDark />
      </div>
    </div>

  )
}