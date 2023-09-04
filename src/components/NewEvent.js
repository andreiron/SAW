import React from "react";
import { useState, useRef } from "react";
import { today } from "../utils/funz"
import { db } from "../firebase_setup/DBfirebase";
import { collection } from "firebase/firestore";
import { doc, setDoc, addDoc } from "firebase/firestore";
import { handler } from "daisyui";
import { addEvent } from "../firebase_setup/DBfirebase";


export default function NewEvent({ visible, setVisible }) {
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [time, setTime] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(today(true))
    const [privateEvent, setPrivateEvent] = useState(true)

    const titleRef = useRef()
    const locationRef = useRef()

    if (!visible) return null




    return (
        <div className="inset-0 z-10 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-secondary bg-opacity-100 flex flex-col h-3/4 w-2/5 rounded-xl">
                <div className=" flex flex-row justify-between w-full p-2">
                    <h1 className="text-4xl font-bold justify-end">New Event</h1>
                    <button className="btn btn-accent " onClick={() => setVisible(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col h-full space-y-4 mt-6 p-4 ">
                    <input ref={titleRef} type="text" className="input w-full max-w-md bg-base-100 hover:bg-primary hover:placeholder:text-black" placeholder="Event Name"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    <input ref={locationRef} type="text" className="input w-full max-w-md hover:bg-primary hover:placeholder:text-black" placeholder="Event Location"
                        value={location} onChange={(e) => setLocation(e.target.value)}
                    />
                    <input type="date" className="input w-full max-w-md hover:bg-primary hover:placeholder:text-black"
                        value={date} onChange={(e) => setDate(e.target.value)}
                    />
                    <input type="text" className="input w-full max-w-md hover:bg-primary hover:placeholder:text-black" placeholder="Event Time"
                        value={time} onChange={(e) => setTime(e.target.value)}
                    />
                    <input type="text" className="input w-full max-w-md hover:bg-primary hover:placeholder:text-black" placeholder="Event Type"
                        value={type} onChange={(e) => setType(e.target.value)}
                    />
                    <span className="input w-full max-w-md flex flex-row justify-between items-center rounded-md  ">


                        {privateEvent ? "Private Event" : "Public Event"}
                        <input type="checkbox" className="toggle bg-primary toggle-accent " placeholder="Event Type"
                            value={privateEvent} onChange={(e) => setPrivateEvent(!privateEvent)}
                        />

                    </span>

                    <textarea type="text" className="input block w-full max-w-md h-1/3 p-2 hover:bg-primary hover:placeholder:text-black" placeholder="Event Description"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                    />


                    <button className="btn btn-accent" onClick={() => addEvent(title, location)}>Add Event</button>
                </div>
            </div>

        </div>

    )
}

