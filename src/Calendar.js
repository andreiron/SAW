import { useState } from "react"
import NewEvent from "./NewEvent"


const weekday = ['Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


export default function Calendar( show) {


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

    function addEvent(e) {
        setshow(true)
    }


    function CalendarRow(d) {
        let date;
        if (d == ''){
            date = new Date();
        }
        else {
            date = new Date(d);
        }
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
            ret.push(<span class="bg-primary h-28 rounded-full"></span>)
        }
    
        for (let i = 0; i < numberOfDays; i++) {
            if (i == date.getDate() -1 ){
                ret.push(<span class="bg-accent h-28 flex justify-center rounded-full " onClick={addEvent}>{i + 1}</span>)
            }
            else 
                ret.push(<span class="bg-primary h-28 flex justify-center rounded-full"> <p className="font-bold">{i + 1}</p></span>)
        }
        
        return ret;
    }
    

    return(
        <>
        <div className="w-full h-full relative flex items-center justify-center flex-col">

            <div className="h-full w-full m-0">

            <span class="inline-grid grid-cols-7 gap-4 w-full h-full p-4">
                {CalendarfirstRow()}
                {CalendarRow(d)}
            </span>
            </div>
        </div>
            <NewEvent show = {show}/>
        </>

    )

    }
function CalendarfirstRow(){
    let ret = []
    for (let i = 0; i < weekday.length; i++) {
        ret.push(<span class="bg-primary h-16 flex justify-center rounded-full ">{weekday[i]}</span>)
    }
    return ret;
}

