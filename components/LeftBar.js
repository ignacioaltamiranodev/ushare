/* eslint-disable @next/next/no-img-element */
import { AiFillHome } from 'react-icons/ai';
import { usePost } from '../context/postContext';
import { categories } from '../utils/categories';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/themeContext';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { useAuth } from '../context/authContext';
import { FiUserMinus, FiUserPlus } from 'react-icons/fi';
import { useFriend } from '../context/friendContext';

const LeftBar = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [accounts, setAccounts] = useState([]);
  const { filterCategory } = usePost();
  const { darkTheme } = useTheme();
  const { friends, unfollowFriend, followFriend } = useFriend();
  const { user } = useAuth();

  useEffect(() => {
    const usersRef = collection(db, 'users');
    onSnapshot(usersRef, (snapshot) => {
      setAccounts(snapshot.docs);
    });
  }, []);

  const suggestedAccounts = accounts?.filter(
    (account) => account?.data().uid !== user?.uid
  );

  return (
    <aside className="w-100">
      <section className="categories mt-3">
        <span className="d-block mt-3">Categories</span>
        <Link href="/">
          <a className={darkTheme && 'text-white'}>
            <AiFillHome />
            <span className="ms-3 d-none d-md-inline-block">Home</span>
          </a>
        </Link>
        {categories.map((category, i) => (
          <article
            className={
              category.name === activeCategory ? 'category active' : 'category'
            }
            key={i}
            onClick={() => {
              filterCategory(category);
              setActiveCategory(category.name);
            }}
          >
            <i>{category.icon}</i>
            <span className="ms-3 text-capitalize d-none d-md-inline-block">
              {category.name}
            </span>
          </article>
        ))}
      </section>
      <section className="suggestions mt-3">
        <span className="d-block my-3">Suggested Accounts</span>
        {suggestedAccounts?.map((account) => (
          <article
            className="d-flex align-items-center mb-3"
            key={account?.data().uid}
          >
            <Link href={`/profile/${account.data().username}`}>
              {account?.data().username === 'test' ? (
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
                  src={account.data().photoURL}
                  width={35}
                  height={35}
                  alt="Profile Image"
                  className="rounded-circle"
                />
              )}
            </Link>
            <Link href={`/profile/${account.data().username}`}>
              <a
                className={
                  darkTheme
                    ? 'ms-2 text-white fw-bold d-none d-md-block'
                    : 'ms-2 text-black fw-bold d-none d-md-block'
                }
              >
                {account.data().username}
              </a>
            </Link>
            {friends.some((friend) => friend.uid === account.data().uid) ? (
              <i
                className="user-icon minus ms-3"
                onClick={() => unfollowFriend(account.data())}
              >
                <FiUserMinus />
              </i>
            ) : (
              <i
                className="user-icon plus ms-3"
                onClick={() => followFriend(account.data())}
              >
                <FiUserPlus />
              </i>
            )}
          </article>
        ))}
      </section>
    </aside>
  );
};

export default LeftBar;
