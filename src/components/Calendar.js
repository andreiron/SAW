import { useState,useEffect } from "react"
import NewEvent from "./NewEvent"



const weekday = ['Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December']


export default function Calendar( props) {

    const [msg, setmsg] = useState('')
    console.log(msg)
        return(
            <>
            {calendar(msg)}
            </>
        )

}


function calendar(d) {

    const [show, setshow] = useState(false)
    const [showEvent, setshowEvent] = useState(false)
    const [date, setdate] = useState(new Date());
    let today = new Date();


    function CalendarRow(d) {

        useEffect(() => {
            if (d == ''){
                setdate(new Date());
            }
            else {
                setdate(new Date(d));
            }


        }, [d])

        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);    
        let dayOfTheWeek = firstDay.getDay()
        let numberOfDays;
        switch (date.getMonth() + 1) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                numberOfDays = 31
                break
            case 2:
                if ((date.getFullYear() % 4) == 0)
                    numberOfDays = 29
                else 
                    numberOfDays = 28
                break
            default:
                numberOfDays = 30
                break;
        }
    
        let ret = []
            
    
        for (let i = 0; i < dayOfTheWeek; i++) {
            ret.push(<span class="bg-primary h-28 rounded-md"></span>)
        }
    
        for (let i = 0; i < numberOfDays; i++) {
            if (i == date.getDate() -1 && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear() ){
                ret.push(<span class="bg-accent h-28 flex justify-center rounded-md " onClick={ () => setshowEvent(true)}  >{i + 1}</span>)
            }
            else 
                ret.push(<span class="bg-primary h-28 flex justify-center rounded-md"> <p className="font-bold">{i + 1}</p></span>)
        }
        
        return ret;
    }
    
    //TODO: add styling to text 

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
            <div className="h-full w-full m-0">

            <span class="inline-grid grid-cols-7 gap-2 w-full h-full p-4">
                {CalendarfirstRow()}
                {CalendarRow(d)}
            </span>
            </div>
        </div>
        <NewEvent visible={showEvent} setVisible={setshowEvent} />
        </>

    )

    }
function CalendarfirstRow(){
    let ret = []
    for (let i = 0; i < weekday.length; i++) {
        ret.push(<span class="bg-primary h-10 flex justify-center rounded-full items-center ">{weekday[i]}</span>)
    }
    return ret;
}

