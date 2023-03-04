import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePost } from '../../context/postContext';
import relativeTime from '../../utils/relativeTime';
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase.config';
import Loader from '../../components/Loader';
import Comment from '../../components/Comment';
import { useAuth } from '../../context/authContext';

const PostPage = () => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { query } = useRouter();
  const { posts } = usePost();
  const { user } = useAuth();
  const id = query.id;
  const post = posts.find((post) => post.data().id === id);

  useEffect(() => {
    if (!id) return;

    const commentsRef = collection(db, 'posts', id, 'comments');
    onSnapshot(commentsRef, (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [id]);

  // useEffect(() => {
  //   onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
  //     setLikes(snapshot.docs)
  //   );
  // }, []);

  // useEffect(() => {
  //   setLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  // }, [likes]);

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
    <>
      {!post ? (
        <Loader />
      ) : (
        <section className="row container mx-auto mt-4">
          <div className="col-md-7 p-0">
            <Image
              src={post?.data().image}
              alt={post?.data().caption}
              height={700}
              width={700}
            />
          </div>
          <div className="col-md-5 d-flex flex-column align-items-start mb-4 ps-md-4 ps-0">
            <h2>{post?.data().caption}</h2>
            <p className="text-muted">
              {relativeTime(post?.data().createdAt.seconds)}
            </p>
            <Link href={`/profile/${post?.data().username}`}>
              {post?.data().username?.includes('test') ||
              !post?.data().profilePicture ? (
                <div className="d-flex align-items-center mt-3">
                  <Image
                    style={{ cursor: 'pointer' }}
                    src={'/avatar.png'}
                    width={40}
                    height={40}
                    alt="Profile Image"
                    className="rounded-circle"
                  />
                  <span style={{ cursor: 'pointer' }} className="ms-2 fw-bold">
                    {post?.data().username}
                  </span>
                </div>
              ) : (
                <div className="d-flex align-items-center mt-3">
                  <Image
                    style={{ cursor: 'pointer' }}
                    src={post?.data().profilePicture}
                    width={40}
                    height={40}
                    alt="Profile Image"
                    className="rounded-circle"
                  />
                  <span style={{ cursor: 'pointer' }} className="ms-2 fw-bold">
                    {post?.data().username}
                  </span>
                </div>
              )}
            </Link>
            <span className="my-3 fs-5">Comments ({comments.length})</span>
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
          {/* <div className="d-flex align-items-center mb-3 w-100">
            <i
              className="like-icon"
              // onClick={likePost}
            >
              {liked ? <AiFillHeart /> : <BiHeart />}
            </i>
            {likes.length > 0 && (
              <span className="ms-2">
                {likes.length === 1 ? '1 Like' : `${likes.length} likes`}
              </span>
            )}
          </div> */}
        </section>
      )}
    </>
  );
};

export default PostPage;
