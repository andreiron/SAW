import { useState, useEffect } from "react"
import NewEvent from "./NewEvent"

import { today } from "../utils/funz"



const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export default function Calendar() {

    const [showEvent, setshowEvent] = useState(false)
    const [date, setdate] = useState(new Date())
    return (
        <>
            {calendar(setdate, date, showEvent, setshowEvent)}
        </>
    )
}


function calendarRow(date) {

    let ret = []
    let sunday = findSunday(date)

    let numberOfDays;
    switch (date.getMonth() + 1) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            numberOfDays = 31
            break
        case 2:
            if ((date.getFullYear() % 4) == 0)
                numberOfDays = 29
            else
                numberOfDays = 28
            break
        default:
            numberOfDays = 30
            break;
    }

    for (let i = 0; i < 7; i++) {
        if (weekday[i] == weekday[today().getDay()] && sunday.getDate() + i == today().getDate() && today().getMonth() == sunday.getMonth() && today().getFullYear() == sunday.getFullYear()) {
            ret.push(
                <div className="bg-secondary rounded-md flex justify-center ">
                    <p className="bg-accent rounded-lg flex justify-center items-center font-extrabold text-xl h-fit w-full m-1 p-1">
                        {weekday[i] + ' ' + (sunday.getDate() + i) <= numberOfDays ? (sunday.getDate() + i) : ((sunday.getDate() + i) % numberOfDays)}
                    </p>
                </div>
            )
        }
        else
            ret.push(
                <div className="bg-secondary rounded-md flex justify-center ">
                    <p className="rounded-lg flex justify-center items-center text-xl h-fit w-full m-1 p-1">
                        {weekday[i] + ' ' + (sunday.getDate() + i) <= numberOfDays ? (sunday.getDate() + i) : ((sunday.getDate() + i) % numberOfDays)}
                    </p>
                </div>
            )
    }



    return ret.map((r) => r)
}



function calendarfirstRow() {
    let ret = []
    for (let i = 0; i < weekday.length; i++) {
        ret.push(<span className="bg-secondary h-10 flex justify-center rounded-full items-center ">{weekday[i]}</span>)
    }
    return ret;
}



function calendar(setdate, date, showEvent, setshowEvent) {
    return <>

        <div className="w-full h-full relative flex items-center justify-center flex-col mt-2 ">
            <div className="flex flex-row w-full justify-around ">

                <div className="bg-primary flex flex-row justify-center items-center rounded-md">
                    <button className=" btn btn-primary flex justify-center items-center px-1 m-0" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {months[date.getMonth()]}
                    <button className=" btn btn-primary flex justify-center items-center px-1 m-0" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>
                <div className="flex ">
                    <button className="btn btn-primary" onClick={() => setdate(today())}> Today </button>
                </div>
            </div>
            <div className="h-full w-full m-0 flex flex-col ">
                <span className="inline-grid grid-cols-7 grid-rows-1 gap-2 w-full h-30 p-4">
                    {calendarfirstRow()}
                </span>
                <span className="inline-grid grid-cols-7 grid-rows-1 gap-2 w-full h-full p-4">
                    {calendarRow(date, setshowEvent)}
                </span>
            </div>

        </div>
        <NewEvent visible={showEvent} setVisible={setshowEvent} />
    </>
}



function findSunday(date) {
    let dayOfTheWeek = date.getDay()
    let ret = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayOfTheWeek)
    return ret
}