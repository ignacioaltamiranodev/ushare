import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase.config';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);

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
    if (category === 'all') {
      return setCategoryPosts(posts);
    }

    const categoryPosts = posts.filter(
      (post) => post.data().category === category
    );

    if (categoryPosts.length === 0) {
      setNoResults(true);
      setCategoryPosts([]);
    } else {
      categoryPosts.length >= 1;
      setNoResults(false);
      setCategoryPosts(categoryPosts);
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
