import { useState, useEffect } from "react"
import NewEvent from "./NewEvent"
import { today } from "../utils/funz"
import { db, getEvent, getEventsbyUid, getEventsbyDate } from "../firebase_setup/DBfirebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { twMerge } from "tailwind-merge"
import { auth } from "../firebase_setup/ConfigFirebase"

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function Calendar(props) {
	const [showEvent, setshowEvent] = useState(false)
	const [date, setdate] = useState(new Date())
	const [title, setTitle] = useState([])
	const [load, setLoad] = useState(false)
	const [concurrent, setConcurrent] = useState([])

	const [next, setNext] = useState(10)

	const [events, setEvents] = useState([])

	async function get() {
		const tmparr = []
		const e = await getEventsbyDate(date.toDateString())
		e.map((e) => tmparr.push(e))
		setEvents(tmparr)
	}

	useEffect(() => {
		get()
	}, [date])

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
			})}
		</>
	)
}

function calendar({ setdate, date, calendarDay, showEvent, setshowEvent, title, load, next, setNext, events, setEvents, concurrent, setConcurrent }) {
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
					})}
				</div>
			</div>
			<NewEvent visible={showEvent} setVisible={setshowEvent} />
		</>
	)
}

function calendarDay({ date, title, load, next, setNext, events, setEvents, concurrent, setConcurrent }) {
	let ret = []
	if (date.toDateString() == today().toDateString())
		ret.push(
			<div className="bg-secondary rounded-md flex flex-col justify-center items-center h-full w-full p-2 ">
				<p className="bg-accent rounded-lg flex flex-col justify-center items-center font-extrabold text-xl h-fit w-fit p-2">
					{weekday[date.getDay()]}
				</p>
				{displayEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent })}
			</div>
		)
	else
		ret.push(
			<div className="bg-secondary rounded-md flex flex-col h-full w-full ">
				<p className="flex justify-center items-center text-xl h-fit w-full m-1 p-2">{weekday[date.getDay()]}</p>

				{displayEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent })}
			</div>
		)
	return <>{ret.map((e) => e)}</>
}

function displayEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent }) {
	return (
		<div className=" flex flex-row relative justify-around items-center w-full h-full p-2 no-scroll no-scrollbar overflow-y-scroll overflow-x-hidden">
			<div className="  grid-cols-1 grid-rows-12 auto-rows-max gap-y-24 justify-around w-1/2 h-full rounded-xl p-2 ">
				{
					//TODO: capire come usare griglia per dispaly eventi
				}
			</div>

			<div className="flex  flex-col w-1/2 h-full "></div>

			<div className="absolute inset-0 grid grid-rows-24 grid-cols-11 w-full h-fit rounded-xl p-2">
				{
					displayHours({ next, setNext, events, setEvents, title, concurrent, setConcurrent })
					//TODO: capire come usare griglia per dispaly eventi
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

function displayHours({ next, setNext, events, setEvents, title, concurrent, setConcurrent }) {
	let ret = []
	setConcurrent(findConcurrent(events))

	if (events == null) {
		return <></>
	}

	return (
		<>
			{[...Array(48).keys()].map((i) => (
				<div className="  col-start-1 col-span-1 flex flex-col items-start w-full h-32 gap-6">
					{i % 2 == 0 ? (
						<p className="w-fit font-bold text-sm">{i / 2 + ":00"}</p>
					) : (
						<p className="w-fit font-light text-xs">{(i - 1) / 2 + ":30"}</p>
					)}
				</div>
			))}

			{
				<>
					<div className="bg-green-400 row-start-1 row-end-4 col-start-2 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6 col-span-full ">
						<p>ciao</p>
					</div>
					<div className="bg-red-400 row-start-3 col-start-4 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6 col-span-full">
						<p>ciao</p>
						<button
							className="btn btn-primary"
							onClick={() => {
								findConcurrent(events)
							}}
						>
							Find Concurrent
						</button>
					</div>
					<div className="bg-purple-400 row-start-[10] row-[span_2_/_span_2] col-start-4 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6">
						<p>ciao</p>
					</div>
				</>
			}

			{/* {events.map((e) => {
				<div className="bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6">
					{e.title}
				</div>;
			})} */}
			{events.length > 0 &&
				events.map((t) => {
					const row = ``
					let tempobj = [...concurrent]

					const span = 2 + (10 / concurrent[t.startTime].n) * concurrent[t.startTime].index
					console.log("start" + t.startTime + " ;" + t.endTime)
					for (let i = t.startTime; i <= t.endTime; i++) {
						console.log("i:" + i)
						tempobj[i] = { n: concurrent[i].n, index: concurrent[i].index + 1 }
					}
					setConcurrent(tempobj)
					console.log("ciao:" + Number(concurrent[11].index))
					return (
						<div
							style={{
								gridRowStart: `${t.startTime}`,
								gridRowEnd: `${t.endTime}`,
								gridColumnStart: `${span}`,
								gridColumnEnd: `${10 / concurrent[t.startTime].n + 2}`,
								zIndex: `${concurrent[t.startTime].n}`,
							}}
							className={twMerge(
								"bg-blue-400 border border-black w-full h-full flex flex-row items-center justify-start gap-4 px-6 col-start-2"
							)}
						>
							<p>{t.title}</p>
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
