import React from "react";
import { useState } from "react";
import {today} from "../utils/funz"


export default function NewEvent ({visible, setVisible}){

    if (!visible) return null
    console.log(visible)


    return (
        <div className="inset-0 z-10 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-red-500 flex flex-col h-3/4 w-2/5 rounded-xl">
                <div className=" flex flex-row justify-between w-full p-2"> 
                    <h1 className="text-4xl font-bold justify-end">New Event</h1>
                    <button className="btn btn-success " onClick={() => setVisible(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form className="flex flex-col space-y-4 mt-6 p-4">
                    <input type="text" className="input w-full max-w-xs hover:bg-primary hover:placeholder:text-black" placeholder="Event Name" />
                    <input type="text" className="input w-full max-w-xs hover:bg-primary hover:placeholder:text-black" placeholder="Event Location" />
                    <input type="text" className="input w-full max-w-xs hover:bg-primary hover:placeholder:text-black" placeholder="Event Time" />
                    <input type="text" className="input w-full max-w-xs hover:bg-primary hover:placeholder:text-black" placeholder="Event Type" />
                    <textarea type="text" className="input block w-full max-w-xs h-40 p-2 hover:bg-primary hover:placeholder:text-black" placeholder="Event Description" />
                    <input id="data" type="date" className="input w-full max-w-xs hover:bg-primary"  defaultValue={today()}/>
                    
                    <button className="btn btn-success" onClick={() => setVisible(false)}>Add Event</button>
                </form>
            </div>

        </div>

    )
}