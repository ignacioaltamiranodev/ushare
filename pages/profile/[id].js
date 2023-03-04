/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { usePost } from '../../context/postContext';
import { useRouter } from 'next/router';
import Post from '../../components/Post';
import NoResults from '../../components/NoResults';
import { useAuth } from '../../context/authContext';

const ProfilePage = () => {
  const { posts, users } = usePost();
  const { user } = useAuth();
  const { query, push } = useRouter();
  const userProfile = users.find((user) => user?.data().username === query.id);
  const userPosts = posts.filter((post) => post.data().username === query.id);

  if (!user) {
    push('/login');
  }

  return (
    <section className="container mx-auto">
      <section className="mt-4">
        <div className="position-relative profile-background mb-4">
          <div className="position-absolute text-center top-50 start-50 translate-middle">
            {userProfile?.data().username.includes('test') ||
            !userProfile?.data().photoURL ? (
              <Image
                src={'/avatar.png'}
                width={75}
                height={75}
                alt="Profile Image"
                className="rounded-circle avatar"
              />
            ) : (
              <Image
                src={userProfile?.data().photoURL}
                width={80}
                height={80}
                alt="Profile Image"
                className="rounded-circle profile-image"
              />
            )}
            <h4 className="fs-2 my-2">{userProfile?.data().username}</h4>
            <div className="d-flex justify-content-center">
              <span className="fs-6 me-3">Posts: {userPosts.length}</span>
            </div>
          </div>
        </div>
        <div className="posts">
          {userPosts?.map((post) => (
            <Post
              key={post.data().id}
              id={post?.data().id}
              post={post?.data()}
              small
            />
          ))}
        </div>
        {userPosts.length === 0 && (
          <>
            <NoResults
              text={
                user?.uid === userProfile?.data().uid
                  ? 'You didn´t create any post yet.'
                  : 'There are no posts created by this user yet.'
              }
              profile
              uid={userProfile?.data().uid}
            />
          </>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
