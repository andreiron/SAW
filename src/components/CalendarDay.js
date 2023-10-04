import { useState, useEffect } from "react"
import NewEvent from "./NewEvent"
import { today } from "../utils/funz"
import { db, getEvent, getEventsbyUid, getEventsbyDate } from "../firebase_setup/DBfirebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { twMerge } from "tailwind-merge"
import { auth } from "../firebase_setup/ConfigFirebase"

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function Calendar({ visible, setVisible }) {
	const [showEvent, setshowEvent] = useState(false)
	const [date, setdate] = useState(new Date())
	const [title, setTitle] = useState([])
	const [load, setLoad] = useState(false)
	const [concurrent, setConcurrent] = useState([])

	const [eventArray, setEventArray] = useState([])

	const [next, setNext] = useState(10)

	const [events, setEvents] = useState([])

	async function get() {
		const tmparr = []
		const e = await getEventsbyDate(date.toDateString())
		e.map((e) => tmparr.push(e))
		setEvents(tmparr)
	}

	useEffect(() => {
		setEvents([])
		get()
	}, [date])

	useEffect(() => {
		setEventArray([])
		fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })
	}, [events])

	useEffect(() => {
		setEventArray([])
		setEvents([])
		get()
		fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })
	}, [])

	return (
		<>
			{calendar({
				setdate,
				date,
				calendarDay,
				showEvent,
				setshowEvent,
				title,
				load,
				next,
				setNext,
				events,
				setEvents,
				concurrent,
				setConcurrent,
				eventArray,
				setEventArray,
			})}
		</>
	)
}

function calendar({
	setdate,
	date,
	calendarDay,
	showEvent,
	setshowEvent,
	title,
	load,
	next,
	setNext,
	events,
	setEvents,
	concurrent,
	setConcurrent,
	eventArray,
	setEventArray,
}) {
	return (
		<>
			<div className="w-full h-full relative flex items-center justify-center flex-col mt-2">
				<div className="flex flex-row w-full justify-around ">
					<div className=" bg-primary flex flex-row justify-center items-center rounded-md">
						<button
							className=" btn btn-primary flex justify-center items-center px-1 m-0"
							onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))}
						>
							{
								// PULSANTE PER ANDARE INDIETRO DI UN GIORNO
							}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 bg-inherit"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
							</svg>
						</button>
						<p className="bg-primary">{date.getDate() + " " + months[date.getMonth()]}</p>
						<button
							className="btn btn-primary flex justify-center items-center px-1 m-0"
							onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))}
						>
							{
								// PULSANTE PER ANDARE AVANTI DI UN GIORNO
							}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 bg-inherit"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
							</svg>
						</button>
					</div>

					<div className="flex">
						<button className="btn btn-primary" onClick={() => setdate(today())}>
							Today
						</button>
					</div>
				</div>

				<div className="h-full w-full m-0 p-4">
					{calendarDay({
						date,
						title,
						load,
						next,
						setNext,
						events,
						setEvents,
						concurrent,
						setConcurrent,
						eventArray,
						setEventArray,
					})}
				</div>
			</div>
			<NewEvent visible={showEvent} setVisible={setshowEvent} />
		</>
	)
}

function calendarDay({ date, title, load, next, setNext, events, setEvents, concurrent, setConcurrent, eventArray, setEventArray }) {
	let ret = []
	if (date.toDateString() == today().toDateString())
		ret.push(
			<div className="bg-secondary rounded-md flex flex-col justify-center items-center h-full w-full p-2 ">
				<p className="bg-accent rounded-lg flex flex-col justify-center items-center font-extrabold text-xl h-fit w-fit p-2">
					{weekday[date.getDay()]}
				</p>
				{displayEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })}
			</div>
		)
	else
		ret.push(
			<div className="bg-secondary rounded-md flex flex-col justify-center items-center h-full w-full p-2 ">
				<p className="flex justify-center items-center text-xl h-fit w-full p-2">{weekday[date.getDay()]}</p>

				{displayEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })}
			</div>
		)
	return <>{ret.map((e) => e)}</>
}

function displayEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray }) {
	return (
		<div className=" flex flex-row relative justify-around items-center w-full h-full mt-2 p-2 no-scroll no-scrollbar overflow-y-scroll overflow-x-hidden">
			<div className="  grid-cols-1 grid-rows-12 auto-rows-max gap-y-24 justify-around w-1/2 h-full rounded-xl p-2 ">
				{
					//TODO: capire come usare griglia per dispaly eventi
				}
			</div>

			<div className="flex  flex-col w-1/2 h-full "></div>

			<div className="absolute inset-0 grid grid-rows-24 grid-cols-11 w-full h-fit rounded-xl p-2">
				{[...Array(48).keys()].map((i) => (
					<div className="  col-start-1 col-span-1 flex flex-col items-start w-full h-24 gap-6">
						{i % 2 == 0 ? (
							<p className="w-fit font-bold text-sm">{i / 2 + ":00"}</p>
						) : (
							<p className="w-fit font-light text-xs">{(i - 1) / 2 + ":30"}</p>
						)}
					</div>
				))}
				{
					displayHours({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })
					//TODO: capire come usare griglia per dispaly eventi
					//fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })
				}
			</div>
		</div>
	)
}

function findToday({ setdate }) {
	return () => {
		setdate(today())
	}
}

function fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray }) {
	let tempArr = []
	let tempArrConc = findConcurrent(events)

	events.map((e) => {
		tempArr.push({
			event: e,
			span: 10 / tempArrConc[e.startTime].n,
			start: tempArrConc[e.startTime].index * (10 / tempArrConc[e.startTime].n) + 2,
			index: tempArrConc[e.startTime].index,
		})
		for (let i = e.startTime; i <= e.endTime; i++) {
			tempArrConc[i].index++
		}
	})

	setEventArray(tempArr)
}

function displayHours({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray }) {
	let ret = []
	//setConcurrent(findConcurrent(events))
	//fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })

	if (events == null) {
		return <></>
	}

	return (
		<>
			{/* {events.map((e) => {
				<div className="bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6">
					{e.title}
				</div>;
			})} */}
			{eventArray.map((t) => {
				const row = ``
				// const span = 2 + (10 / concurrent[t.startTime].n) * concurrent[t.startTime].index
				// for (let i = t.startTime; i <= t.endTime; i++) {
				// 	tempobj[i] = { n: concurrent[i].n, index: concurrent[i].index + 1 }
				// }
				//setConcurrent(tempobj)

				let rand = (Math.floor(Math.random() * 4) + Math.floor(Math.random() * 4)) % 4
				let bg = ""

				switch (rand) {
					case 0:
						bg = "MediumSeaGreen"
						break
					case 1:
						bg = "DodgerBlue"
						break
					case 2:
						bg = "Orange"
						break
					case 3:
						bg = "Tomato"
						break
				}

				return (
					<div
						style={{
							gridRowStart: `${t.event.startTime}`,
							gridRowEnd: `${t.event.endTime}`,
							gridColumnStart: `${t.start}`,
							gridColumnEnd: `${t.start + t.span}`,
							zIndex: `${t.index}`,
							backgroundColor: `${bg}`,
						}}
						className={
							" rounded-md shadow-md shadow-primary w-full h-full flex flex-row items-start justify-start gap-4 px-6 col-start-2"
						}
					>
						<h1>{t.event.title}</h1>

						<h3>{t.event.date} </h3>

						<p>{t.span}</p>
					</div>
				)
			})}
		</>
	)

	// for (let i = 0; i < 4; i++) {
	// 	ret.push(
	// 		<div className=" col-start-1 col-span-1 flex flex-col items-start w-full h-32 gap-6">
	// 			{i % 2 == 0 ? (
	// 				<p className="w-fit font-bold text-sm">{i / 2 + ":00"}</p>
	// 			) : (
	// 				<p className="w-fit font-light text-xs">
	// 					{(i - 1) / 2 + ":30"}
	// 				</p>
	// 			)}
	// 		</div>
	// 	);

	// 	ret.push(
	// 		<div
	// 			className={twMerge(
	// 				`${col}`,
	// 				`${row}`,
	// 				"bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6"
	// 			)}
	// 		>
	// 			{a ? "ciao" : "big"}
	// 		</div>
	// 	);
	//}

	/*ret.push(
        <>

                <div className=" flex flex-col items-start w-full h-32 gap-6">
                    <p className="w-fit font-bold text-sm">
                        {'A:00'}
                    </p> 
                </div>
                { // col-span-10 border border-red-500 w-full h-full flex flex-row items-center justify-start gap-4 px-6
    }
                <div className={" col-span-1  bg-blue-400 border border-black  w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
                <div className={" col-span-2 bg-blue-400 border border-black  w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
            
                <div className={" col-span-3 bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
            
                <div className={" col-span-4 bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6"}>
                    ciao


                    {
                        //insert event logic
                    }
                </div>
                

            </>
        )*/
}

function findEvents(setEvents) {
	async function get() {
		const e = await getEventsbyUid(auth.currentUser.uid)
		setEvents(e)
	}

	get()
}

function findConcurrent(events) {
	let arr = []
	let temp = {}
	for (let i = 0; i < 48; i++) {
		temp = { n: 0, index: 0 }
		for (let j = 0; j < events.length; j++) {
			if (events[j].startTime <= i && events[j].endTime > i) {
				temp.n++
			}
		}
		arr.push(temp)
	}

	return arr
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
