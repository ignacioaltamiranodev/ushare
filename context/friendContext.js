/* eslint-disable react-hooks/exhaustive-deps */
import { onSnapshot, setDoc, doc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase.config';
import { useAuth } from './authContext';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'friends', user?.uid);
    var unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setFriends(doc.data().friends);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const followFriend = async (friend) => {
    await setDoc(
      doc(db, 'friends', user?.uid),
      {
        friends: friends ? [...friends, friend] : [friend],
      },
      { merge: true }
    );
  };

  const unfollowFriend = async (friend) => {
    await setDoc(
      doc(db, 'friends', user?.uid),
      {
        friends: friends.filter((element) => element.uid !== friend?.uid),
      },
      { merge: true }
    );
  };

  const data = { friends, followFriend, unfollowFriend };
  return (
    <FriendContext.Provider value={data}>{children}</FriendContext.Provider>
  );
};

export const useFriend = () => {
  return useContext(FriendContext);
};
