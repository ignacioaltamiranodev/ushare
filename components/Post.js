/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase.config';
import { AiFillHeart } from 'react-icons/ai';
import { BiHeart, BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaComments } from 'react-icons/fa';
import relativeTime from '../utils/relativeTime';
import Comment from './Comment';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';

const Post = ({ id, post, small }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { darkTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, []);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', user?.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', user?.uid), {
        username: user?.email.split('@', 1)[0],
      });
    }
  };

  const deletePost = async () => {
    setLoading(true);
    await deleteDoc(doc(db, 'posts', id));
    setLoading(false);
  };

  return (
    <article className={`${loading ? 'opacity' : ''}`}>
      <div className="d-flex align-items-center w-100 mb-2">
        <Link href={`/profile/${post?.username}`}>
          {post?.username?.includes('test') || !post.profilePicture ? (
            <Image
              style={{ cursor: 'pointer' }}
              src={'/avatar.png'}
              width={30}
              height={30}
              alt="Profile Image"
              className="rounded-circle"
            />
          ) : (
            <Image
              style={{ cursor: 'pointer' }}
              src={post.profilePicture}
              width={30}
              height={30}
              alt="Profile Image"
              className="rounded-circle"
            />
          )}
        </Link>
        <div>
          <Link href={`/profile/${post?.username}`}>
            <a
              className={
                darkTheme
                  ? 'ms-2 text-white fw-bold'
                  : 'ms-2 text-black fw-bold'
              }
            >
              {post?.username}
            </a>
          </Link>
        </div>
      </div>
      <Link href={`/post/${id}`}>
        <div className="content">
          <div className="content-overlay"></div>
          {post?.image && (
            <>
              <Image
                style={{ cursor: 'pointer' }}
                src={post?.image}
                width={600}
                height={600}
                alt="Post Image"
                className="mb-3"
              />
            </>
          )}
          <div className="text-container">
            {post?.postedBy === user?.uid && (
              <button className="btn delete bg-danger" onClick={deletePost}>
                Delete
              </button>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Post;
