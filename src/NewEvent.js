import React from "react";
import { useState } from "react";
import {today} from "./utils/funz"


export default function NewEvent (props){


    {console.log(today())}


    return (
        <div className={"absoltue top-1/2 left-1/2" +  (props.show ? "" : " hidden")  }>
            <form onSubmit={ e => console.log("dio")}>
                <input type="text" className="input w-full max-w-xs" placeholder="Event Name" />
                <input type="text" className="input w-full max-w-xs" placeholder="Event Description" />
                <input id="data" type="date" className="input w-full max-w-xs" defaultValue={today()}/>
                
                <button className="btn btn-success">Add Event</button>
            </form>
        </div>

    )
}