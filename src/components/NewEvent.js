import React from "react";
import { useState, useRef } from "react";
import { today } from "../utils/funz"
import { db } from "../firebase_setup/DBfirebase";
import { collection } from "firebase/firestore";
import { doc, setDoc, addDoc } from "firebase/firestore";
import { handler } from "daisyui";
import { addEvent } from "../firebase_setup/DBfirebase";
import { twMerge } from "tailwind-merge";
import { type } from "@testing-library/user-event/dist/type";


export default function NewEvent({ visible, setVisible }) {
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(today(true))
    const [privateEvent, setPrivateEvent] = useState(true)
    const [alert, setAlert] = useState([])


    const titleRef = useRef()
    const locationRef = useRef()

    if (!visible) return null




    return (


        <div className="inset-0 z-10 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-secondary bg-opacity-100 flex flex-col h-5/6 w-2/5 rounded-xl">
                <div className=" flex flex-row justify-between w-full p-4">
                    <h1 className="text-4xl font-bold justify-end">New Event</h1>
                    <button className="btn btn-accent " onClick={() => setVisible(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col h-full space-y-4 mt-6 p-4 ">
                    <label className="flex flex-col w-full max-w-md">
                        Titolo:
                        <input ref={titleRef} type="text" className="input w-full max-w-md bg-base-100  hover:placeholder:text-black"
                            value={title} onChange={(e) => setTitle(e.target.value)} onClick={() => setTitle("")}
                        />
                    </label>

                    <label className="flex flex-col w-full max-w-md">
                        Location:

                        <input ref={locationRef} type="text" className="input w-full max-w-md  hover:placeholder:text-black"
                            value={location} onChange={(e) => setLocation(e.target.value)} onClick={() => setLocation("")}
                        />
                    </label>

                    <label className="flex flex-col w-full max-w-md">
                        Date:
                        <input type="date" className="input w-full max-w-md  hover:placeholder:text-black"
                            value={date} onChange={(e) => setDate(e.target.value)} onClick={() => setDate("")}
                        />
                    </label>

                    <label className="flex flex-col w-full max-w-md">
                        Starting Time:

                        <select className="select select-bordered w-full max-w-md hover:placeholder:text-black" onChange={(e) => setStartTime(e.target.value)}>
                            <option value="" selected disabled hidden></option>
                            {
                                [...Array(48).keys()].map((i) => {
                                    if (i % 2 == 0) {
                                        return <option value={i}>{i / 2}:00</option>
                                    }
                                    else {
                                        return <option value={i}>{Math.floor(i / 2)}:30</option>
                                    }

                                })
                            }
                        </select >

                    </label>

                    <label className="flex flex-col w-full max-w-md">
                        Ending Time:

                        <select className="select select-bordered w-full max-w-md hover:placeholder:text-black" onChange={(e) => setEndTime(e.target.value)}>
                            <option value="" selected disabled hidden></option>
                            {
                                [...Array(48).keys()].map((i) => {
                                    if (i % 2 == 0) {
                                        return <option value={i}>{i / 2}:00</option>
                                    }
                                    else {
                                        return <option value={i}>{Math.floor(i / 2)}:30</option>
                                    }

                                })
                            }
                        </select >

                    </label>

                    <label className="flex flex-col w-full max-w-md">

                        <span className="input w-full max-w-md flex flex-row justify-between items-center rounded-md mt-6 hover:placeholder:text-black">


                            {privateEvent ? "Private Event" : "Public Event"}
                            <input type="checkbox" className="toggle toggle-accent " placeholder="Event Type"
                                value={privateEvent} onChange={(e) => setPrivateEvent(!privateEvent)}
                            />

                        </span>
                    </label>




                </div>
                <button className="btn btn-accent m-4 " onClick={() => addNewEvent({ title, location, date, startTime, endTime, privateEvent }, alert, setAlert)}>Add Event</button>
            </div>

            < div id='toast' className="toast toast-end w-full justify-center items-center" >
                {
                    alerts(alert)
                }
            </div >


        </div>

    )
}

{/* <label className="flex flex-col">
Description:

<textarea type="text" className="input block w-full max-w-md h-1/3 p-2 hover:bg-primary hover:placeholder:text-black"
    value={description} onChange={(e) => setDescription(e.target.value)} onClick={() => setDescription("")}
/>
</label> */}

function addNewEvent(fields, alert, setAlert) {



    try {
        Object.entries(fields).forEach(([key, field]) => {
            if (field == "") {
                throw new Error('Empty fields: ' + key.toUpperCase())

            }
        })

        if (fields.startTime >= fields.endTime) {
            console.log("dio cane " + fields.startTime + " ; " + fields.endTime)
            throw new Error('Start time must be before end time')

        }
        addEvent(fields)
            .then(() => {
                console.log("Event added")
                addAlert("Event added", "success", alert, setAlert)

            })
            .catch((e) => {
                throw new Error(e.message)
            })


    } catch (e) {
        addAlert(e.message, "error", alert, setAlert)
    }

}




function addAlert(text, type, alert, setAlert) {
    let ret = alert
    let id = text.replace(/\s/g, '')
    let alertType = "alert-" + type
    ret.push(
        <div id={id} className={twMerge("alert", alertType, "flex felx-row duration-500")} >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{text}</span>
        </div>
    )

    if (ret.length > 1) {
        ret.shift()
    }

    setAlert((alert) => [...ret])
}

function alerts(alert) {
    return alert.map((alert) => alert)
}

