import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "../../node_modules/firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  function signup(email, password, userName) {
    auth.createUserWithEmailAndPassword(email, password).then(async (res) => {
      const ref = doc(db, "users", res.user.uid);
      const docRef = await setDoc(ref, { userName });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
