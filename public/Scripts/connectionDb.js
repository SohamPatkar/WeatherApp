const firebaseConfig = {
    apiKey: "AIzaSyCIQa-pifma7OPpnmkY0Wql2wMkTWp52TU",
    authDomain: "weatherapp-262a6.firebaseapp.com",
    projectId: "weatherapp-262a6",
    storageBucket: "weatherapp-262a6.appspot.com",
    messagingSenderId: "571536411037",
    appId: "1:571536411037:web:e4b88bcd6370775ee64774",
    measurementId: "G-KP7GCW50Z3"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);

  export default db;