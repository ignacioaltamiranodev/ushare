/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from './SearchInput';
import { AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai';
import ThemeButton from './ThemeButton';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { logOut, user } = useAuth();
  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      push('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-black sticky-top text-white">
      <nav className="d-flex align-items-center container">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link className="logo me-3" href="/">
            Ushare
          </Link>
          {user && <SearchInput />}
          <ThemeButton />
          {!user ? (
            <div className="d-flex align-items-center">
              <Link className="me-3 btn" href="/login">
                Log In
              </Link>
              <Link className="btn" href="/signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="align-items-center d-flex">
              <Link
                className="me-3"
                href={`/profile/${user?.email?.split('@', 1)[0]}`}
              >
                {user?.email?.split('@', 1)[0]}
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
              <Link
                className="btn fs-5 ms-3 px-2 pt-0 d-none
                d-md-block"
                href="/upload"
              >
                <AiOutlinePlus />
              </Link>
              <i
                className="btn fs-5 ms-3 px-2 pt-0 d-none d-md-block"
                onClick={handleLogout}
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
