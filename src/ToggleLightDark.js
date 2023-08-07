import React from "react";

export default function ToggleLightDark() {

    function handletoggle(e) {
        if (!e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'night')
        }
        else {
            document.documentElement.setAttribute('data-theme', 'day')
        }


    }

    return(
        <input id="toggledarklight" type="checkbox" className="toggle toggle-lg" onChange={handletoggle} />
    )


}