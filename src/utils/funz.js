
import React from "react";


export function today(s = false) {
    let today = new Date();
    if (s == true)
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return today
}

