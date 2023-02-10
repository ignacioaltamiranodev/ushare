import Feed from '../components/Feed';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';

export default function Home() {
  const { user } = useAuth();
  const { push } = useRouter();

  if (!user) {
    push('/login');
  }

  return (
    <>
      <Feed />
    </>
  );
}
