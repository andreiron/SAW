import { useState, useEffect } from "react"
import NewEvent from "./NewEvent"



const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export default function Calendar(props) {

    const [msg, setmsg] = useState('')


    const [show, setshow] = useState(false)
    const [showEvent, setshowEvent] = useState(false)
    const [date, setdate] = useState(new Date());

    return (
        <>
            {calendar(setdate, date, showEvent, setshowEvent)}
        </>
    )






}

function calendar(setdate, date, showEvent, setshowEvent) {

    return (
        <>
            <div className="w-full h-full relative flex items-center justify-center flex-col mt-2">
                <div className="w- flex flex-row">
                    <button className=" flex justify-center items-center" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {months[date.getMonth()]}
                    <button className=" flex justify-center items-center" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>
                <div className="h-full w-full m-0 flex flex-col ">
                    <span className="inline-grid grid-cols-7 grid-rows-1 gap-2 w-full h-30 p-4">
                        {calendarfirstRow()}
                    </span>
                    <span className="inline-grid grid-cols-7 gap-2 w-full h-full p-4">
                        {calendarRow(date, setshowEvent)}
                    </span>
                </div>
            </div>
            <NewEvent visible={showEvent} setVisible={setshowEvent} />
        </>
    )
}

function calendarfirstRow() {
    let ret = []
    for (let i = 0; i < weekday.length; i++) {
        ret.push(<span className="bg-primary h-10 flex justify-center rounded-full items-center ">{weekday[i]}</span>)
    }
    return ret.map((e) => e);
}

function calendarRow(date, setshowEvent) {
    let today = new Date();

    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let dayOfTheWeek = firstDay.getDay()
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

    let ret = []


    for (let i = 0; i < dayOfTheWeek; i++) {
        ret.push(<span className="bg-secondary rounded-md"></span>)
    }

    for (let i = 0; i < numberOfDays; i++) {
        if (i == date.getDate() - 1 && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
            ret.push(
                <div className="bg-secondary rounded-md flex justify-center " onClick={() => setshowEvent(true)} >
                    <p className="bg-accent rounded-lg flex justify-center items-center font-extrabold text-xl text-base-300  h-fit w-full m-1 p-1">
                        {i + 1}
                    </p>
                </div>
            )
        }
        else

            ret.push(
                <div className="bg-secondary rounded-md flex justify-center " onClick={() => setshowEvent(true)} >
                    <p className=" rounded-lg flex justify-center items-center h-fit w-full p-1">
                        {i + 1}
                    </p>
                </div>
            )
    }

    return ret.map((e) => e);
}