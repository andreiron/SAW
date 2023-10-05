import { useState, useEffect, useRef } from "react"
import { db, getEvent, getEventsbyUid, getEventsbyDate } from "../firebase_setup/DBfirebase"

//{ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray }

export default function DisplayEvents(props) {
	const [title, setTitle] = useState([])
	const [concurrent, setConcurrent] = useState([])
	const [eventArray, setEventArray] = useState([])
	const [next, setNext] = useState(10)
	const [events, setEvents] = useState([])

	const refArray = props.refArray.current

	async function get() {
		const tmparr = []
		const e = await getEventsbyDate(props.date.toDateString())
		e.map((e) => tmparr.push(e))
		setEvents(tmparr)
	}

	useEffect(() => {
		setEvents([])
		get()
	}, [props.date])

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

	let ret = []
	//setConcurrent(findConcurrent(events))
	//fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })

	if (events == null) {
		return <></>
	}

	return (
		<>
			<div className=" flex flex-row relative justify-around items-center w-full h-full mt-2 p-2 no-scroll no-scrollbar overflow-y-scroll overflow-x-hidden">
				<div className="flex  flex-col w-1/2 h-full "></div>

				<div className="absolute inset-0 grid grid-rows-24 grid-cols-11 w-full h-fit rounded-xl p-2">
					{[...Array(48).keys()].map((i) => (
						<div
							key={i}
							className="col-start-1 col-span-1 flex flex-col items-start w-full h-24 gap-6"
							ref={(elem) => props.refArray.current.push(elem)}
						>
							{i % 2 == 0 ? (
								<p className="w-fit font-bold text-sm">{i / 2 + ":00"}</p>
							) : (
								<p className="w-fit font-light text-xs">{(i - 1) / 2 + ":30"}</p>
							)}
						</div>
					))}
					{eventArray.map((t) => {
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
				</div>
			</div>
		</>
	)
}

function fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray }) {
	let tempArr = []
	let tempArrConc = findConcurrent(events)

	if (events.length == 0) {
		return
	}

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

{
	//fillEvents({ next, setNext, events, setEvents, title, concurrent, setConcurrent, eventArray, setEventArray })
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
