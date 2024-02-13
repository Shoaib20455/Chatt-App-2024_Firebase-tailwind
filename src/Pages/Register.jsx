import React, { useState } from 'react';
import Add from "../assets/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };


  return (
    <section className="text-white bg-slate-900 min-h-screen flex flex-col">
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Enter Your Name" 
          className="block border-b border-gray-200 w-full p-3 rounded mb-4 outline-none"/>
          <input required type="email"
           name='email' placeholder="email" 
          className="block border-b border-gray-200 w-full p-3 rounded mb-4 outline-none"/>
          <input required type="password"
           name='password' placeholder="password" 
          className="block border-b border-gray-200 w-full p-3 rounded mb-4 outline-none"/>
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file"
          className="flex items-center gap-[10px] text-[#8da4f1] text-xs mb-2">
            <img src={Add} alt="" className="w-8 cursor-pointer"
            />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading} type='submit'
          className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
          >Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span className='text-red-500 text-xs mb-4'>Something went wrong</span>}
        </form>
      </div>
      <div className="text-gray-600 mt-6">
          Already have an account?
          <span className="no-underline border-b border-blue text-blue-400 m-1 hover:border-none hover:text-blue-600 hover:border-blue-500">
            <Link to="/login">Login</Link>
          </span>
        </div>
    </div>
    </section>
  );
};

export default Register;