/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from './SearchInput';
import { AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai';
import ThemeButton from './ThemeButton';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { logOut, user } = useAuth();

  return (
    <header className="bg-black sticky-top text-white">
      <nav className="d-flex align-items-center container">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link href="/">
            <a className="logo me-3">Ushare</a>
          </Link>
          <SearchInput />
          <ThemeButton />
          {!user ? (
            <div className="d-flex align-items-center">
              <Link href="/login">
                <a className="me-3 btn">Log In</a>
              </Link>
              <Link href="/signup">
                <a className="btn">Sign Up</a>
              </Link>
            </div>
          ) : (
            <div className="align-items-center d-flex">
              <Link href={`/profile/${user?.email?.split('@', 1)[0]}`}>
                <a className="-auto me-3 d-none d-md-block">
                  {user?.email?.split('@', 1)[0]}
                </a>
              </Link>
              <Link href={`/profile/${user?.email?.split('@', 1)[0]}`}>
                {user.email?.split('@', 1)[0].includes('test') ||
                !user.photoURL ? (
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
              <Link href="/upload">
                <a className="btn fs-5 ms-3 py-md-1 px-md-2 px-1 py-0 d-none d-md-block">
                  <AiOutlinePlus />
                </a>
              </Link>
              <i
                className="btn fs-5 ms-3 py-md-1 px-md-2 px-1 py-0 d-none d-md-block"
                onClick={logOut}
              >
                <AiOutlineLogout />
              </i>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
