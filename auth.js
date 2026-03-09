import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAp2nWVULxnDkpdLNunUG5iyP7Z_gl7_ms",
  authDomain: "sarvadaamana.firebaseapp.com",
  projectId: "sarvadaamana",
  storageBucket: "sarvadaamana.appspot.com",
  messagingSenderId: "214311904590",
  appId: "1:214311904590:web:fca2ea7b6f16c8d8192a1f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* LOGIN */
window.googleLogin = function(){

signInWithPopup(auth, provider)
.then((result)=>{

const user = result.user;

showTag("👤 Welcome " + user.displayName);

})
.catch((error)=>{
console.error(error);
});

};

/* LOGOUT */
window.logoutUser = function(){

showTag("🚪 Logging out...");

const userName = auth.currentUser?.displayName || "User";

signOut(auth).then(()=>{

showTag("👋 Goodbye " + userName);
showTag("🔒 Session ended");

setTimeout(()=>{
location.reload();
},1200);

}).catch((error)=>{

showTag("❌ Logout failed");

});

};

/* AUTO LOGIN CHECK */

onAuthStateChanged(auth,(user)=>{

if(user){

document.getElementById("loginPage").style.display="none";
document.getElementById("welcome").style.display="block";

/* show profile */

document.getElementById("userName").innerText = user.displayName;
document.getElementById("userPhoto").src = user.photoURL;

/* TAG NOTIFICATIONS */

showTag("🔐 Identity verified");
showTag("👤 Welcome " + user.displayName);
showTag("🤖 Initializing SARVADAAMANA...");

}

});