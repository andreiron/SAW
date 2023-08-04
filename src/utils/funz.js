
import React from "react";


export function today() {
    let today = new Date();
    return today.getFullYear() + '-' + ((today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + '-' + (today.getDate() > 9 ? today.getDate() : '0' + today.getDate());
}

