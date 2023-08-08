import React from "react";
import { useState } from "react";
import {today} from "../utils/funz"


export default function NewEvent ({visible}){

    if (!visible) return null
    console.log(visible)


    return (
        <div className="inset-0 z-10 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <form onSubmit={ e => console.log("dio")}>
                <input type="text" className="input w-full max-w-xs" placeholder="Event Name" />
                <input type="text" className="input w-full max-w-xs" placeholder="Event Description" />
                <input id="data" type="date" className="input w-full max-w-xs" defaultValue={today()}/>
                
                <button className="btn btn-success">Add Event</button>
            </form>
        </div>

    )
}