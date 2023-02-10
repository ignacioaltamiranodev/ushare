import Image from 'next/image';
import { usePost } from '../../context/postContext';
import { useRouter } from 'next/router';
import Post from '../../components/Post';
import NoResults from '../../components/NoResults';
import { useAuth } from '../../context/authContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { posts, users } = usePost();
  const { query, back, push } = useRouter();
  const userProfile = users.find((user) => user?.data().username === query.id);
  const userPosts = posts.filter((post) => post.data().username === query.id);

  if (!user) {
    push('/login');
  }
  return (
    <section className="container row mx-auto">
      <div className="position-relative">
        <Image
          src="https://source.unsplash.com/random/1920x600/?nature"
          alt="Profile Background"
          width={1800}
          height={450}
        />
        <div className="position-absolute text-center top-100 start-50 translate-middle">
          {userProfile?.data().username === 'test' ? (
            <Image
              src={'/avatar.png'}
              width={80}
              height={80}
              alt="Profile Image"
              className="rounded-circle"
            />
          ) : (
            <Image
              src={userProfile?.data().photoURL}
              width={80}
              height={80}
              alt="Profile Image"
              className="rounded-circle"
            />
          )}
          <h4>{userProfile?.data().username}</h4>
        </div>
      </div>
      <section className="user-posts mt-4">
        <button className="btn" onClick={() => back()}>
          Go Back
        </button>
        {userPosts?.map((post) => (
          <Post
            key={post.data().id}
            id={post?.data().id}
            post={post?.data()}
            small
          />
        ))}
        {userPosts.length === 0 && (
          <NoResults text={'There are no posts created by this user yet.'} />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
