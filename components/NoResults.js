import Link from 'next/link';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { useAuth } from '../context/authContext';

const NoResults = ({ text, profile, uid }) => {
  const { user } = useAuth();
  return (
    <section className="no-results">
      <i className="camera-icon">
        <MdOutlineVideocamOff />
      </i>
      <h3 className="text-center">{text}</h3>
      {profile && user?.uid === uid && (
        <Link href="/upload">
          <a className={'mt-3 fs-5'}>Share your first post.</a>
        </Link>
      )}
    </section>
  );
};

export default NoResults;
