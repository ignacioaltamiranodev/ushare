import Image from 'next/image';
import { useRouter } from 'next/router';
import { usePost } from '../../context/postContext';
import Loader from '../../components/Loader';
import Post from '../../components/Post';
import Comments from '../../components/Comments';

const PostPage = () => {
  const { query } = useRouter();
  const { posts } = usePost();
  const id = query.id;
  const post = posts?.find((post) => post?.data().id === id);
  const similarPosts = posts?.filter((post) => post?.data().id !== id);

  return (
    <>
      {!post ? (
        <Loader />
      ) : (
        <>
          <section className="row container m-auto mt-4">
            <div className="col-md-7 p-0">
              <Image
                src={post?.data().image}
                alt={post?.data().caption}
                height={700}
                width={700}
              />
            </div>
            <Comments post={post} id={id} />
          </section>
          <section className="row container m-auto mt-4">
            <h2 className="text-center">More like this</h2>
            <div className="posts mt-4">
              {similarPosts.slice(0, 10).map((post) => (
                <Post
                  key={post.data().id}
                  id={post?.data().id}
                  post={post?.data()}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PostPage;
