

export default function DisplaySelector({calType, setCalType}) {
    
    function handleClick(e) {
        const ancors = document.querySelectorAll('a.tab')
        ancors.forEach(ancor => ancor.classList.remove('bg-accent'))

        setCalType(e.target.innerText.toLowerCase())
        e.target.classList.add('bg-accent')
    } 

    return(
        <>
        <div className="tabs tabs-boxed w-fit ">
            <a className="tab transition ease-in-out duration-200" onClick={ handleClick}>Day</a> 
            <a className="tab transition ease-in-out duration-200" onClick={ handleClick }>Week</a> 
            <a className="tab font-extrabold bg-accent transition ease-in-out duration-200" onClick={ handleClick}>Month</a>
        </div>
        </>
    )

}
