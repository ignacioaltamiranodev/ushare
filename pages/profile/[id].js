/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { usePost } from '../../context/postContext';
import { useRouter } from 'next/router';
import Post from '../../components/Post';
import NoResults from '../../components/NoResults';
import { useAuth } from '../../context/authContext';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

const ProfilePage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const { posts, users } = usePost();
  const { user } = useAuth();
  const { query } = useRouter();
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const userProfile = users.find((user) => user?.data().username === query.id);
  const userPosts = posts.filter((post) => post.data().username === query.id);

  useEffect(() => {
    if (userProfile) {
      const docRef = doc(db, 'savedPosts', userProfile?.data().uid);
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
  }, [userProfile]);

  return (
    <section className="container mx-auto">
      <section className="mt-4">
        <div className="profile-background mb-4">
          <div className="d-flex align-items-center justify-content-center flex-column text-white p-md-3">
            {userProfile?.data().username.includes('test') ||
            !userProfile?.data().photoURL ? (
              <Image
                src={'/avatar.png'}
                width={70}
                height={70}
                alt="Profile Image"
                className="rounded-circle p-1"
              />
            ) : (
              <Image
                src={userProfile?.data().photoURL}
                width={65}
                height={65}
                alt="Profile Image"
                className="rounded-circle p-1"
              />
            )}
            <h4 className="fs-3 my-2">{userProfile?.data().username}</h4>
            <div className="d-flex justify-content-center">
              <span className="fs-6 me-3">Posts: {userPosts.length}</span>
            </div>
          </div>
        </div>
        <div className="d-flex mb-4">
          <button
            className={`${
              !showSavedPosts ? 'active fw-bold' : ''
            } btn text-white me-3`}
            onClick={() => setShowSavedPosts(false)}
          >
            Posts
          </button>
          <button
            className={`${
              showSavedPosts ? 'active fw-bold' : ''
            } btn text-white`}
            onClick={() => setShowSavedPosts(true)}
          >
            Saved
          </button>
        </div>
        <div className="posts mb-4">
          {showSavedPosts
            ? savedPosts.map((post) => (
                <Post key={post?.id} id={post?.id} post={post} />
              ))
            : userPosts?.map((post) => (
                <Post
                  key={post.data().id}
                  id={post?.data().id}
                  post={post?.data()}
                />
              ))}
        </div>
        {userPosts.length === 0 && !showSavedPosts && (
          <NoResults
            text={
              user?.uid === userProfile?.data().uid
                ? 'You didn´t create any post yet.'
                : 'There are no posts created by this user yet.'
            }
            profile
            uid={userProfile?.data().uid}
          />
        )}

        {showSavedPosts && savedPosts.length === 0 && (
          <p className="text-center fs-4">No saved posts yet.</p>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
