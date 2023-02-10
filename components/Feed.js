import Post from './Post';
import { usePost } from '../context/postContext';
import LeftBar from './LeftBar';
import NoResults from './NoResults';
import RightBar from './RighBar';

const Feed = () => {
  const { posts, categoryPosts, noResults } = usePost();

  return (
    <section className="container mx-auto row">
      <section className="col-sm-4 col-3 col-lg-3">
        <LeftBar />
      </section>
      <section className="col-sm-8 col-9 col-lg-6">
        {categoryPosts.length >= 1
          ? categoryPosts?.map((post) => (
              <Post
                key={post.data().id}
                id={post?.data().id}
                post={post?.data()}
              />
            ))
          : noResults && (
              <NoResults text={'There are no posts found in this category.'} />
            )}
        {categoryPosts.length === 0 &&
          !noResults &&
          posts?.map((post) => (
            <Post
              key={post.data().id}
              id={post?.data().id}
              post={post?.data()}
            />
          ))}
      </section>
      <section className="col-3 d-lg-block d-none">
        <RightBar />
      </section>
    </section>
  );
};

export default Feed;
