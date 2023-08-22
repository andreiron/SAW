import { useState, useEffect } from "react"
import NewEvent from "./NewEvent"
import { today } from "../utils/funz"
import { db, getEvent } from "../firebase_setup/firebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"




const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export default function Calendar(props) {

    const [showEvent, setshowEvent] = useState(false)
    const [date, setdate] = useState(new Date());
    const [title, setTitle] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {

        console.log('useEffect')
        setTitle([])
        setLoad(false)
        getEvent().then((events) => {
            events.forEach((event) => {
                setTitle(title => [...title, event.title])
            })
            setLoad(true)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    return (
        <>

            {calendar({ setdate, date, calendarDay, showEvent, setshowEvent, title, load })}

        </>
    )
}

function calendar({ setdate, date, calendarDay, showEvent, setshowEvent, title, load }) {
    return <>

        <div className="w-full h-full relative flex items-center justify-center flex-col mt-2">
            <div className="flex flex-row w-full justify-around ">
                <div className=" bg-primary flex flex-row justify-center items-center rounded-md">
                    <button className=" btn btn-primary flex justify-center items-center pl-1 pr-1 m-0" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-inherit">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <p className="bg-primary">
                        {date.getDate() + ' ' + months[date.getMonth()]}
                    </p>
                    <button className=" btn btn-primary flex justify-center items-center pl-1 pr-1 m-0" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-inherit">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>

                <div className="flex ">
                    <button className="btn btn-primary" onClick="">New Event</button>
                </div>
            </div>


            <div className="h-full w-full m-0 p-4">
                {calendarDay({ date, title, load })}
            </div>
        </div>
        <NewEvent visible={showEvent} setVisible={setshowEvent} />
    </>
}


function calendarDay({ date, title, load }) {

    title.forEach((t) => {
        console.log(t)
    })

    let ret = []
    if (date.toDateString() == today().toDateString())
        ret.push(<div className="bg-secondary rounded-md flex justify-center h-full w-full ">
            <p className="bg-accent rounded-lg flex justify-center items-center font-extrabold text-xl text-base-300  h-fit w-full m-1 p-2">{weekday[date.getDay()]}</p>
        </div>)
    else
        ret.push(
            <div className="bg-secondary rounded-md flex flex-col h-full w-full ">
                <p className="flex justify-center items-center text-xl h-fit w-full m-1 p-2">{weekday[date.getDay()]}</p>
                <div className=" bg-black flex flex-col w-full h-fit">

                    {
                        (!load ?
                            <p className="w-full h-fit bg-slate-800 "> akjfnkjdf</p>
                            :
                            title.map((t) =>
                                <p className="w-full h-fit bg-slate-400 "> {t} </p>
                            )
                        )

                    }

                </div>
            </div>
        )
    return (
        <>
            {ret.map((e) => e)}
        </>
    )

}