// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs, addDoc, setDoc } from "firebase/firestore";
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

const addUser = async ({ username, email, password }) => {

	if (auth.currentUser == null) {
		console.log('no user logged in')
		throw new Error('no user logged in')

	}

	let id = auth.currentUser.uid

	if (username == "" || email == "" || password == "") {
		throw new Error('empty fields')
	}

	console.log(username + "; " + email + "; " + password + "; " + id)

	const docRef = await addDoc(collection(db, "users"), {
		username,
		email,
		password,
		id
	});

	console.log("Document written with ID: ", docRef.id);
}

async function findUser(id) {
	const docRef = doc(db, "users", id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	} else {
		console.log("No such document!");
	}

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

async function getCredentials() {
	return auth.currentUser
}

export { getEvent, addEvent }
export { loginWithGoogle, loginWithEmail, createEmailAccount, addUser, findUser, getCredentials, delUser }