import { useEffect, useState } from 'react';
import { findUserbyEmail, addFollow, getFollows, findUserbyID, findUsersByIdList } from '../firebase_setup/DBfirebase'


function FriendsForm({ showFriends, setShowFriends }) {

	const [friend, setFriend] = useState("")
	const [friendFound, setFriendFound] = useState(false)
	const [friendInfo, setfriendInfo] = useState([])
	const [addFriend, setAddFriend] = useState(false)
	const [follow, setFollow] = useState(false)
	const [followArr, setFollowArr] = useState([])
	const [followInfo, setFollowInfo] = useState([])
	const [update, setUpdate] = useState(false)


	const f = async () => {

		// getFollows().then((item) => {
		// 	item.forEach((elem) => {
		// 		followArr.push(elem)
		// 	})

		// 	let followInfoOld = [...followInfo]
		// 	followArr.map((elem) => {
		// 		findUserbyID(elem).then((item) => {

		// 			if (!followInfoOld.includes(item)) {
		// 				followInfoOld.push(item)
		// 				setFollowInfo(followInfoOld)
		// 			}
		// 		})
		// 	})


		// })
		// 	.catch((e) => {
		// 		console.log(e)
		// 	})
		const followIDList = await getFollows()

		setFollowInfo(await findUsersByIdList(followIDList))

	}



	useEffect(() => {

		f()

	}, [])



	return (
		<>
			<div className="inset-0 z-5 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
				<div className="bg-secondary bg-opacity-100 flex flex-col h-3/4 w-2/5 rounded-xl justify-between p-2 ">
					<div className="bg-secondary bg-opacity-100 flex flex-col rounded-xl">
						<div className=" flex flex-row justify-between items-center w-full p-2">
							<h1 className="text-4xl font-bold justify-end pl-4 pt-2">Friend List</h1>
							<button className="btn bg-accent border-0 " onClick={() => setShowFriends(false)}>
								{
									// button close
								}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>

						</div>

						<div className="flex flex-col w-full justify-between items-start p-2 space-y-2">
							{
								infoFollow(followInfo)
							}
						</div>

					</div>
					<button className="btn btn-accent bottom-0" onClick={() => setAddFriend(true)}>
						Add Friend
					</button>

				</div>





				{
					addFriend ?
						formAddFriend(setShowFriends, friend, setFriend, friendInfo, setfriendInfo, friendFound, setFriendFound, addFriend,
							setAddFriend)
						:
						<>
						</>
				}


			</div >


		</>
	)

}


function infoFollow(item) {
	return <>
		{item.length > 0 && item.map((elem) =>
			<div className="flex flex-row w-full justify-between items-center border-2 border-accent p-2">
				<div className="flex flex-col items-start justify-between">
					<h1 className="text-md font-bold">{elem}</h1>
				</div>
				<button className="btn bg-accent border-0" onClick={() => { }}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
					</svg>

					Unfollow
				</button>
			</div>
		)}
	</>

}











function formAddFriend(setShowFriends, friend, setFriend, friendInfo, setfriendInfo, friendFound, setFriendFound, addFriend, setAddFriend) {
	return <div className="inset-0 z-10 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">

		<div className="bg-secondary bg-opacity-100 flex flex-col h-3/4 w-2/5 rounded-xl">
			<div className=" flex flex-row justify-between items-center w-full p-2">
				<h1 className="text-4xl font-bold justify-end pl-4 pt-2">Add New Friend</h1>
				<button className="btn bg-accent border-0 " onClick={() => setAddFriend(false)}>
					{
						// button close
					}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div className="flex flex-col space-y-4 mt-6 p-4 ">
				<div className="flex flex-row w-full justify-between bg-base-100 rounded-xl">
					<input type="text" className="input w-full border-0 " placeholder="Friend Name" value={friend} onChange={(e) => setFriend(e.target.value)} />
					<button className="btn border-0 hover:bg-accent" onClick={() => { findUserToFollow({ friend, setFriend, friendInfo, setfriendInfo, friendFound, setFriendFound }); }}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>

					</button>
				</div>
				{friendFound ?
					<div className="flex flex-col space-y-2">
						<div className="flex flex-row justify-between items-center border-2 border-accent p-2">

							<div className="flex flex-col items-start justify-between">
								<h1 className="text-2xl font-bold">{friendInfo.map((item) => item.username.toUpperCase())}</h1>
								<h2 className="text-xl font-bold">{friendInfo.map((item) => item.email)}</h2>
							</div>
							<button className="btn bg-accent border-0" onClick={() => { addFollow(friendInfo[0].id); }}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
								</svg>
								Follow
							</button>
						</div>
					</div>
					:
					<>
					</>}

				{
					//friendInfo.map((item) => item.username)
				}

			</div>
		</div>

	</div>;
}

function findUserToFollow({ friend, setFriend, friendInfo, setfriendInfo, friendFound, setFriendFound }) {

	setFriendFound(true)

	async function get() {
		const q = await findUserbyEmail(friend)
		setfriendInfo(q)
	}

	get()
}





export { FriendsForm }