import React from "react";
import { useState } from "react";
import {today} from "../utils/funz"
import { db } from "../firebase";
import { collection } from "firebase/firestore";
import { doc, setDoc, addDoc } from "firebase/firestore"; 
import { handler } from "daisyui";


export default function NewEvent ({visible, setVisible}){
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [time, setTime] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState()



    if (!visible) return null

    function handler(e) {
        e.preventDefault()
        
        console.log(name)

    }


    return (
        <div className="inset-0 z-10 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-secondary bg-opacity-100 flex flex-col h-3/4 w-2/5 rounded-xl">
                <div className=" flex flex-row justify-between w-full p-2"> 
                    <h1 className="text-4xl font-bold justify-end">New Event</h1>
                    <button className="btn btn-success " onClick={() => setVisible(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col space-y-4 mt-6 p-4 ">
                    <input type="text" className="input w-full max-w-xs bg-base-100 hover:bg-primary hover:placeholder:text-black" placeholder="Event Name" 
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input type="text" className="input w-full max-w-xs hover:bg-primary hover:placeholder:text-black" placeholder="Event Location"
                        value={location} onChange={(e) => setLocation(e.target.value)}
                    />
                    <input type="text" className="input w-full max-w-xs hover:bg-primary hover:placeholder:text-black" placeholder="Event Time" 
                        value={time} onChange={(e) => setTime(e.target.value)}
                    />
                    <input type="text" className="input w-full max-w-xs hover:bg-primary hover:placeholder:text-black" placeholder="Event Type" 
                        value={type} onChange={(e) => setType(e.target.value)}
                    />
                    <textarea type="text" className="input block w-full max-w-xs h-40 p-2 hover:bg-primary hover:placeholder:text-black" placeholder="Event Description"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                    <input id="data" type="date" className="input w-full max-w-xs hover:bg-primary"  defaultValue={today()}
                        value={date} onChange={(e) => setDate(e.target.value)}
                    />
                    
                    <button className="btn btn-success" onClick={handler}>Add Event</button>
                </div>
            </div>

        </div>

    )
}

