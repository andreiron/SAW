import React from 'react'
import Header from './Header'
import Calendar from './Calendar'
import './App.css';
import ToggleLightDark from './ToggleLightDark';
import DisplaySelector from './DisplaySelector';
import { useState, useEffect } from 'react';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';




export default function App() {

//TODO frame calendar
  return (
    <div className='w-screen h-screen flex flex-col'>
      <Header />
      <div className="flex justify-center">
        <DisplaySelector />
      </div>
      <div className="w-full h-full flex flex-row mt-2">
        <Calendar/>

      </div>
    </div>

  )
}
