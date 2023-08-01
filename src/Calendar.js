import { useState } from "react"


const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']



export default function Calendar() {
    const [msg, setmsg] = useState('')
    const handleChange = (e) => {
        setmsg(e.target.value)
    }
        return(
            <>
            <input type='date' onChange={handleChange} />
            {calendar(msg)}
            </>
        )

}

function calendar(d) {
    
    let date = new Date(d);
    
    let day = date.getDay()
    let dayoftheweek = date.getDate()


    return(
        <>
        <div className="w-full h-fit flex flex-col">
            <div className="w-full h-fit flex flex-row">
                {calendarfirstRow()}
            </div>
            <div className="w-full h-fit flex flex-row">
                {calendarRow(d)}
            </div>

        </div>
        </>

    )

    }
function calendarfirstRow(){
    let ret = [];
    for (let i = 0; i < 7; i++) {
        ret.push(<div key={i} className='w-1/6 h-1/6 border-2 border-white flex-1'> {weekday[i]} </div>)
    }

    return(
        ret
    )
}

function calendarRow(d) {
    
    let date = new Date(d);
    
    let day = date.getDay()
    let dayoftheweek = date.getDate()

    let ret = [];
    for (let i = 0; i < 31; i++) {
        for (let j = 0; j < 7; j++) {
            if (i < day) {
                ret.push(<div key={i} className='w-1/6 h-1/6 border-2 border-white flex-1'> {''} </div>)
            } else {
                ret.push(<div key={i} className='w-1/6 h-1/6 border-2 border-white flex-1'> {dayoftheweek} </div>)
            }
        }
        ret.push(<br/>)


    }
    return(
        ret
    )


}