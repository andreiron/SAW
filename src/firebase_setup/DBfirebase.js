// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, query, where, updateDoc } from "firebase/firestore";
import { db, auth } from "./ConfigFirebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";

const provider = new GoogleAuthProvider();

async function getEvent() {
	let events = []
	const queryEvents = await getDocs(collection(db, "events"));

	queryEvents.forEach((doc) => {
		events.push(doc.data())
	})

	return Promise.resolve(events)

}

const addEvent = async (title, location) => {

	console.log(title + " " + location)
	const docRef2 = await addDoc(collection(db, "events"), {
		title,
		location,
	});
	console.log("Document written with ID: ", docRef2.id);
}

async function addUser({ username, email, password }) {

	if (auth.currentUser == null) {
		console.log('no user logged in')
		throw new Error('no user logged in')

	}

	let id = auth.currentUser.uid

	let follow = []

	if (username == "" || email == "" || password == "") {
		throw new Error('empty fields')
	}

	console.log(username + "; " + email + "; " + password + "; " + id)

	const docRef = await addDoc(collection(db, "users"), {
		username,
		email,
		password,
		id,
		follow
	});

	console.log("Document written with ID: ", docRef.id);
}


async function findUsersByIdList(idList) {

	const q = query(collection(db, "users"), where("id", "in", idList));
	const docSnap = await getDocs(q);

	const users = []

	docSnap.forEach((doc) => {
		users.push(doc.data().username);
	});

	return Promise.resolve(users)
}

async function findUserbyID(id) {

	const q = query(collection(db, "users"), where("id", "==", id));
	const docSnap = await getDocs(q);

	const users = []

	docSnap.forEach((doc) => {
		users.push(doc.data());
	});


	return users[0].username

}

async function findUserbyEmail(email) {
	console.log(email)
	const q = query(collection(db, "users"), where("email", "==", email));
	const docSnap = await getDocs(q);

	const users = []

	docSnap.forEach((doc) => {
		users.push(doc.data());
	});


	return users

}

async function addFollow(follow) {

	if (auth.currentUser == null) {
		console.log('no user logged in')
		throw new Error('no user logged in')

	}

	let id = auth.currentUser.uid

	const q = query(collection(db, "users"), where("id", "==", id));
	const docSnap = await getDocs(q);

	const userFiles = []

	docSnap.forEach((doc) => {
		userFiles.push({ id: doc.id, data: doc.data() });
	});

	if (userFiles.length != 1)
		throw new Error('user selection error')

	if (!userFiles[0].data.follow)
		userFiles[0].data.follow = []
	if (!userFiles[0].data.follow.includes(follow))
		userFiles[0].data.follow.push(follow)
	else
		throw new Error('already following')

	console.log(userFiles[0].data)

	await updateDoc(doc(db, 'users', userFiles[0].id),
		userFiles[0].data
		, { merge: true });
}

async function removeFollow(unfollowId) {


	if (auth.currentUser == null) {
		console.log('no user logged in')
		throw new Error('no user logged in')

	}

	let id = auth.currentUser.uid

	const q = query(collection(db, "users"), where("id", "==", id));
	const docSnap = await getDocs(q);

	let userFiles = []
	let docId

	docSnap.forEach((doc) => {
		userFiles = doc.data().follow
		docId = doc.id
	});


	if (userFiles.length <= 0)
		throw new Error('no follows')

	if (!userFiles.includes(unfollowId))
		throw new Error('not following')


	if (userFiles.includes(unfollowId)) {
		userFiles.splice(userFiles.indexOf(unfollowId), 1)

	}

	await updateDoc(doc(db, 'users', docId), {
		follow: userFiles
	});


}

async function getFollows() {

	let id = auth.currentUser.uid

	let follow = []

	const q = query(collection(db, "users"), where("id", "==", id));
	const docSnap = await getDocs(q);


	docSnap.forEach((doc) => {
		doc.data().follow.forEach((elem) => {
			follow.push(elem)
		})

	})

	return Promise.resolve(follow)

}

async function loginWithGoogle() {
	console.log('signing in with google')
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
}

async function loginWithEmail(email, password) {

	await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			// ...
		})


}

async function createEmailAccount(email, password) {
	await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			// ...
		})

}

async function delUser(user) {
	await deleteUser(user).then(() => {
		// User deleted.
	}
	).catch((error) => {
		// An error ocurred
		// ...
	});
}

function getCredentials() {
	const user = auth.currentUser;
	if (user != null) {
		return user.uid
	}
	else {
		return "no user logged in"
	}
}
export { getEvent, addEvent }
export { loginWithGoogle, loginWithEmail, createEmailAccount, addUser, findUserbyID, getCredentials, delUser, findUserbyEmail, addFollow, getFollows }
export { findUsersByIdList, removeFollow }