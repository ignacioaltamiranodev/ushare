/* eslint-disable @next/next/no-img-element */
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import Image from 'next/image';
import Link from 'next/link';
import relativeTime from '../utils/relativeTime';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';

const Comment = ({ id, postId, comment }) => {
  const { darkTheme } = useTheme();
  const { user } = useAuth();

  const deleteComment = async () => {
    await deleteDoc(doc(db, 'posts', postId, 'comments', id));
  };

  return (
    <section className="d-flex align-items-center w-100 mb-3">
      <Link href={`/profile/${comment?.username}`}>
        {comment?.username.includes('test') || !comment.profilePicture ? (
          <Image
            style={{ cursor: 'pointer' }}
            src={'/avatar.png'}
            width={45}
            height={45}
            alt="Profile Image"
            className="rounded-circle"
          />
        ) : (
          <Image
            style={{ cursor: 'pointer' }}
            src={comment.profilePicture}
            width={35}
            height={35}
            alt="Profile Image"
            className="rounded-circle"
          />
        )}
      </Link>
      <div className="d-flex flex-column">
        <Link href={`/profile/${comment?.username}`}>
          <a
            className={
              darkTheme
                ? 'ms-3 text-white fw-bold d-none d-md-block'
                : 'ms-3 text-black fw-bold d-none d-md-block'
            }
          >
            {comment?.username}
          </a>
        </Link>
        <p className="mx-3 comment">{comment?.comment}</p>
      </div>
      <div className="d-flex align-items-end w-100 flex-column">
        <span className="text-muted">
          {relativeTime(comment?.timestamp?.seconds)}
        </span>
        {user?.uid === comment.userId && (
          <button className="btn bg-danger mt-1" onClick={deleteComment}>
            Delete
          </button>
        )}
      </div>
    </section>
  );
};

export default Comment;
