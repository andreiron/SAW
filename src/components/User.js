
import { useEffect, useState } from 'react';
import { getCredentials, findUser } from '../firebase_setup/DBfirebase';


export default function User({ hidden }) {

    const [user, setUser] = useState("no user logged in")

    async function get() {
        const q = await findUser(getCredentials())
        setUser(q)
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <div className="w-fit h-fit flex items-center justify-center p-3">
            <button className=" btn w-full h-full flex items-center justify-center" onClick={() => hidden.setHidden(!hidden.hidden)}>
                {hidden.hidden ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>

                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>}


                {user}
            </button>
        </div>
    )

}
