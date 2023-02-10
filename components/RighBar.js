/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { FiUserMinus } from 'react-icons/fi';
import { useFriend } from '../context/friendContext';
import Link from 'next/link';

const RightBar = () => {
  const { friends, unfollowFriend } = useFriend();

  return (
    <aside>
      <section className="sponsor d-flex justify-content-cente flex-column align-items-center mt-4 p-4 text-black rounded h-100">
        <div className="w-100 d-flex justify-content-between mb-3">
          <span className="fs-6 fw-bold">Sponsored</span>
          <span className="fs-6 text-muted">Create Ad</span>
        </div>
        <Image
          src="/sponsor.jpeg"
          className="rounded"
          width={368}
          height={250}
          alt="Sponsor Image"
        />
        <div className="w-100 d-flex flex-column justify-content-between my-3">
          <span className="fs-6 fw-bold">MikaCosmetics</span>
          <span className="fs-6 text-muted">mikacosmetics.com</span>
        </div>
        <p className="fs-6 text-muted">
          Make every day a great skin day. Our skincare is allergy tested, 100%
          fragrance free, and formulated for maximum results without irritation
        </p>
      </section>
      <section className="friends mt-4 rounded text-black p-4">
        <span className="fw-bold">Friends List</span>
        {friends?.map((friend) => (
          <article className="d-flex align-items-center my-2" key={friend?.uid}>
            <Link href={`/profile/${friend.username}`}>
              {friend?.username === 'test' ? (
                <Image
                  style={{ cursor: 'pointer' }}
                  src={'/avatar.png'}
                  width={40}
                  height={40}
                  alt="Profile Image"
                  className="rounded-circle"
                />
              ) : (
                <img
                  style={{ cursor: 'pointer' }}
                  src={friend?.photoURL}
                  width={35}
                  height={35}
                  alt="Profile Image"
                  className="rounded-circle"
                />
              )}
            </Link>
            <Link href={`/profile/${friend.username}`}>
              <a>
                <span className={'ms-2 text-black fw-bold d-none d-md-block'}>
                  {friend?.username}
                </span>
              </a>
            </Link>
            <i
              className="user-icon minus ms-2"
              onClick={() => unfollowFriend(friend)}
            >
              <FiUserMinus />
            </i>
          </article>
        ))}
      </section>
    </aside>
  );
};

export default RightBar;
