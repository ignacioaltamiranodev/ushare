import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BiHeart } from 'react-icons/bi';
import Comment from './Comment';
import relativeTime from '../utils/relativeTime';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useAuth } from '../context/authContext';
import { db } from '../config/firebase.config';
import { useTheme } from '../context/themeContext';

const Comments = ({ post, id }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const { darkTheme } = useTheme();

  useEffect(() => {
    if (!id) return;
    const commentsRef = collection(db, 'posts', id, 'comments');
    onSnapshot(commentsRef, (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likes, user]);

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

  return (
    <div className="col-md-5 d-flex flex-column align-items-start my-md-0 my-4 ps-md-4 ps-0">
      <h2>{post?.data().caption}</h2>
      <p className="text-muted">
        {relativeTime(post?.data().createdAt.seconds)}
      </p>
      {post?.data().username?.includes('test') ||
      !post?.data().profilePicture ? (
        <div className="d-flex align-items-center mt-3">
          <Link href={`/profile/${post?.data().username}`}>
            <Image
              style={{ cursor: 'pointer' }}
              src={'/avatar.png'}
              width={35}
              height={35}
              alt="Profile Image"
              className="rounded-circle"
            />
          </Link>
          <Link
            className={`${darkTheme ? 'text-white' : ''} ms-2 fw-bold`}
            href={`/profile/${post?.data().username}`}
          >
            {post?.data().username}
          </Link>
        </div>
      ) : (
        <div className="d-flex align-items-center mt-3">
          <Link href={`/profile/${post?.data().username}`}>
            <Image
              style={{ cursor: 'pointer' }}
              src={post?.data().profilePicture}
              width={35}
              height={35}
              alt="Profile Image"
              className="rounded-circle"
            />
          </Link>
          <Link
            className={`${darkTheme ? 'text-white' : ''} ms-2 fw-bold`}
            href={`/profile/${post?.data().username}`}
          >
            {post?.data().username}
          </Link>
        </div>
      )}
      <div className="d-flex align-items-center justify-content-between mb-3 w-100">
        <span className="my-3 fs-5">Comments ({comments.length})</span>
        <div>
          <i className="like-icon fs-3" onClick={likePost}>
            {liked ? <AiFillHeart /> : <BiHeart />}
          </i>
          {likes.length > 0 && (
            <span className="ms-2">
              {likes.length === 1 ? '1 Like' : `${likes.length} likes`}
            </span>
          )}
        </div>
      </div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          postId={id}
          comment={comment.data()}
        />
      ))}
      <div className="d-flex align-items-center w-100">
        <Link href={`/profile/${post?.data().username}`}>
          {post?.data().username.includes('test') || !user?.photoURL ? (
            <Image
              style={{ cursor: 'pointer' }}
              src={'/avatar.png'}
              width={35}
              height={35}
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
          className="mx-3 w-100"
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
  );
};

export default Comments;
