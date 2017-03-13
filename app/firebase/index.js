import firebase from 'firebase';

try {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCJ2-lEV6xuFhfrIyZm7faWRPx-9rShpOM",
        authDomain: "todo-app-a721d.firebaseapp.com",
        databaseURL: "https://todo-app-a721d.firebaseio.com",
        storageBucket: "todo-app-a721d.appspot.com",
        messagingSenderId: "1002433349333"
    };

    firebase.initializeApp(config);
} catch (e) {

}

export let firebaseRef = firebase.database().ref();
export default firebase;