import React from 'react'
import Header from './Header'
import Calendar from './Calendar'
import './App.css';
import ToggleLightDark from './ToggleLightDark';



export default function App() {

  return (
    <div className='App'>

      <Header />
      <ToggleLightDark />
      <div className='w-screen h-screen flex items-center justify-center'> 

        <Calendar />
      </div>
    </div>

  )
}