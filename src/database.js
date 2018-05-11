// use Firebase as our database
import Firebase from 'firebase'

// configure and connect to database
var config = {
    apiKey: "AIzaSyBujVlW0bekACzHBmcRCmD18rgJlf1gm9o",
    authDomain: "dukeaf-dcd09.firebaseapp.com",
    databaseURL: "https://dukeaf-dcd09.firebaseio.com",
    projectId: "dukeaf-dcd09",
    storageBucket: "dukeaf-dcd09.appspot.com",
    messagingSenderId: "208531682782"
}
var fbApp = Firebase.initializeApp(config)

// global reference to remote database app
export const db = fbApp.database()
// global reference to remote storage
export const storageRef = fbApp.storage().ref()
// create useful endpoints within the database
export const imagesRef = db.ref('images')
export const drinksRef = db.ref('drinks')
export const reviewsRef = db.ref('reviews')
export const activityRef = db.ref('activities')
export const placesRef = db.ref('places')
export const favoritesRef = db.ref('favorites')
