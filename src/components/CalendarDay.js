import { useState, useEffect, useRef } from "react"
import { today } from "../utils/funz"
import { db, getEvent, getEventsbyUid, getEventsbyDate } from "../firebase_setup/DBfirebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { twMerge } from "tailwind-merge"
import { auth } from "../firebase_setup/ConfigFirebase"
import NewEvent from "./NewEvent"
import DisplayEvents from "./DisplayEvents"

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function Calendar(props) {
	const [showEvent, setshowEvent] = useState(false)
	const [date, setdate] = useState(props.date)
	const [title, setTitle] = useState([])
	const [load, setLoad] = useState(true)
	const [concurrent, setConcurrent] = useState([])

	const [eventArray, setEventArray] = useState([])

	const [next, setNext] = useState(10)

	const [events, setEvents] = useState([])

	const refArray = useRef([])

	const visible = props.visible
	const setVisible = props.setVisible

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
				setLoad,
				next,
				setNext,
				events,
				setEvents,
				concurrent,
				setConcurrent,
				eventArray,
				setEventArray,
				refArray,
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
	setLoad,
	next,
	setNext,
	events,
	setEvents,
	concurrent,
	setConcurrent,
	eventArray,
	setEventArray,
	refArray,
}) {
	return (
		<>
			<div className="w-full h-full relative flex items-center justify-center flex-col mt-2">
				<div className="flex flex-row w-full justify-around ">
					<div className=" bg-primary flex flex-row justify-center items-center rounded-md">
						<button
							className=" btn btn-primary flex justify-center items-center px-1 m-0"
							onClick={() =>
								setdate(
									new Date(
										date.getFullYear(),
										date.getMonth(),
										date.getDate() - 1,
										date.getHours(),
										date.getMinutes(),
										date.getSeconds()
									)
								)
							}
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
							onClick={() =>
								setdate(
									new Date(
										date.getFullYear(),
										date.getMonth(),
										date.getDate() + 1,
										date.getHours(),
										date.getMinutes(),
										date.getSeconds()
									)
								)
							}
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
						<button
							className="btn btn-primary"
							onClick={() => {
								let index = date.getHours() * 2 + (date.getMinutes() > 30 ? 1 : 0)
								console.log("ref: ", refArray.current)

								refArray.current[index].scrollIntoView({ behavior: "smooth", block: "center" })
							}}
						>
							cazzo
						</button>
					</div>
				</div>

				<div className="h-full w-full m-0 p-4">
					{calendarDay({
						date,
						title,
						load,
						setLoad,
						next,
						setNext,
						events,
						setEvents,
						concurrent,
						setConcurrent,
						eventArray,
						setEventArray,
						refArray,
					})}
				</div>
			</div>
			<NewEvent visible={showEvent} setVisible={setshowEvent} />
		</>
	)
}

function calendarDay({
	date,
	title,
	load,
	setLoad,
	next,
	setNext,
	events,
	setEvents,
	concurrent,
	setConcurrent,
	eventArray,
	setEventArray,
	refArray,
}) {
	return (
		<div className="bg-secondary rounded-md flex flex-col justify-center items-center h-full w-full p-2 ">
			{date.toDateString() == today().toDateString() ? (
				<p className="bg-accent rounded-lg flex flex-col justify-center items-center font-extrabold text-xl h-fit w-fit p-2">
					{weekday[date.getDay()]}
				</p>
			) : (
				<p className="flex justify-center items-center text-xl h-fit w-full p-2">{weekday[date.getDay()]}</p>
			)}
			<DisplayEvents refArray={refArray} date={date} />
			{
				//displayEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray, refArray })
			}
		</div>
	)
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
