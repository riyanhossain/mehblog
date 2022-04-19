import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Login() {
  const signIn = false;
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
        const NewUser = { ...user1, signIn: true };
        navigate("/");
        setUser(NewUser);
        localStorage.setItem("user", JSON.stringify(NewUser));
        // ...
      })
      .catch((error) => {
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

  const [emailUser, setEmailUser] = useState({
    email: "",
    password: "",
  });
  const handleEmailSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailUser.email, emailUser.password)
      .then((userCredential) => {
        // Signed in
        const user1 = userCredential.user;
        console.log(user1);
        let role;
        if (user1.email === "default@admin.com") {
          role = "admin";
          user1.displayName = "Admin";
          user1.photoURL = "https://source.unsplash.com/RjCo6j0BkU8";
        } else {
          role = "user";
        }
        setUser({ ...user1, signIn: true, role: role });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user1,
            signIn: true,
            role: role,
            displayName: user1.displayName,
            photoURL: user1.photoURL,
          })
        );
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  let name, value;
  const handleEmailLogin = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEmailUser({ ...emailUser, [name]: value });
  };
  return (
    <section>
      <div className="w-screen flex justify-center items-center">
        <div className="bg-gray-200 w-4/5 h-[480px] flex justify-center items-center lg:w-1/4 mt-4">
          {toggleForm ? (
            <div className="w-4/5 justify-center flex flex-col items-center gap-y-3">
              <p className="font-bold text-xl text-cyan-500">Login</p>
              <form
                action=""
                onSubmit={handleEmailSignIn}
                className="flex flex-col items-center gap-y-3 w-full"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 outline-cyan-500"
                  name="email"
                  value={emailUser.email}
                  required
                  onChange={handleEmailLogin}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 outline-cyan-500"
                  name="password"
                  value={emailUser.password}
                  required
                  onChange={handleEmailLogin}
                />

                <button
                  type="submit"
                  className="w-full bg-cyan-500 p-2 text-white"
                >
                  Login
                </button>
              </form>
              <p className="text-yellow-600">Or</p>
              <button
                className="w-full bg-cyan-500 p-2 text-white"
                onClick={() => handleGoogleSignup()}
              >
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
              <p className="font-bold text-xl text-cyan-500">Sign Up</p>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 outline-cyan-500"
              />
              <input
                type="text"
                placeholder="PhotoURL"
                className="w-full p-2 outline-cyan-500"
              />
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
