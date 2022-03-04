/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState, useEffect, createContext } from "react";

import { auth, db } from "config/firebase";

const authContextDefaultValues = {
  user: false,
  signup: (email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
  uid: "",
  email: "",
  username: "",
};

export const AuthContext = createContext(authContextDefaultValues);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [useremail, setUserEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (usr) => {
      if (usr) {
        const { uid, email } = usr;
        console.log(usr.email);
        setUserId(uid);
        if (email !== null) {
          setUserEmail(email);
        }
      } else {
        console.log("No User");
      }
    });
  }, [user]);

  const signup = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user: signupUser } = userCredential;
        console.log("signup success", signupUser);
        setUser(true);
        router.push("/");
      })
      .catch((err) => {
        const { errorCode, errorMessage } = err;
        console.error("Signup Error", errorCode, errorMessage);
      });
  };

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user: signinUser } = userCredential;
        console.log("signin success", signinUser);
        setUser(true);
        router.push("/");
      })
      .catch((err) => {
        const { errorCode, errorMessage } = err;
        console.error("Signin Error", errorCode, errorMessage);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        console.log("Sign out success");
      })
      .catch(() => console.error("Sign out error"));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user,
    signup,
    login,
    logout,
    uid: userId,
    email: useremail,
    username: "",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
