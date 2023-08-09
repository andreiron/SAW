import { useState,useEffect } from "react"
import NewEvent from "./NewEvent"
import { today } from "../utils/funz"



const weekday = ['Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December']


export default function Calendar( props) {

    const [msg, setmsg] = useState('')


    const [show, setshow] = useState(false)
    const [showEvent, setshowEvent] = useState(false)
    const [date, setdate] = useState(new Date());
    
        return(
            <>
            {calendar(msg)}
            </>
        )

    function calendar(d) {


        //TODO: add styling to text 

        return(
            <>

            <div className="w-full h-full relative flex items-center justify-center flex-col">
                <div className="w- flex flex-row">
                    <button className=" flex justify-center items-center" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {date.getDate() + ' ' + months[date.getMonth()]}
                    <button className=" flex justify-center items-center" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>
                <div className="h-full w-full m-0 p-4">
                    <span class="bg-primary rounded-md flex justify-center h-full font-extrabold "> 
                        {weekday[(date.getDate() +1 )% 7 ] }
                    </span>
                    {calendarDay()}
                </div>
            </div>
            <NewEvent visible={showEvent} setVisible={setshowEvent} />
            </>

        )

        }

        function calendarDay(){

            let ret = []
            

            return ret
        }

    
}