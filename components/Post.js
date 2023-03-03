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
import { AiFillHeart } from 'react-icons/ai';
import { BiHeart, BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaComments } from 'react-icons/fa';
import { db } from '../config/firebase.config';
import relativeTime from '../utils/relativeTime';
import Comment from './Comment';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';

const Post = ({ id, post, small }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const timestamp = post?.createdAt?.seconds;
  const { darkTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const commentsRef = collection(db, 'posts', id, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs);
    });
  }, []);

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

  const sendComment = async () => {
    if (comment === '') return;
    const commentRef = doc(collection(db, 'posts', id, 'comments'));
    await setDoc(commentRef, {
      comment,
      id: commentRef.id,
      username: user?.email.split('@', 1)[0],
      userId: user?.uid,
      profilePicture: user?.photoURL,
      timestamp: serverTimestamp(),
    });
    setComment('');
  };

  const deletePost = async () => {
    await deleteDoc(doc(db, 'posts', id));
  };

  const displayButton = () => {
    setShowButton((prevState) => !prevState);
  };

  const displayComments = () => {
    setShowComments((prevState) => !prevState);
  };

  return (
    <article className="">
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
          {/* <p className="ms-3 text-muted">{relativeTime(timestamp)}</p> */}
        </div>
        {/* <div className="ms-auto d-flex flex-column align-items-center">
          <i className="dots-icon" onClick={displayButton}>
            <BiDotsHorizontalRounded />
          </i>
          {showButton && post?.postedBy === user?.uid && (
            <button className="bg-danger btn delete" onClick={deletePost}>
              Delete
            </button>
          )}
        </div> */}
      </div>
      {/* <p className="me-auto my-3">{post?.caption}</p> */}
      {post?.image && (
        <div>
          <Image
            src={post?.image}
            width={600}
            height={600}
            alt="Post Image"
            className="mb-3"
          />
        </div>
      )}
      {/* <div className="d-flex align-items-center mb-3 w-100">
        <i className="like-icon" onClick={likePost}>
          {liked ? <AiFillHeart /> : <BiHeart />}
        </i>
        {likes.length > 0 && (
          <span className="ms-2">
            {likes.length === 1 ? '1 Like' : `${likes.length} likes`}
          </span>
        )}
        <i className="ms-auto me-2 comment-icon" onClick={displayComments}>
          <FaComments />
        </i>
        <span role="button" onClick={displayComments}>
          {comments.length === 1 ? '1 comment' : `${comments.length} comments`}
        </span>
      </div> */}
      <div
        className={
          showComments && user
            ? 'd-flex align-items-center justify-content-center flex-column w-100 mt-3'
            : 'd-none'
        }
      >
        <div className="d-flex align-items-center mb-3 w-100">
          <Link href={`/profile/${post?.username}`}>
            {post?.username.includes('test') || !user?.photoURL ? (
              <Image
                style={{ cursor: 'pointer' }}
                src={'/avatar.png'}
                width={40}
                height={40}
                alt="Profile Image"
                className="rounded-circle"
              />
            ) : (
              <Image
                style={{ cursor: 'pointer' }}
                src={user?.photoURL}
                width={35}
                height={35}
                alt="Profile Image"
                className="rounded-circle"
              />
            )}
          </Link>
          <input
            className="mx-3 w-75"
            type="text"
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn p-1" onClick={sendComment}>
            Send
          </button>
        </div>
      </div>
      {/* {showComments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            postId={id}
            comment={comment.data()}
          />
        ))} */}
    </article>
  );
};

export default Post;
