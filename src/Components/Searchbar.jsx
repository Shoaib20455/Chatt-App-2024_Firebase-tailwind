import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Searchbar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // Set error state if no user is found
        setErr(true);
      } else {
        // Reset error state if user is found
        setErr(false);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setUsername("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    // Reset error state when input value becomes empty
    if (value === "") {
      setErr(false);
    }
  };

  return (
    <div className="border-b border-b-gray-500">
      <div className="p-3">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={handleInputChange}
          value={username}
          className="placeholder:text-gray-200 bg-transparent border-none text-white outline-none w-full"
        />
      </div>
      {err && <span className="text-red-500 font-bold">User not found!</span>}
      {user && (
        <div className="p-3 flex items-center gap-3 text-white cursor-pointer hover:bg-blue-500" onClick={handleSelect}>
          <img src={user.photoURL} alt="" 
          className="w-[50px] h-[50px] rounded-full object-cover"/>
          <div className="userChatInfo">
            <span className="text-lg font-medium sm:inline hidden">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
