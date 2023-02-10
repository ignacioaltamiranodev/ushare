/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from './SearchInput';
import { AiOutlinePlus } from 'react-icons/ai';
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
      <nav className="container d-flex  align-items-center">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link href="/">
            <a className="logo me-3">Ushare</a>
          </Link>
          <SearchInput />
          <ThemeButton />
          {!user ? (
            <>
              <Link href="/login">
                <a className="ms-auto btn">Log In</a>
              </Link>
              <Link href="/signup">
                <a className="ms-2 btn">Sign Up</a>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/profile/${user?.email?.split('@', 1)[0]}`}>
                <a className="ms-auto me-3">{user?.email?.split('@', 1)[0]}</a>
              </Link>
              <div className="d-flex align-items-center">
                <Link href={`/profile/${user?.email?.split('@', 1)[0]}`}>
                  {user?.email?.split('@', 1)[0] === 'test' ? (
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
                      width={40}
                      height={40}
                      alt="Profile Image"
                      className="rounded-circle"
                    />
                  )}
                </Link>
              </div>
              <Link href="/upload">
                <a style={{ 'fontSize': '1.2rem' }} className="btn ms-3 py-1">
                  <AiOutlinePlus />
                </a>
              </Link>
              <button className="btn ms-3" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
