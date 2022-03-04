import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";

import { auth } from "config/firebase";

const authContextDefaultValues = {
  user: false,
  signup: () => {},
  login: () => {},
  logout: () => {},
  uid: "",
};

export const AuthContext = createContext(authContextDefaultValues);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [userId, setUserId] = useState("");

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (usr) => {
      if (usr) {
        const { uid } = usr;
        console.log(uid);
        setUserId(uid);
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
      .catch(() => console.log("Sign out error"));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user,
    signup,
    login,
    logout,
    userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
