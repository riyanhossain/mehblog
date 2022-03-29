import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";



function Login() {
  const signIn=false;
  let navigate = useNavigate(); 

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [toggleForm, setToggleForm] = useState(true);

  const [user, setUser] = useContext(UserContext);
  const handleGoogleSignup = () => {
    
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user1 = result.user;
        const NewUser={...user1,signIn:true};
        navigate("/");
        setUser(NewUser);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <section>
      <div className="w-screen flex justify-center items-center">
        <div className="bg-gray-200 w-4/5 h-[400px] flex justify-center items-center lg:w-1/4">
          {toggleForm ? (
            <div className="w-4/5 justify-center flex flex-col items-center gap-y-3">
              <p className="font-bold text-xl text-cyan-500">Login</p>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 outline-cyan-500"
              />
              <input
                type="Email"
                placeholder="Password"
                className="w-full p-2 outline-cyan-500"
              />

              <button className="w-full bg-cyan-500 p-2 text-white">
                Login
              </button>
              <p className="text-yellow-600">Or</p>
              <button className="w-full bg-cyan-500 p-2 text-white" onClick={()=>handleGoogleSignup()}>
                Sign in with google
              </button>
              <button
                className="text-red-600"
                onClick={() => setToggleForm(!toggleForm)}
              >
                Create an account
              </button>
            </div>
          ) : (
            <div className="w-4/5 justify-center flex flex-col items-center gap-y-3">
              <p className="font-bold text-xl text-cyan-500">Login</p>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 outline-cyan-500"
              />
              <input
                type="Email"
                placeholder="Password"
                className="w-full p-2 outline-cyan-500"
              />

              <button className="w-full bg-cyan-500 p-2 text-white">
                Sign up
              </button>
              <p className="text-yellow-600">Or</p>
              <button
                className="w-full bg-cyan-500 p-2 text-white"
                onClick={handleGoogleSignup}
              >
                Sign up with google
              </button>
              <button
                className="text-green-600"
                onClick={() => setToggleForm(!toggleForm)}
              >
                Already have an account
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
