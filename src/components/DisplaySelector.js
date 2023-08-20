

export default function DisplaySelector({calType, setCalType}) {
    
    function handleClick(e) {
        const ancors = document.querySelectorAll('a.tab')
        ancors.forEach(ancor => ancor.classList.remove('bg-accent'))
        ancors.forEach(ancor => ancor.classList.remove('text-black'))
        ancors.forEach(ancor => ancor.classList.add('font-extrabold'))

        setCalType(e.target.innerText.toLowerCase())
        e.target.classList.add('bg-accent')
        e.target.classList.add('text-black')
        e.target.classList.add('font-extrabold')
    } 

    return(
        <>
        <div className="tabs tabs-boxed w-fit rounded-xl overflow-hidden">
            <a className="tab transition ease-in-out duration-200" onClick={ handleClick}>Day</a> 
            <a className="tab transition ease-in-out duration-200" onClick={ handleClick }>Week</a> 
            <a className="tab font-extrabold bg-accent transition ease-in-out duration-200 text-black" onClick={ handleClick}>Month</a>
        </div>
        </>
    )

}
