import { useState,useEffect } from "react"
import NewEvent from "./NewEvent"



const weekday = ['Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December']

//TODO: add functionality to numbers of days in week

export default function Calendar() {

    const [showEvent, setshowEvent] = useState(false)
    const [date, setdate] = useState(new Date());

        return(
            <>
            {calendar()}
            </>
        )

    function calendar(d) {

        let today = new Date();
        return(
            <>

            <div className="w-full h-full relative flex items-center justify-center flex-col">
                <div className="w- flex flex-row">
                    <button className=" flex justify-center items-center" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {months[date.getMonth()]}
                    <button className=" flex justify-center items-center" onClick={() => setdate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>
                <div className="h-full w-full m-0 flex flex-col ">
                    <span class="inline-grid grid-cols-7 grid-rows-1 gap-2 w-full h-30 p-4">
                        {CalendarfirstRow()}
                    </span>
                    <span class="inline-grid grid-cols-7 grid-rows-1 gap-2 w-full h-full p-4">
                        {CalendarRow(d)}
                    </span>
                </div>
            </div>
            <NewEvent visible={showEvent} setVisible={setshowEvent} />
            </>

        )


    }


    function CalendarRow(d){

        useEffect(() => {
            if (d == ''){
                setdate(new Date());
            }
            else {
                setdate(new Date(d));
            }


        }, [d]);


        let ret = []


        for (let i = 0; i < 7; i++) {
            ret.push(<span class="bg-primary rounded-md flex justify-center "> ciao </span>)
        }



        return ret
    }





    function CalendarfirstRow(){
        let ret = []
        for (let i = 0; i < weekday.length; i++) {
            ret.push(<span class="bg-primary h-10 flex justify-center rounded-full items-center ">{weekday[i]}</span>)
        }
        return ret;
    }

}