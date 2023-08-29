import logo from '../icons8-user-80.png';
import { useEffect, useState } from 'react';
import { getCredentials, findUser } from '../firebase_setup/DBfirebase';


export default function User() {

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
            <button className=" btn w-full h-full flex items-center justify-center">
                {user}
            </button>
        </div>
    )

}
