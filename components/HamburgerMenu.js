import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { AiFillHome, AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

const HamburgerMenu = () => {
  const { user, logOut } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
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
        <Link href="/">
          <a className="text-white text-center mb-2">
            <AiFillHome className="fs-4" />
            <span className="d-block">Home</span>
          </a>
        </Link>
        <Link href={`/profile/${user?.email.split('@')[0]}`}>
          <a className="text-white text-center mb-2">
            <FaUserAlt className="fs-4" />
            <span className="d-block">Profile</span>
          </a>
        </Link>
        <Link href="/upload">
          <a className="text-white text-center mb-2">
            <AiOutlinePlus className="fs-4" />
            <span className="d-block">Upload</span>
          </a>
        </Link>
        <div
          style={{ cursor: 'pointer' }}
          className="text-white text-center"
          onClick={logOut}
        >
          <AiOutlineLogout className="fs-4" />
          <span className="d-block">Logout</span>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
