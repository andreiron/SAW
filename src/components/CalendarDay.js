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

    const [next, setNext] = useState(10)

    useEffect(() => {
        if (load)
            return


            
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

            {calendar({ setdate, date, calendarDay, showEvent, setshowEvent, title, load, next, setNext })}

        </>
    )
}

function calendar({ setdate, date, calendarDay, showEvent, setshowEvent, title, load, next, setNext }) {
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
                {calendarDay({ date, title, load, next, setNext })}
            </div>
        </div>
        <NewEvent visible={showEvent} setVisible={setshowEvent} />
    </>
}


function calendarDay({ date, title, load, next, setNext }) {


    let ret = []
    if (date.toDateString() == today().toDateString())
        ret.push(
            <div className="bg-secondary rounded-md flex- h-full w-full ">
                <p className="bg-accent rounded-lg flex flex-col justify-center items-center font-extrabold text-xl h-fit w-full m-1 p-2">{weekday[date.getDay()]}</p>
            </div>
        )
    else
        ret.push(
            <div className="bg-secondary rounded-md flex flex-col h-full w-full ">
                <p className="flex justify-center items-center text-xl h-fit w-full m-1 p-2">{weekday[date.getDay()]}</p>


                <div className=' flex flex-row relative justify-around items-center w-full h-full p-2 no-scroll no-scrollbar overflow-y-scroll overflow-x-hidden'>





                    <div className="  grid-cols-1 grid-rows-12 auto-rows-max gap-y-24 justify-around w-1/2 h-full rounded-xl p-2 ">

                        {
                            //TODO: capire come usare griglia per dispaly eventi
                        }


                    </div>


                    <div className="flex  flex-col w-1/2 h-full ">


                    </div>

                    <div className=" absolute inset-0 grid grid-rows-24 grid-cols-11 w-full h-fit rounded-xl p-2">

                        {
                            displayHours({ next, setNext })
                            //TODO: capire come usare griglia per dispaly eventi
                        }


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

function displayHours({  }) {

    var next = 10

    let ret = []
    let numberofEvent
//Math.floor(Math.random() * 3) + 1
    let howBigEvent 
    let span
    let rest

    for (let i = 0; i < 2; i++) {
        numberofEvent = 3
        howBigEvent = 1
        let maxbigEvent = 1

        span = Math.floor(next / numberofEvent) 
        rest = next % numberofEvent
        
        ret.push(
            
            <div className=" flex flex-col items-start w-full h-32 gap-6">
            {i % 2 == 0 ? <p className="w-fit font-bold text-sm">
                {(i / 2) + ':00'}
            </p> : <p className="w-fit font-light text-xs">
                {((i - 1) / 2) + ':30'}
            </p>}
        </div>
        )
        for (let j = 0; j < numberofEvent; j++) {
            if (j == numberofEvent - 1){
                span = span + rest
  
            }
            if (i == 0 && j == 0){
                howBigEvent = 2
            }
            else{
                howBigEvent = 1
            }
            maxbigEvent = maxbigEvent < howBigEvent ? howBigEvent : maxbigEvent
            ret.push(
                <div className={" col-span-"+ span +" row-span-"+ howBigEvent + " bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
            ciao


            {
                //insert event logic
            }
        </div>
            )
            
        }
        span = span - rest
        next = 10 - ((maxbigEvent - 1 ) * span)
    }
    ret.push(
        <>

                <div className=" flex flex-col items-start w-full h-32 gap-6">
                    <p className="w-fit font-bold text-sm">
                        {'A:00'}
                    </p> 
                </div>
                { // col-span-10 border border-red-500 w-full h-full flex flex-row items-center justify-start gap-4 px-6
    }
                <div className={" col-span-"+ 1 +" bg-blue-400 border border-black  w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
                <div className={" col-span-"+ 2 +" bg-blue-400 border border-black  w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
            
                <div className={" col-span-"+ 3 +" bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
            
                <div className={" col-span-"+ 4 + " bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
                

            </>
        )


    return ret.map((r) => r)

}

// TODO: controllo eventi:
/*
    -evento a cavallo di mezzanotte -> crea due eventi separati

    somma di col-span degli eventi per ogni ora = 10

    stato per ogni ora -> spazio libero per ora successiva



*/

/*
            <div className=" col-span-1 flex flex-col items-start w-full h-32 gap-6">
                {
                    ++i
                }
            </div>
            <div className=" col-span-10 border border-red-500 w-full h-full flex flex-row items-center justify-start gap-4 px-6">
                ciao


                {
                    //insert event logic
                }
            </div>
*/ 

// {
//     (!load ?
//         <p className="w-full h-fit  "> akjfnkjdf</p>
//         :
//         title.map((t) =>
//             <p className="w-full h-fit  "> {t} </p>
//         )
//     )

// }

