import { auth } from '../firebase_setup/ConfigFirebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { GoogleButton } from 'react-google-button'
import { loginWithGoogle, loginWithEmail, createEmailAccount, addUser, findUser, getCredentials, delUser } from '../firebase_setup/DBfirebase'
import { doc } from 'firebase/firestore'



export default function LoginForm({ setLogin }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [alertarr, setAlertarr] = useState([])
    const [showSignUp, setShowSignUp] = useState(false)
    const [form, setForm] = useState(false)

    function Googlelogin() {
        loginWithGoogle().then(() => {

            setLogin(true)

        }
        )
    }

    function emailLogin(e) {
        e.preventDefault()
        setEmail(document.getElementById('email').value)
        setPassword(document.getElementById('password').value)
        console.log('login email: ' + email + "; " + password)

        try {
            loginWithEmail(email, password).then(() => {

                setLogin(true)

            }
            ).catch((error) => {
                console.log(error)
                switch (error.code) {
                    case 'auth/wrong-password':
                        addAlert('Password errata', alertarr, setAlertarr)
                        break;
                    case 'auth/user-not-found':
                    case 'auth/invalid-email':
                        addAlert('Email errata', alertarr, setAlertarr)
                        break;
                    default:
                        break;
                }

            })

        } catch (error) {
            console.log(error)
        }

    }

    function userCreate(e) {
        e.preventDefault()

        if (username === '') {
            addAlert('Inserisci un username', alertarr, setAlertarr)
            return
        }
        if (email === '') {
            addAlert('Inserisci una email', alertarr, setAlertarr)
            return
        }
        if (password === '') {
            addAlert('Inserisci una password', alertarr, setAlertarr)
            return
        }

        createEmailAccount(email, password).then(() => {
            console.log('account creato')
            addUser({ username, email, password }).then(() => {
                console.log('utente aggiunto')
                setLogin(true)

            }).catch((error) => {

                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
            switch (error.code) {
                case 'auth/email-already-in-use':
                    addAlert('Email già in uso', alertarr, setAlertarr)
                    break;
                case 'auth/invalid-email':
                    addAlert('Email non valida', alertarr, setAlertarr)
                    break;
                case 'auth/weak-password':
                    addAlert('Password troppo debole (almeno 6 caratteri)', alertarr, setAlertarr)
                    break;
                default:
                    addAlert(error.code, alertarr, setAlertarr)
                    break;
            }

        })


    }

    function emailCreate(e) {
        e.preventDefault()


        createEmailAccount(email, password).then(() => {
            console.log('account creato')

        }).catch((error) => {
            console.log(error)
            switch (error.code) {
                case 'auth/email-already-in-use':
                    addAlert('Email già in uso', alertarr, setAlertarr)
                    break;
                case 'auth/invalid-email':
                    addAlert('Email non valida', alertarr, setAlertarr)
                    break;
                case 'auth/weak-password':
                    addAlert('Password troppo debole (almeno 6 caratteri)', alertarr, setAlertarr)
                    break;
                default:
                    addAlert(error.code, alertarr, setAlertarr)
                    break;
            }

        })
        // addUser({ username, email, password }).then(() => {
        //     console.log('utente aggiunto')

        // }).catch((error) => {
        //     console.log(error)
        // })

    }

    function a(bool) {
        document.getElementById('form_accedi').classList.add('hidden')
        document.getElementById('form_secondo').classList.remove('hidden')
        setShowSignUp(bool)
    }

    return (
        <>
            <div className='flex flex-col w-full h-full justify-center items-center' >
                <div id="form_accedi" className='flex flex-row w-[40vw] h-[60vh] p-5 space-x-2 justify-center items-center bg-primary rounded-lg '>
                    <button className="btn btn-info w-1/2 h-full" onClick={() => a(false)}   >
                        Accedi
                    </button>
                    <button className="btn btn-info w-1/2 h-full" onClick={() => a(true)} >
                        Iscriviti
                    </button>

                </div>

                <div id='form_secondo' className='flex flex-col w-full h-full p-5 space-x-2 justify-center items-center hidden '>
                    {

                        !showSignUp ?

                            formAccesso(email, setEmail, password, setPassword, emailLogin, Googlelogin)

                            :

                            fromIscrizione(email, setEmail, password, setPassword, username, setUsername, userCreate)



                    }
                </div>
            </div >

            < div id='toast' className="toast toast-end w-full justify-center items-center" >
                {
                    alerts(alertarr)
                }
            </div >

        </>

    )


}



function formAccesso(email, setEmail, password, setPassword, emailLogin, Googlelogin) {
    return (
        <form className="flex flex-col w-[25vw] h-[50vh] p-3 justify-around items-center  bg-primary rounded-lg">
            <div className='flex flex-col h-5/6 w-full justify-around items-center'>

                <p className="text-4xl font-bold">
                    Log in
                </p>

                <input type="email" id='email' placeholder="Email" value={email} className="input flex w-full" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id='password' placeholder="Password" value={password} className="input flex w-full" onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-info w-full" onClick={(e) => emailLogin(e)}>
                    Accedi
                </button>
                <button className="btn btn-info w-full" onClick={(e) => (e)}>
                    Iscriviti
                </button>
            </div>

            <div className="divider">OR</div>


            <div className='flex flex-col h-1/6 w-full justify-around items-center'>

                <button className='btn btn-info flex flex-row w-full' onClick={Googlelogin}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" fill="#fbc02d">
                        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>

                    Accedi con google </button>

            </div>

        </form>
    )
}

function fromIscrizione(email, setEmail, password, setPassword, username, setUsername, userCreate) {

    //TODO aggiungere form per inserimeto di informazioni utente
    // usare funzione per aggiungere utente
    // id utente preso da id di auth

    return (
        <>
            <div className="flex flex-col w-[25vw] h-[50vh] p-3 justify-around items-center  bg-primary rounded-lg">
                <div className='flex flex-col h-5/6 w-full justify-around items-center'>

                    <p className="text-4xl font-bold">
                        Iscriviti
                    </p>

                    <input type='text' id='username_iscrizione' placeholder="Username" value={username} className="input flex w-full" onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" id='email_iscrizione' placeholder="Email" value={email} className="input flex w-full" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" id='password_iscrizione' placeholder="Password" value={password} className="input flex w-full" onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn btn-info w-full" onClick={(e) => userCreate(e)}>
                        Iscriviti
                    </button>

                </div>

            </div>

        </>
    )
}

function alerts(alertarr) {
    return alertarr.map((alert) => alert)
}

function addAlert(text, alertarr, setAlertarr) {
    let ret = alertarr
    ret.push(
        <div id={text.replace(/\s/g, '')} className="alert alert-error flex felx-row duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{text}</span>
        </div>
    )

    if (ret.length > 3) {
        ret.shift()
    }

    setAlertarr((alertarr) => [...ret])
}