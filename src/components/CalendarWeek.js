import { useState, useEffect, useRef } from "react"
import { db, getEvent, getEventsbyUid, getEventsbyDate } from "../firebase_setup/DBfirebase"
import { auth } from "../firebase_setup/ConfigFirebase"
import { today } from "../utils/funz"
import NewEvent from "./NewEvent"

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//TODO: sistema di visualizzazione eventi

export default function CalendarWeek(props) {
	const [showEvent, setshowEvent] = useState(false)
	const [date, setdate] = useState(new Date())

	const [concurrent, setConcurrent] = useState([])
	const [events, setEvents] = useState([])
	const [eventArray, setEventArray] = useState([])

	const refArray = useRef([])

	const visible = props.visible
	const setVisible = props.setVisible

	async function getEvents() {
		const tmparr = []
		let d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
		const e = await getEventsbyDate(d.toDateString())
		e.map((e) => tmparr.push(e))
		setEvents(tmparr)
	}

	useEffect(() => {
		setEvents([])
		getEvents()
	}, [date])

	useEffect(() => {
		setEventArray([])
		fillEvents({ events, setEvents, eventArray, setEventArray })
	}, [events])

	useEffect(() => {
		setEventArray([])
		setEvents([])
		getEvents()
		fillEvents({ events, setEvents, eventArray, setEventArray })
	}, [])

	return <>{calendar(setdate, date, showEvent, setshowEvent, refArray, events, setEvents, eventArray, setEventArray)}</>
}

function calendar(setdate, date, showEvent, setshowEvent, refArray, events, setEvents, eventArray, setEventArray) {
	return (
		<>
			<div className="w-full h-full relative flex items-center justify-center flex-col mt-2 ">
				<div className="flex flex-row w-full justify-around ">
					<div className="bg-primary flex flex-row justify-center items-center rounded-md">
						<button
							className=" btn btn-primary flex justify-center items-center px-1 m-0"
							onClick={() =>
								setdate(
									new Date(
										date.getFullYear(),
										date.getMonth(),
										date.getDate() - 7,
										date.getHours(),
										date.getMinutes(),
										date.getSeconds()
									)
								)
							}
						>
							{
								// PULSANTE PER ANDARE INDIETRO
							}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
							</svg>
						</button>
						{months[date.getMonth()]}
						<button
							className=" btn btn-primary flex justify-center items-center px-1 m-0"
							onClick={() =>
								setdate(
									new Date(
										date.getFullYear(),
										date.getMonth(),
										date.getDate() + 7,
										date.getHours(),
										date.getMinutes(),
										date.getSeconds()
									)
								)
							}
						>
							{
								// PULSANTE PER ANDARE AVANTI
							}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
							</svg>
						</button>
					</div>
					<div className="flex ">
						<button className="btn btn-primary" onClick={() => setdate(today())}>
							Today
						</button>
						<button
							className="btn btn-primary"
							onClick={() => {
								let index = date.getHours() * 2 + (date.getMinutes() > 30 ? 1 : 0)
								let day = 0
								console.log("ref: ", refArray.current.length)
								for (let i = 0; i < 7; i++) {
									refArray.current[index].scrollIntoView({ behavior: "smooth", block: "center" })
								}
							}}
						>
							cazzo
						</button>
					</div>
				</div>
				<div className="h-full w-full m-0 flex flex-col ">
					<span className="inline-grid grid-cols-7 grid-rows-1 gap-2 w-full h-30 p-4">{calendarfirstRow()}</span>
					<span className="inline-grid grid-cols-7 grid-rows-1 gap-2 w-full h-full p-4">
						{calendarRow(date, showEvent, setshowEvent, refArray, events, setEvents, eventArray, setEventArray)}
					</span>
				</div>
			</div>
			<NewEvent visible={showEvent} setVisible={setshowEvent} />
		</>
	)
}

function calendarRow(date, showEvent, setshowEvent, refArray, events, setEvents, eventArray, setEventArray) {
	let ret = []
	let sunday = findSunday(date)

	let numberOfDays
	switch (sunday.getMonth() + 1) {
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
			if (date.getFullYear() % 4 == 0) numberOfDays = 29
			else numberOfDays = 28
			break
		default:
			numberOfDays = 30
			break
	}

	for (let i = 0; i < 7; i++) {
		if (
			weekday[i] == weekday[today().getDay()] &&
			sunday.getDate() + i == today().getDate() &&
			today().getMonth() == sunday.getMonth() &&
			today().getFullYear() == sunday.getFullYear()
		) {
			ret.push(
				<div className="bg-secondary rounded-md flex flex-col justify-start items-center mt-2 p-2 no-scroll no-scrollbar overflow-y-scroll overflow-x-hidden ">
					<p className="bg-accent rounded-lg flex justify-center items-center text-xl h-fit w-full m-1 p-1">
						{sunday.getDate() + i <= numberOfDays ? sunday.getDate() + i : (sunday.getDate() + i) % numberOfDays}
					</p>
					<div className="relative w-full">
						<div className="absolute inset-0 grid grid-rows-24 grid-cols-2 w-full h-fit rounded-xl  p-2">
							{[...Array(48).keys()].map((j) => (
								<div
									key={j}
									ref={(elem) => refArray.current.push(elem)}
									className="col-start-1 flex flex-col items-start w-fit h-24 gap-6"
								>
									{j % 2 == 0 ? (
										<p className="w-fit font-bold text-sm">{j / 2 + ":00"}</p>
									) : (
										<p className="w-fit font-light text-xs">{(j - 1) / 2 + ":30"}</p>
									)}
								</div>
							))}
							{
								displayHours({ events, setEvents, eventArray, setEventArray })
								//fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })
							}
						</div>
					</div>
				</div>
			)
		} else
			ret.push(
				<div className="bg-secondary rounded-md flex flex-col justify-start items-center mt-2 p-2 no-scroll no-scrollbar overflow-y-scroll overflow-x-hidden ">
					<p className="rounded-lg flex justify-center items-center text-xl h-fit w-full m-1 p-1">
						{sunday.getDate() + i <= numberOfDays ? sunday.getDate() + i : (sunday.getDate() + i) % numberOfDays}
					</p>
					<div className="relative w-full">
						<div className="absolute inset-0 grid grid-rows-24 grid-cols-2 w-full h-fit rounded-xl p-2">
							{[...Array(48).keys()].map((j) => (
								<div
									key={j}
									ref={(elem) => refArray.current.push(elem)}
									className="col-start-1 flex flex-col items-start w-fit h-24 gap-6"
								>
									{j % 2 == 0 ? (
										<p className="w-fit font-bold text-sm">{j / 2 + ":00"}</p>
									) : (
										<p className="w-fit font-light text-xs">{(j - 1) / 2 + ":30"}</p>
									)}
								</div>
							))}
							{
								displayHours({ events, setEvents, eventArray, setEventArray })

								//fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })
							}
						</div>
					</div>
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
	return ret
}

function findSunday(date) {
	let dayOfTheWeek = date.getDay()
	let ret = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayOfTheWeek)
	return ret
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

function fillEvents({ events, setEvents, eventArray, setEventArray }) {
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

function displayHours({ events, setEvents, eventArray, setEventArray }) {
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
							gridColumnStart: `2`,
							zIndex: `${t.index}`,
							backgroundColor: `${bg}`,
						}}
						className={"rounded-md shadow-md shadow-primary w-full h-full flex flex-row items-start justify-start gap-4 px-6 col-start-2"}
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
