import React from 'react'
import Header from './Header'
import Calendar from './Calendar'

export default function App() {
  return (
    <div className="">

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