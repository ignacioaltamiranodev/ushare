/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../config/firebase.config';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onSnapshot(collection(db, 'users'), (snapshot) => setUsers(snapshot.docs));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user?.email,
          uid: user?.uid,
          photoURL: user?.photoURL,
        });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const addUser = async () => {
      await setDoc(doc(db, 'users', user?.uid), {
        username: user?.email.split('@', 1)[0],
        uid: user?.uid,
        photoURL: user.photoURL,
      });
    };

    addUser();
  }, [user]);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, users, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
