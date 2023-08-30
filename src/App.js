import React from 'react'
import Header from './components/Header'
import CalendarMonth from './components/CalendarMonth'
import CalendarWeek from './components/CalendarWeek'
import CalendarDay from './components/CalendarDay'
import Settings from './components/Settings'

import './App.css';
import ToggleLightDark from './components/ToggleLightDark';
import DisplaySelector from './components/DisplaySelector';
import { useState, useEffect, useContext } from 'react';
import NewEvent from './components/NewEvent';
import LoginForm from './components/LoginForm'


//TODO: sistemare per telefono


export default function App() {
	const [calType, setCalType] = useState('month');
	const [login, setLogin] = useState(false);
	const [showEvent, setshowEvent] = useState(false);
	const [hidden, setHidden] = useState(true);


	const selectDisplay = () => {
		switch (calType) {
			case 'month':
				return <CalendarMonth visible={showEvent} setVisible={setshowEvent} />
			case 'week':
				return <CalendarWeek visible={showEvent} setVisible={setshowEvent} />
			case 'day':
				return <CalendarDay visible={showEvent} setVisible={setshowEvent} />
			default:
				return <>month</>
		}
	}


	//TODO div per dimensione variabile
	return (
		<>
			{

				!login ?
					<div className="inset-0 z-10 fixed bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
						<LoginForm setLogin={setLogin} login={login} />

					</div>

					:


					<div className='w-screen h-screen flex flex-col overflow-hidden'>
						<div className='w-full h-[10vh] '>
							<Header hidden={{ hidden, setHidden }} />
						</div>
						<div className="flex justify-center">
							<DisplaySelector calType={calType} setCalType={setCalType} />
						</div>
						<div className="flex flex-row w-full h-[85vh] justify-center">
							<div className="w-[85vw] h-full mt-2">
								{selectDisplay(calType)}
							</div>
							<div className="w-[15vw] h-full m-y-2 pr-2 rounded-sm">
								<Settings hidden={{ hidden, setHidden }} visible={showEvent} setVisible={setshowEvent} />
							</div>
						</div>
						{
							showEvent ?
								<NewEvent visible={showEvent} setVisible={setshowEvent} />
								:
								<>
								</>
						}

					</div>
			}
		</>

	)
}


// TODO:
/*

	aggiungere tasto per creare evento
	separare iscrizine con login
		form per infdormazioni utente
	link di metodi di registrazione


*/