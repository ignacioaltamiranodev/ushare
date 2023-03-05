import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../config/firebase.config';
import { useAuth } from './authContext';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'savedPosts', user?.uid);
      var unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setSavedPosts(doc.data().posts);
        }
      });
      setSavedPosts([]);

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const savePost = async (post) => {
    const docRef = doc(db, 'savedPosts', user?.uid);
    const itemExists = savedPosts.find((el) => el.id === post.id);

    if (itemExists) return;
    try {
      await setDoc(
        docRef,
        {
          posts: savedPosts ? [...savedPosts, post] : [post],
        },
        { merge: 'true' }
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const unsavePost = async (post) => {
    const docRef = doc(db, 'savedPosts', user?.uid);
    await setDoc(
      docRef,
      {
        posts: savedPosts.filter((el) => el.id !== post?.id),
      },
      { merge: 'true' }
    );
  };

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('username', 'desc'));
    onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs);
    });
  }, []);

  const filterCategory = (category) => {
    const categoryPosts = posts.filter(
      (post) => post.data().category === category
    );

    setCategoryPosts(categoryPosts);

    if (categoryPosts.length === 0) {
      setNoResults(true);
      setCategoryPosts([]);
    } else {
      setNoResults(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        users,
        filterCategory,
        categoryPosts,
        noResults,
        savedPosts,
        savePost,
        unsavePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
