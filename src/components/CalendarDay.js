import { useState, useEffect } from "react"
import NewEvent from "./NewEvent"
import { today } from "../utils/funz"
import { db, getEvent } from "../firebase_setup/DBfirebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"




const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export default function Calendar(props) {

    const [showEvent, setshowEvent] = useState(false)
    const [date, setdate] = useState(new Date());
    const [title, setTitle] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (load)
            return

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
                    <button className=" btn btn-primary flex justify-center items-center px-1 m-0" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-inherit">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <p className="bg-primary">
                        {date.getDate() + ' ' + months[date.getMonth()]}
                    </p>
                    <button className="btn btn-primary flex justify-center items-center px-1 m-0" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-inherit">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>

                <div className="flex">
                    <button className="btn btn-primary" onClick={() => setdate(today())}> Today </button>
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


    let ret = []
    if (date.toDateString() == today().toDateString())
        ret.push(
            <div className="bg-secondary rounded-md flex flex-col h-full w-full ">
                <p className="bg-accent rounded-lg flex justify-center items-center font-extrabold text-xl h-fit w-full m-1 p-2">{weekday[date.getDay()]}</p>
            </div>
        )
    else
        ret.push(
            <div className="bg-secondary rounded-md flex flex-col h-full w-full ">
                <p className="flex justify-center items-center text-xl h-fit w-full m-1 p-2">{weekday[date.getDay()]}</p>

                <div className='flex flex-row justify-around items-center w-full h-fit'>

                    <p className="bg-red-400">
                        AM
                    </p>

                    <p className="bg-blue-400">
                        PM
                    </p>

                </div>
                <div className='flex flex-row justify-around items-center w-full h-full p-2'>

                    <div className="grid grid-cols-2 grid-rows-12 flex-col w-1/2 h-full rounded-xl ">

                        {
                            //TODO: capire come usare griglia per dispaly eventi
                        }


                    </div>


                    <div className="flex flex-col w-1/2 h-full ">


                    </div>

                </div>



            </div>
        )
    return (
        <>
            {ret.map((e) => e)}
        </>
    )

}

function findToday({ setdate }) {
    return () => {
        setdate(today())
    }
}


// {
//     (!load ?
//         <p className="w-full h-fit  "> akjfnkjdf</p>
//         :
//         title.map((t) =>
//             <p className="w-full h-fit  "> {t} </p>
//         )
//     )

// }