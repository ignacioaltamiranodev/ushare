/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { db } from '../config/firebase.config';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import { usePost } from '../context/postContext';

const Post = ({ id, post }) => {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const { darkTheme } = useTheme();
  const { user } = useAuth();
  const { unsavePost, savePost, savedPosts } = usePost();

  const isSaved = savedPosts.find((el) => el.id === id);

  const deletePost = async () => {
    setLoading(true);
    await deleteDoc(doc(db, 'posts', id));
    setLoading(false);
  };

  return (
    <article
      className={`${loading ? 'opacity' : ''} position-relative mx-auto`}
    >
      <div className="d-flex align-items-center w-100 mb-2">
        <Link href={`/profile/${post?.username}`}>
          {post?.username?.includes('test') || !post.profilePicture ? (
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
              src={post.profilePicture}
              width={30}
              height={30}
              alt="Profile Image"
              className="rounded-circle"
            />
          )}
        </Link>
        <Link
          className={
            darkTheme ? 'ms-2 text-white fw-bold' : 'ms-2 text-black fw-bold'
          }
          href={`/profile/${post?.username}`}
        >
          {post?.username}
        </Link>
        {post?.postedBy === user?.uid && (
          <div className="ms-auto">
            <BiDotsHorizontalRounded
              style={{ cursor: 'pointer' }}
              className="fs-4"
              onClick={() => setShowButton((prev) => !prev)}
            />
            {showButton && (
              <button
                className="btn delete bg-danger position-absolute"
                onClick={deletePost}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <div className="wrapper">
        <Link href={`/post/${id}`}>
          {post?.image && (
            <Image
              style={{ cursor: 'pointer' }}
              src={post?.image}
              fill
              alt="Post Image"
              className="mb-3"
            />
          )}
        </Link>
        <button
          className="btn save"
          onClick={isSaved ? () => unsavePost(post) : () => savePost(post)}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </article>
  );
};

export default Post;
