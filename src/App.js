import React from 'react'
import Header from './Header'
import Calendar from './Calendar'
import './App.css';



export default function App() {

  return (
    <div className="App">

      <Header />
      <p className="underline">
        Hello world!
      </p>
      <div className=' w-screen h-screen '> 
      <Calendar />


      </div>
    </div>

  )
}