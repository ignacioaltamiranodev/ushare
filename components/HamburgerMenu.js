import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { AiFillHome, AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const HamburgerMenu = () => {
  const { user, logOut } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
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
    <>
      {user && (
        <div className="d-md-none d-block">
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className={openMenu ? 'hamburger is-active' : 'hamburger'}
          >
            <div className="bar position-relative"></div>
          </button>
          <div
            className={openMenu ? 'open-menu' : 'closed-menu'}
            onClick={() => {
              openMenu && setOpenMenu(false);
            }}
          >
            <Link className="text-white text-center mb-2" href="/">
              <AiFillHome className="fs-4" />
              <span className="d-block">Home</span>
            </Link>
            <Link
              className="text-white text-center mb-2"
              href={`/profile/${user?.email.split('@')[0]}`}
            >
              <FaUserAlt className="fs-4" />
              <span className="d-block">Profile</span>
            </Link>
            <Link className="text-white text-center mb-2" href="/upload">
              <AiOutlinePlus className="fs-4" />
              <span className="d-block">Upload</span>
            </Link>
            <div
              style={{ cursor: 'pointer' }}
              className="text-white text-center"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="fs-4" />
              <span className="d-block">Logout</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
